import { Operator } from "./types";

export interface CalculaterInterface {
  tempValue: string | number;
  tempOperator?: Operator | string;
  render(inputValue: string | number): void;
  reset(): void;
  calulate(operator: Operator | string): void;
  initEvent(): void;
}
