// TODO: detailed type denifition. currently to support color hex string
export type Scale = {
  // range after data mapping
  // such as ['apple', 'banana'] --map to--> ['red', 'yellow'](range)
  range: (string | number)[];
  rangeMin: string | number;
  rangeMax: string | number;
  // data domain used to data mapping
  // such as [0, 100] --domain:[10, 90]--> [10, 90](filter data less than 10)
  domain: number[];
  domainMin: number;
  domaminMax: number;
};
