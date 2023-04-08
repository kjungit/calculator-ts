export type Operator = "+" | "-" | "×" | "÷" | "=";

export type ComputedValue = {
  [key in Exclude<Operator, "=">]: (num1: number, num2: number) => number;
  // Exclude<Operator, "="> : Operator에서 "="를 제외한 타입
};
