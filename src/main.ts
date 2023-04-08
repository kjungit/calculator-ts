import "./style.css";
import { CalculaterInterface } from "./utils/interface";
import { ComputedValue, Operator } from "./utils/types";

const VALID_NUMBER_OF_DIGITS = 3;
const INIT_VALUE = 0;
const OPERATOR_SYMBOL = ["+", "-", "×", "÷"];

const validateNumberLength = (value: string | number) => {
  // 3자리 이상인지 확인
  return String(value).length < VALID_NUMBER_OF_DIGITS;
};

const isZero = (value: string) => Number(value) === INIT_VALUE; // 0인지 확인

const getComputedValue: ComputedValue = {
  "+": (num1, num2) => num1 + num2,
  "-": (num1, num2) => num1 - num2,
  "×": (num1, num2) => num1 * num2,
  "÷": (num1, num2) => num1 / num2,
};
const resultEl = <HTMLDivElement>document.querySelector("#result"); //

const Calculater: CalculaterInterface = {
  tempValue: INIT_VALUE,
  tempOperator: undefined,

  render(inputValue) {
    const prevValue = resultEl.innerText;

    if (!validateNumberLength(prevValue)) {
      // 3자리 이상인지 확인
      alert("숫자는 3자리까지만 입력 가능합니다.");
      return;
    }

    if (resultEl) {
      resultEl.innerText = isZero(prevValue) // 0일 경우
        ? String(inputValue) // inputValue로 대체
        : String(prevValue + inputValue); // inputValue를 뒤에 붙임
    }
  },

  reset() {
    resultEl.innerText = String(INIT_VALUE); // 0으로 초기화
    this.tempValue = INIT_VALUE; // tempValue 초기화
    this.tempOperator = undefined; // tempOperator 초기화
  },

  calulate(operator) {
    // 계산
    const isTempCalculated = OPERATOR_SYMBOL.includes(operator); // 연산자일 경우
    const isReadyCalculated = // 계산할 준비가 되었는지 확인
      operator === "=" &&
      this.tempOperator &&
      OPERATOR_SYMBOL.includes(this.tempOperator);

    if (isTempCalculated) {
      this.tempOperator = operator;
      this.tempValue = Number(resultEl.innerText);
      resultEl.innerText = String(INIT_VALUE);
      return;
    }

    if (isReadyCalculated) {
      const resultValue = getComputedValue[
        this.tempOperator as Exclude<Operator, "=">
      ](Number(this.tempValue), Number(resultEl.innerText));
      console.log(resultValue);

      resultEl.innerText = String(resultValue.toLocaleString());
    }
  },

  initEvent() {
    const buttonContainerEl = document.querySelector(".contents");

    buttonContainerEl?.addEventListener("click", ({ target }) => {
      const buttonText = (target as HTMLButtonElement).innerText;
      if (buttonText === "AC") {
        this.reset();
        return;
      }

      if (OPERATOR_SYMBOL.concat("=").includes(buttonText)) {
        // 연산자일 경우
        this.calulate(buttonText);
        return;
      }

      if (!Number.isNaN(buttonText)) {
        this.render(Number(buttonText));
      }
    });
  },
};

Calculater.render(INIT_VALUE);
Calculater.initEvent();
