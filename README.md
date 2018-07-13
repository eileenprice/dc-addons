# dc-addons

These [dc.js](http://dc-js.github.io/dc.js/) addons provide new charts for the dc namespace.

## Addons
  * [Bubble Cloud](#bubble-cloud)

## Installation
```js
bower install dc-addons --save
npm install dc-addons --save
```

You can either include all addons or each on individually as you need them.  To see examples of individual addons see each addon below. The following example will include all addons.
```html
<!-- dc-addons requirements -->
<link rel="stylesheet" href="bower_components/leaflet/dist/leaflet.css" />
<script src="bower_components/leaflet/dist/leaflet.js"></script>
<link rel="stylesheet" href="bower_components/leaflet.markercluster/dist/MarkerCluster.css" />
<link rel="stylesheet" href="bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css" />
<script src="bower_components/leaflet.markercluster/dist/leaflet.markercluster.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY"></script>
<script src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/src/markerclusterer.js"></script>script>
<script src="bower_components/d3-tip/index.js"></script>

<!-- dc-addons -->
<link rel="stylesheet" href="bower_components/dc-addons/dist/dc-addons.min.css" />
<script src="bower_components/dc-addons/dist/dc-addons.min.js"></script>
```

## Bubble Cloud

#### Usage
```js
var chart = dc.bubbleCloud('#chart');

// required options
chart
    .width(500)
    .height(500)
    .dimension(dimension)
    .group(group)
    .x(d3.scale.ordinal())
    .r(d3.scale.linear())
    .radiusValueAccessor(function(d) {
        return d.value;
    })

// optional options
chart
    valueAccessor(function(d) {
        return d.value;
    })
    .colorAccessor(function(d) {
        return d.value;
    })
    .label(function(d) {
        return d.key;
    })
    .renderLabel(true)
    .title(function(d) {
        return d.key + ': ' + d.value;
    })
    .renderTitle(true)

```

#### Examples
  * [Bubble Cloud](http://intellipharm.github.io/dc-addons/examples/bubble-cloud.html)


#### Requirements
None

If you want to include individually
```html
<script src="bower_components/dc-addons/dist/bubble-cloud/dc-bubble-cloud.min.js"></script>
```
