import {
  FIRST_ROW,
  SECOND_ROW,
  THIRD_ROW,
  FOURTH_ROW,
  FIFTH_ROW,
} from "../constants.js";

class Keyboard {
  constructor() {
    this.lang = "en";
    this.wrapper = document.body;
  }

  set language(value) {
    this.lang = value;
  }

  get language() {
    return this.lang;
  }

  createButton(buttonObj) {
    this.buttonWrapper = document.createElement("div");
    this.buttonWrapper.classList.add("key");
    this.buttonWrapper.setAttribute("id", `${buttonObj.code}`);
    this.buttonWrapper.insertAdjacentHTML(
      "afterbegin",
      `
    <span class="en" ${this.lang === "en" ? "" : "hidden"}>
      <span class="caseDown">${buttonObj.caseDown}</span>
      <span class="caseUp" hidden>${buttonObj.caseUp}</span>
      <span class="caps" hidden>${buttonObj.caseUp}</span>
      <span class="shiftCaps" hidden>${buttonObj.caseDown}</span>
    </span>
    <span class="ru" ${this.lang === "en" ? "hidden" : ""}>
      <span class="caseDown">${buttonObj.caseDownRu}</span>
      <span class="caseUp" hidden>${buttonObj.caseUpRu}</span>
      <span class="caps" hidden>${buttonObj.caseUpRu}</span>
      <span class="shiftCaps" hidden>${buttonObj.caseDownRu}</span>
    </span>
    `,
    );
    return this.buttonWrapper;
  }

  createRow(rowObj) {
    this.row = document.createElement("div");
    this.row.classList.add("row");

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rowObj.length; i++) {
      const element = this.createButton(rowObj[i]);
      this.row.append(element);
    }
    return this.row;
  }

  render() {
    this.firstRow = this.createRow(FIRST_ROW);
    this.secondRow = this.createRow(SECOND_ROW);
    this.thirdRow = this.createRow(THIRD_ROW);
    this.fourthRow = this.createRow(FOURTH_ROW);
    this.fifthRow = this.createRow(FIFTH_ROW);

    this.wrapper.append(this.firstRow);
    this.wrapper.append(this.secondRow);
    this.wrapper.append(this.thirdRow);
    this.wrapper.append(this.fourthRow);
    this.wrapper.append(this.fifthRow);
  }
}

const keyboard = new Keyboard();
export { keyboard, Keyboard };
