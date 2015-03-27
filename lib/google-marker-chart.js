(function() {
    'use strict';

    dc.googleMarkerChart = function(parent, chartGroup) {
        var _chart = dc.baseGoogleChart({});

        var _cluster = false; // requires leaflet.markerCluster
        var _clusterOptions = false;
        var _rebuildMarkers = false;
        var _brushOn = true;
        var _filterByArea = false;
        var _fitOnRender = true;
        var _fitOnRedraw = false;
        var _disableFitOnRedraw = false;

        var _innerFilter = false;
        var _layerGroup = false;
        var _markerList = [];
        var _markerListFilterd = [];
        var _currentGroups = false;

        _chart.renderTitle(true);

        var _location = function(d) {
            return _chart.keyAccessor()(d);
        };

        var _marker = function(d) {
            var marker = new google.maps.Marker({
                position: _chart.toLocArray(_chart.locationAccessor()(d)),
                map: _chart.map(),
                title: _chart.renderTitle() ? _chart.title()(d) : '',
                clickable: _chart.renderPopup() || (_chart.brushOn() && !_filterByArea),
                draggable: false
            });

            return marker;
        };

        _chart._postRender = function() {
            if (_chart.brushOn()) {
                if (_filterByArea) {
                    _chart.filterHandler(doFilterByArea);
                }

                google.maps.event.addListener(_chart.map(), 'zoom_changed', function() {
                    zoomFilter('zoom');
                }, this);
                google.maps.event.addListener(_chart.map(), 'dragend', function() {
                    zoomFilter('drag');
                }, this);

                if (!_filterByArea) {
                    google.maps.event.addListener(_chart.map(), 'click', function() {
                        zoomFilter('click');
                    }, this);
                }
            }

            // if (_cluster) {
            //     _layerGroup = new L.MarkerClusterGroup(_clusterOptions ? _clusterOptions : null);
            // } else {
            //    _layerGroup = new L.LayerGroup();
            // }

            // _chart.map().addLayer(_layerGroup);
        };

        _chart._doRedraw = function() {
            var groups = _chart._computeOrderedGroups(_chart.data()).filter(function (d) {
                return _chart.valueAccessor()(d) !== 0;
            });

            _currentGroups = groups;

            if (_rebuildMarkers) {
                _markerList = [];
            }

            // _layerGroup.clearLayers();

            var addList = [];
            var feature_group = [];
            var bounds = new google.maps.LatLngBounds();
            _markerListFilterd = [];

            groups.forEach(function(v) {
                var key = _chart.keyAccessor()(v);
                var marker = null;

                if (!_rebuildMarkers && key in _markerList) {
                    marker = _markerList[key];
                }

                if (v.value) {
                    if (marker === null) {
                        marker = createmarker(v, key);
                    } else {
                        marker.setVisible(true);
                    }

                    bounds.extend(marker.getPosition());
                    feature_group.push(marker);

                    if (!_chart.cluster()) {
                        // _layerGroup.addLayer(marker);
                    } else {
                        addList.push(marker);
                    }

                    _markerListFilterd.push(marker);
                } else {
                    if (marker !== null) {
                        marker.setVisible(false);
                    }
                }
            });

            if (_chart.cluster() && addList.length > 0) {
                // _layerGroup.addLayers(addList);

            }

            if (feature_group.length) {
                if (_fitOnRender || (_fitOnRedraw && !_disableFitOnRedraw)) {
                    _chart.map().fitBounds(bounds);
                }
            }

            _disableFitOnRedraw = false;
            _fitOnRender = false;
        };

        _chart.locationAccessor = function(_) {
            if (!arguments.length) {
                return _location;
            }

            _location =  _;
            return _chart;
        };

        _chart.marker = function(_) {
            if (!arguments.length) {
                return _marker;
            }

            _marker = _;
            return _chart;
        };

        _chart.icon = function(_) {
            if (!arguments.length) {
                return _icon;
            }

            _icon = _;
            return _chart;
        };


        _chart.cluster = function(_) {
            if (!arguments.length) {
                return _cluster;
            }

            _cluster = _;
            return _chart;
        };

        _chart.clusterOptions = function(_) {
            if (!arguments.length) {
                return _clusterOptions;
            }

            _clusterOptions = _;
            return _chart;
        };

        _chart.rebuildMarkers = function(_) {
            if (!arguments.length) {
                return _rebuildMarkers;
            }

            _rebuildMarkers = _;
            return _chart;
        };

        _chart.brushOn = function(_) {
            if (!arguments.length) {
                return _brushOn;
            }

            _brushOn = _;
            return _chart;
        };

        _chart.filterByArea = function(_) {
            if (!arguments.length) {
                return _filterByArea;
            }

            _filterByArea = _;
            return _chart;
        };

        _chart.fitOnRender = function(_) {
            if (!arguments.length) {
                return _fitOnRender;
            }

            _fitOnRender = _;
            return _chart;
        };

        _chart.fitOnRedraw = function(_) {
            if (!arguments.length) {
                return _fitOnRedraw;
            }

            _fitOnRedraw = _;
            return _chart;
        };

        _chart.markerGroup = function() {
            return _layerGroup;
        };

        _chart.markers = function(filtered) {
            if (filtered) {
                return _markerListFilterd;
            }

            return _markerList;
        };

        var createmarker = function(v, k) {
            var marker = _marker(v);
            marker.key = k;

            if (_chart.renderPopup()) {
                google.maps.event.addListener(marker, 'click', function() {
                    _chart.popup()(v, marker).open(_chart.map(), marker);
                });
            }

            if (_chart.brushOn() && !_filterByArea) {
                marker.on('click', selectFilter);
            }

            _markerList[k] = marker;

            return marker;
        };

        var zoomFilter = function(type) {
            _disableFitOnRedraw = true;
            if (_filterByArea) {
                var filter;
                if (_chart.map().getCenter().equals(_chart.toLocArray(_chart.center())) && _chart.map().getZoom() === _chart.zoom()) {
                    filter = null;
                } else {
                    filter = _chart.map().getBounds();
                }

                dc.events.trigger(function () {
                    _chart.filter(null);

                    if (filter) {
                        _innerFilter = true;
                        _chart.filter(filter);
                        _innerFilter = false;
                    }

                    dc.redrawAll(_chart.chartGroup());
                });
            } else if (
                _chart.filter() &&
                (
                    type === 'click' ||
                    (
                        _chart.filter() in _markerList &&
                        !_chart.map().getBounds().contains(_markerList[_chart.filter()].getLatLng())
                    )
                )
            ) {
                dc.events.trigger(function () {
                    _chart.filter(null);
                    if (_renderPopup) {
                        _chart.map().closePopup();
                    }

                    dc.redrawAll(_chart.chartGroup());
                });
            }
        };

        var doFilterByArea = function(dimension, filters) {
            _disableFitOnRedraw = true;
            _chart.dimension().filter(null);

            if (filters && filters.length > 0) {
                _chart.dimension().filterFunction(function(d) {
                    if (!(d in _markerList)) {
                        return false;
                    }
                    var locO = _markerList[d].position;
                    return locO && filters[0].contains(locO);
                });

                if (!_innerFilter && _chart.map().getBounds().toString !== filters[0].toString()) {
                    _chart.map().fitBounds(filters[0]);
                }
            }
        };

        var selectFilter = function(e) {
            if (!e.target) {
                return;
            }

            _disableFitOnRedraw = true;
            var filter = e.target.key;

            dc.events.trigger(function () {
                _chart.filter(filter);
                dc.redrawAll(_chart.chartGroup());
            });
        };

        return _chart.anchor(parent, chartGroup);
    };
})();