// TODO:
// `position` and `style` detail structure
// detailed structure for non-text type
export type Annotation =
  | {
      type: 'text';
      position: object;
      content: string;
      style?: object;
    }
  | {
      type: 'line';
      position: object;
      style: object;
      start?: any;
      end?: any;
    }
  | {
      type: string;
      position: object;
      style: object;
    };
