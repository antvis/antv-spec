# API
## Schema 

antv-spec describes visualization as json-format schema.

### Overview
All visualizations in antv-spec contain following properties. 
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


**ChartOnlineData**: data provided by online url for statistical charts.
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
```
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


**GraphOnlineData**: data provided by online url in the specification for graph.
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
