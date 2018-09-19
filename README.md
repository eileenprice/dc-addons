# dc-addons

This [dc.js](http://dc-js.github.io/dc.js/) addon provides a bubble cloud for the dc namespace.

## Installation
```js
npm install dc-addons-bubble-chart --save
yarn add dc-addons-bubble-chart
```

```html
<script src="node_modules/dc-addons-bubble-cloud/dist/dc-bubble-cloud.min.js"></script>
```

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
