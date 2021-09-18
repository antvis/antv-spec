# API

## Schema 

antv-spec describes visualization as json-format schema.

### Overview

All visualizations in antv-spec contain the following properties. 
| Property     | Type                         | Required | Description                                                               |
|--------------|------------------------------|----------|---------------------------------------------------------------------------|
| basis        | Basis                        | True     | The basic information of the visualization, such as `type`, `width`, etc. |
| data         | Data                         | True     | The data used to encode visualization                                     |
| Layer        | ChartLayer[] \| GraphLayer[] | True     | The Layers of different marks and data encodings to form a visualization  |
| Components   | tbd                          | False    | tbd                                                                       |
| Interactions | tbd                          | False    | tbd                                                                       |


### Basis

`Basis` is the basic information of the visualization.

```json
{
  "type": ..., // visualization type
  "width": ...,
  "height": ...,
  "padding": ...,
}

```

| Property | Type                         | Required | Description                                                                           |
|----------|------------------------------|----------|---------------------------------------------------------------------------------------|
| type     | string                       | True     | Indicate what kind of visualization this spec is about, including `chart` and `graph` |
| width    | number                       | False    | indicating the visualization's width                                                  |
| height   | number                       | False    | indicating the visualization's height                                                 |
| padding  | number \| number[] \| 'auto' | False    | indicating the visualization's padding                                                |


### Data

`data` in antv-spec can be described as `ChartInlineData`, `ChartOnlineData`, `GraphInlineData`, and `GraphOnlineData`.

**ChartInlineData**: data provided directly in the specification for statistical charts.

```json
{
  "type": "json-array",
  "values": ...
}
```

| Property | Type                  | Required | Description                                                         |
|----------|-----------------------|----------|---------------------------------------------------------------------|
| type     | string                | False    | type of data, currently supporting `json-array`                     |
| values   | Record<string, any>[] | True     | data formatting as json array, such as `[{a:1, b:2}, {a:11, b:22}]` |


**ChartOnlineData**: data provided by online URL for statistical charts.

```json
{
  "type": "url",
  "values": ...,
  "config": ...
}
```

| Property | Type       | Required | Description                                                   |
|----------|------------|----------|---------------------------------------------------------------|
| type     | string     | False    | type of data, currently supporting `url`                      |
| values   | string     | True     | url of data source                                            |
| format   | string     | False    | format of data source for parsing, including `csv` and `json` |
| config   | DataConfig | False    | configuration for parsing


For supporting graph's nodes and links definition, **GraphData** should include at least two properties, such as the `persons` data for nodes and `relation` data for links.

```json
{
  "persons": [
    {
      "id": "node1",
      "label": "node1",
      "cost": 60,
      "type": "A"
    },
    {
      "id": "node2",
      "label": "node2",
      "cost": 25,
      "type": "B"
    },
    {
      "id": "node3",
      "label": "node3",
      "cost": 25,
      "type": "B"
    }
  ],
  "relation": [
    {
      "source": "node1",
      "target": "node2",
      "weight": 5,
      "type": "X"
    },
    {
      "source": "node2",
      "target": "node3",
      "weight": 10,
      "type": "Y"
    }
  ]
}
```

**GraphInlineData**: data provided directly in the specification for graph.

```json
{
  "type": "json",
  "values": ... // GraphData has specific structure
}
```

| Property | Type                  | Required | Description                                                         |
|----------|-----------------------|----------|---------------------------------------------------------------------|
| type     | string                | False    | type of data, currently supporting `json`                     |
| values   | GraphData           | True     | data formatting as `GraphData` |


**GraphOnlineData**: data provided by online URL in the specification for graph.

```json
{
  "type": "url",
  "values": ...,
}
```

| Property | Type       | Required | Description                                                   |
|----------|------------|----------|---------------------------------------------------------------|
| type     | string     | False    | type of data, currently supporting `url`                      |
| values   | string     | True     | url of data source                                            |
| format   | string     | False    | format of data source for parsing, only supporting `json` |

### Mark

`mark` in visualization is the basic geometric element to depict data, such as `line` for line charts, `bar` for bar charts. 

#### Mark Types 

Antv-spec supports the following mark types categorized by visualization types:

* charts: `bar`, `line`, `arc`, `area`, `point`, `rect`
* graph:
  * nodes: `point`, `arc`, `rect`
  * lines: `line`

`mark` can be defined by the corresponding string such as:

```json
{
  "mark": "line"
}
```

Or to customize the configuration of the given mark by:

```json
{
  "mark": {
    "type": ...,
    "style": { ... }
  }
}
```

#### Mark Configuration

| Property | Type   | Required | Description                               |
|----------|--------|----------|-------------------------------------------|
| type     | string | True     | the mark type                             |
| style    | object | False    | the customized configuration for the mark |
| interpolate | string | False | the line interpolation method for `line` and `area` charts only, currently support `step` |


##### Style Properties

| Property    | Type   | Required | Description                                                       |
|-------------|--------|----------|-------------------------------------------------------------------|
| size        | number | False    | the size of the mark                                              |
| lineWidth   | number | False    | the line width for `line` mark                                    |
| strokeWidth | number | False    | the stroke width for marks with stroke properties such as `point` |
| color       | string | False    | the color for marks, in hex format, such as "#ffffff"             |
| opacity     | number | False    | the opacity for marks                                             |
| shape       | string | False    | the shape for `point` mark, such as `triangle`, `star`            |
| innerRadius | number | False    | the inner radius for `arc` mark, to specify donut charts          |

### Encoding

`encoding` denotes the mapping between data and marks' appearance, such as position, color, etc.

Antv-spec supports the following encoding channels categorized by visualization types:

* charts: `x`, `y`, `color`, `theta`, `size`, `column`, `row`
* graph: `size`, `color`, `theta`

```json
{
  "encoding": {
    ...: { ... }
  }
}
```

#### x / y

| Property  | Type              | Required | Description                                                                                                                                                              |
|-----------|-------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| field     | string            | False    | the data field mapping to the channel, only be optional when the aggregation type is `count`                                                                             |
| type      | string            | True     | the level of measurement of the data field, including `quantitative`, `temporal`, `ordinal` and `nominal`                                                                |
| axis      | object            | False    | the axis configuration, see **Axis**                                                                                                                                     |
| aggregate | string            | False    | the aggregation type of the data field, including `count`, `sum`, `min` and `max`                                                                                        |
| bin       | boolean           | False    | whether to perform binning transformation on the data field                                                                                                              |
| stack     | boolean \| string | False    | the stacking method on the data field, including `true`, `false`, `zero` and `normalize`. `true` and `zero` are the same and `normalize` is used for percentage stacking |

##### Axis

| Property     | Type    | Required | Description                                                          |
|--------------|---------|----------|----------------------------------------------------------------------|
| top          | boolean | False    | whether draw the axis on the top of the layer                        |
| position     | string  | False    | direction of the axis, including `top`, `bottom`, `left` and `right` |
| title        | object  | False    | title configuration of the axis, see **AxisTitleConfig**             |
| label        | object  | False    | label configuration of the axis, see **AxisLabelConfig**             |
| min          | number  | False    | min of the axis                                                      |
| max          | number  | False    | max of the axis                                                      |
| tickInterval | number  | False    | interval of the ticks in the axis                                    |
| ticks        | boolean | False    | whether to show ticks in the axis                                    |
| domain       | boolean | False    | whether to draw the domain line of the axis                          |

**AxisTitleConfig**

| Property     | Type    | Required | Description                                           |
|--------------|---------|----------|-------------------------------------------------------|
| text         | string  | True     | axis title text                                       |
| position     | string  | False    | axis title anchor, including `start`, `center`, `end` |

**AxisLabelConfig**

| Property     | Type    | Required | Description                                                 |
|--------------|---------|----------|-------------------------------------------------------------|
| offset       | number  | False    | axis label offset                                           |
| angle        | number  | False    | axis label rotation angle                                   |
| autoRotate   | boolean | False    | whether to automatically rotate axis labels                 |
| autoHide     | boolean | False    | whether to automatically hid axis labels when overlapping   |
| autoEllipsis | boolean | False    | whether to automatically ellipsis axis labels when overflow |

#### color

| Property     | Type    | Required | Description                                                                                               |
|--------------|---------|----------|-----------------------------------------------------------------------------------------------------------|
| field        | string  | False    | the data field mapping to the channel, only be optional when the aggregation type is `count`              |
| type         | string  | True     | the level of measurement of the data field, including `quantitative`, `temporal`, `ordinal` and `nominal` |
| aggregate    | string  | False    | the aggregation type of the data field, including `count`, `sum`, `min` and `max`                         |
| scale        | object  | False    | the scale functions to transform data to visual values, see **Scale**                                     |

##### Scale

| Property  | Type                 | Required | Description                                                                                                                               |
|-----------|----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------|
| range     | string[] \| number[] | False    | range for data mapping, for example, mapping `['apple', 'banana']` to color `['#ff4500', '#f7ff00']`                                      |
| rangeMin  | string \| number     | False    | minimum value of the range for data mapping                                                                                               |
| rangeMax  | string \| number     | False    | maximum value of the range for data mapping                                                                                               |
| domain    | number[]             | False    | domain for data mapping, for example, data within [0, 100], `domain: [10, 90]` means filtering out values less than 10 and larger than 90 |
| domainMin | number               | False    | minimum value of the domain for data mapping                                                                                              |
| domainMax | number               | False    | maximum value of the domain for data mapping                                                                                              |

#### theta

| Property     | Type    | Required | Description                                                                                               |
|--------------|---------|----------|-----------------------------------------------------------------------------------------------------------|
| field        | string  | False    | the data field mapping to the channel, only be optional when the aggregation type is `count`              |
| type         | string  | True     | the level of measurement of the data field, including `quantitative`, `temporal`, `ordinal` and `nominal` |
| aggregate    | string  | False    | the aggregation type of the data field, including `count`, `sum`, `min` and `max`                         |

#### size

| Property     | Type    | Required | Description                                                                                               |
|--------------|---------|----------|-----------------------------------------------------------------------------------------------------------|
| field        | string  | False    | the data field mapping to the channel, only be optional when the aggregation type is `count`              |
| type         | string  | True     | the level of measurement of the data field, including `quantitative`, `temporal`, `ordinal` and `nominal` |
| aggregate    | string  | False    | the aggregation type of the data field, including `count`, `sum`, `min` and `max`                         |


#### column

`column` and `row` are used for facet / subplot in the visualization, which means the horizontal direction is divided into two dimensions: column and x (row and y for the horizontal bar chart). The column means that the horizontal direction is divided into n parts according to field A, and the x-axis is plotted in each part encoding field B.

| Property     | Type    | Required | Description                                                                                               |
|--------------|---------|----------|-----------------------------------------------------------------------------------------------------------|
| field        | string  | False    | the data field mapping to the channel, only be optional when the aggregation type is `count`              |
| type         | string  | True     | the level of measurement of the data field, including `quantitative`, `temporal`, `ordinal` and `nominal` |

#### row

| Property     | Type    | Required | Description                                                                                               |
|--------------|---------|----------|-----------------------------------------------------------------------------------------------------------|
| field        | string  | False    | the data field mapping to the channel, only be optional when the aggregation type is `count`              |
| type         | string  | True     | the level of measurement of the data field, including `quantitative`, `temporal`, `ordinal` and `nominal` |

### Layer

Visualization defined by antv-spec is built by one or multiple view layers, for example, a simple line chart contains a layer with `line` mark and `x` and `y` encodings, a node-link graph is comprised of one layer assigning encoding for nodes and another layer for links.

```json
{
  "layer": [
    ...
  ]
}
```

| Property | Type                         | Required | Description                         |
|----------|------------------------------|----------|-------------------------------------|
| layer    | ChartLayer[] \| GraphLayer[] | True     | layers to compose the visualization |


**ChartLayer**

```json
{
  "mark": ...,
  "encoding": { ... }
}
```

**GraphLayer**

```json
{
  "nodes": {
    "mark": ...,
    "encoding": { ... }
  },
  "links": {
    "mark": ...,
    "encoding": { ... }
  }
}
```

## Adaptor

Currently, antv-spec provide a simple adaptor of G2Plot. Contributions for adaptors of other chart libraries are welcomed.

### G2Plot

> Experimental version, can not access the full functionality of G2Plot

```ts
specToG2Plot(spec, container);
```

**spec**  
The visualization specification described in antv-spec.

**container**  
The DOM element of the container to draw the visualization in.
