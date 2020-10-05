import { checkerFunction } from './checker-function';

export interface DoCheckerType {
  check: checkerFunction;
  name: string;

  setName(name: string): void;
}
