# antv-spec
A declarative grammar that supports various technology stacks of AntV.

## Features
**schema**: uniform visualization schema for AntV  
**adaptor**: translate schema to chart library

## Installation

```bash
npm install @antv/antv-spec
```

## Example

```ts
import { useEffect } from "react";
import { AntVSpec, specToG2Plot } from "@antv/antv-spec";

export default function App() {
  const chartSpec: AntVSpec = {
    basis: {
      type: "chart"
    },
    data: {
      type: "json-array",
      values: [
        { year: "2007", sales: 28, type: "A" },
        { year: "2008", sales: 55, type: "A" },
        { year: "2009", sales: 43, type: "A" },
        { year: "2010", sales: 91, type: "A" },
        { year: "2011", sales: 81, type: "A" },
        { year: "2012", sales: 53, type: "A" },
        { year: "2013", sales: 19, type: "A" },
        { year: "2014", sales: 87, type: "A" },
        { year: "2015", sales: 52, type: "A" },

        { year: "2007", sales: 34, type: "B" },
        { year: "2008", sales: 52, type: "B" },
        { year: "2009", sales: 70, type: "B" },
        { year: "2010", sales: 11, type: "B" },
        { year: "2011", sales: 46, type: "B" },
        { year: "2012", sales: 79, type: "B" },
        { year: "2013", sales: 23, type: "B" },
        { year: "2014", sales: 54, type: "B" },
        { year: "2015", sales: 99, type: "B" }
      ]
    },
    layer: [
      {
        mark: {
          type: "line",
          style: { color: "#444444" }
        },
        encoding: {
          x: {
            field: "year",
            type: "temporal"
          },
          y: {
            field: "sales",
            type: "quantitative"
          },
          color: {
            field: "type",
            type: "nominal",
            scale: {
              range: ["#5c0011", "#ffec3d", "#7cb305", "#08979c", "#003a8c"]
            }
          }
        }
      }
    ]
  };

  useEffect(() => {
    specToG2Plot(chartSpec, document.getElementById("container"));
  });

  return <div className="container"></div>;
}

```


## Documentation

This project is still an alpha version. We eagerly welcome any contribution.

For more usages, please check the [Quick API](./API.md).

