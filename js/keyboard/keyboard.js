import {
  FIRST_ROW,
  SECOND_ROW,
  THIRD_ROW,
  FOURTH_ROW,
  FIFTH_ROW,
} from '../constants.js';
import { Button, keyboardButton } from '../button/button.js';
import { setLocalStorage } from '../localStorage.js';

class Keyboard {
  constructor() {
    this.lang = 'en';
    this.wrapper = document.body;
    this.textArea = document.querySelector('.text');
    this.isCapsLockPressed = false;
    this.isShiftPressed = false;
    this.isAltPressed = false;
    this.isControlPressed = false;
  }

  set language(value) {
    this.lang = value;
  }

  get language() {
    return this.lang;
  }

  createRow(rowObj) {
    this.row = document.createElement('div');
    this.row.classList.add('row');

    for (let i = 0; i < rowObj.length; i += 1) {
      const element = new Button(rowObj[i], this.lang);
      const newElement = element.createButton();
      this.row.append(newElement);
    }
    return this.row;
  }

  render() {
    const section = document.createElement('section');
    section.setAttribute('id', 'section-main');

    const container = document.createElement('div');
    container.classList.add('container');

    const title = document.createElement('h1');
    title.innerHTML = 'Virtual Keyboard';
    title.classList.add('title');

    const textArea = document.createElement('textarea');
    textArea.setAttribute('id', 'keyboard-screen');
    textArea.setAttribute('name', 'keyboard-screen');
    textArea.setAttribute('rows', '10');
    textArea.setAttribute('cols', '85');
    textArea.setAttribute('autofocus', 'true');
    textArea.classList.add('text');

    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.classList.add('keyboard');

    container.append(title);
    container.append(textArea);

    this.firstRow = this.createRow(FIRST_ROW);
    this.secondRow = this.createRow(SECOND_ROW);
    this.thirdRow = this.createRow(THIRD_ROW);
    this.fourthRow = this.createRow(FOURTH_ROW);
    this.fifthRow = this.createRow(FIFTH_ROW);

    keyboardWrapper.append(this.firstRow);
    keyboardWrapper.append(this.secondRow);
    keyboardWrapper.append(this.thirdRow);
    keyboardWrapper.append(this.fourthRow);
    keyboardWrapper.append(this.fifthRow);

    container.append(keyboardWrapper);
    container.insertAdjacentHTML(
      'beforeend',
      `<div class="footer__wrapper">
    <p>Клавиатура создана в операционной системе Windows</p>
    <p>Для переключения языка комбинация: левые ctrl + alt</p>
    </div>
    `,
    );
    section.append(container);
    this.wrapper.append(section);
    keyboardWrapper.addEventListener(
      'mousedown',
      this.handleMouseDown.bind(this),
    );

    keyboardWrapper.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyUp(event) {
    const key = event.code;
    if (key === 'CapsLock') return;
    if (key === 'ShiftLeft' || key === 'ShiftRight') {
      keyboardButton.keyShiftUp(this.isCapsLockPressed);
      this.isShiftPressed = false;
    }
    if (key === 'AltLeft') {
      this.isAltPressed = false;
    }

    if (key === 'ControlLeft') {
      this.isControlPressed = false;
    }
    keyboardButton.removeColor(event);
  }

  changeLanguage() {
    const enElements = document.querySelectorAll('.en');
    const ruElements = document.querySelectorAll('.ru');
    if (this.lang === 'en') {
      this.lang = 'ru';
      enElements.forEach((element) => {
        element.setAttribute('hidden', true);
      });
      ruElements.forEach((element) => {
        element.removeAttribute('hidden');
      });
      setLocalStorage('lang', 'ru');
    } else {
      this.lang = 'en';
      enElements.forEach((element) => {
        element.removeAttribute('hidden');
      });
      ruElements.forEach((element) => {
        element.setAttribute('hidden', true);
      });
      setLocalStorage('lang', 'en');
    }
  }

  handleKeyDown(event) {
    const textArea = document.getElementById('keyboard-screen');
    const key = event.code;
    if (key !== 'CapsLock') {
      keyboardButton.changeColor(event, this.isCapsLockPressed);
    }
    event.preventDefault();

    const letter = document.getElementById(`${key}`);

    let symbolToRender;
    if (key === 'Tab') {
      symbolToRender = '    ';
    } else if (key === 'Space') {
      symbolToRender = ' ';
    } else {
      symbolToRender = letter.querySelector(
        `.${this.lang} span:not([hidden])`,
      ).innerText;
    }

    if (key === 'ShiftLeft' || key === 'ShiftRight') {
      keyboardButton.pressShiftDown(this.isCapsLockPressed);
      this.isShiftPressed = true;
      return;
    }

    if (key === 'Backspace') {
      const position = this.getCaretPosition(textArea);
      if (position < 1) return;

      textArea.value = textArea.value.substr(0, position - 1)
      + textArea.value.substr(position);
      textArea.selectionStart = position - 1;
      textArea.selectionEnd = position - 1;
      textArea.focus();
      return;
    }

    if (key === 'Delete') {
      const position = this.getCaretPosition(textArea);
      textArea.value = textArea.value.substr(0, position)
        + textArea.value.substr(position + 1);
      textArea.selectionStart = position;
      textArea.selectionEnd = position;
      textArea.focus();
      return;
    }

    if (key === 'Enter') {
      const position = this.getCaretPosition(textArea);
      event.preventDefault();
      textArea.value = `${textArea.value.substring(
        0,
        textArea.selectionStart,
      )}\r\n${textArea.value.substring(
        textArea.selectionEnd,
        textArea.value.length,
      )}`;
      textArea.selectionEnd = position + 1;
      return;
    }

    if (key === 'AltLeft') {
      event.preventDefault();
      this.isAltPressed = true;
    }

    if (key === 'ControlLeft') {
      this.isControlPressed = true;
    }

    if (
      (key === 'ControlLeft' && this.isAltPressed)
      || (key === 'AltLeft' && this.isControlPressed)
    ) {
      this.changeLanguage();
      return;
    }

    if (key === 'CapsLock') {
      const isCapsRepeating = event.repeat;
      if (isCapsRepeating) return;
      keyboardButton.changeColor(event, this.isCapsLockPressed);
      keyboardButton.pressCapsLockDown(
        this.isCapsLockPressed,
        this.isShiftPressed,
      );
      this.isCapsLockPressed = !this.isCapsLockPressed;
      return;
    }

    if (key === 'ControlRight' || key === 'AltRight') {
      return;
    }

    if (key !== 'ControlLeft' && key !== 'AltLeft') {
      const positionOfCaret = this.getCaretPosition(textArea);
      if (positionOfCaret === textArea.value.length) {
        textArea.value += symbolToRender;
      } else {
        textArea.value = textArea.value.substr(0, positionOfCaret)
        + symbolToRender + textArea.value.substr(positionOfCaret);
        textArea.selectionStart = positionOfCaret + symbolToRender.length;
        textArea.selectionEnd = positionOfCaret + symbolToRender.length;
      }
    }
  }

  getCaretPosition(textAreaElement) {
    textAreaElement.focus();
    this.caretPos = textAreaElement.selectionStart;
    return this.caretPos;
  }

  handleMouseDown(event) {
    if (
      !event.target.classList.contains('key')
      && event.target.parentElement.className !== 'en'
      && event.target.parentElement.className !== 'ru'
    ) {
      return;
    }
    const ativeKeyElement = event.target.nodeName === 'DIV'
      ? event.target.querySelector(`.${this.lang} span:not([hidden])`)
      : event.target;
    const key = ativeKeyElement.closest('div');
    let symbolToRender;
    if (key.id === 'Tab') {
      symbolToRender = '    ';
    } else if (key.id === 'Space') {
      symbolToRender = ' ';
    } else {
      symbolToRender = ativeKeyElement.innerText;
    }

    const textArea = document.getElementById('keyboard-screen');
    const positionOfCaret = this.getCaretPosition(textArea);
    if (key.id === 'Backspace') {
      if (positionOfCaret < 1) return;

      textArea.value = textArea.value.substr(0, positionOfCaret - 1)
        + textArea.value.substr(positionOfCaret);
      textArea.selectionStart = positionOfCaret - 1;
      textArea.selectionEnd = positionOfCaret - 1;
      textArea.focus();
      return;
    }

    if (key.id === 'Delete') {
      textArea.value = textArea.value.substr(0, positionOfCaret)
      + textArea.value.substr(positionOfCaret + 1);

      textArea.selectionStart = positionOfCaret;
      textArea.selectionEnd = positionOfCaret;
      textArea.focus();
      return;
    }

    if (key.id === 'CapsLock') {
      if (event.repeat) return;
      keyboardButton.pressCapsLockDown(
        this.isCapsLockPressed,
        this.isShiftPressed,
      );
      keyboardButton.changeColorMouseEvent(key, this.isCapsLockPressed);
      this.isCapsLockPressed = !this.isCapsLockPressed;
      return;
    }

    if (key.id === 'Enter') {
      event.preventDefault();
      textArea.value = `${textArea.value.substring(
        0,
        textArea.selectionStart,
      )}\r\n${textArea.value.substring(
        textArea.selectionEnd,
        textArea.value.length,
      )}`;
      textArea.selectionEnd = positionOfCaret + 1;
      return;
    }

    if (key.id === 'ShiftLeft' || key.id === 'ShiftRight') {
      keyboardButton.pressShiftDown(this.isCapsLockPressed);
      keyboardButton.changeColorMouseEvent(key, this.isCapsLockPressed);
      this.isShiftPressed = true;
      return;
    }

    if (
      key.id === 'ControlLeft'
      || key.id === 'AltLeft'
      || key.id === 'ControlRight'
      || key.id === 'AltRight'
    ) {
      return;
    }

    if (positionOfCaret === textArea.value.length) {
      textArea.value += symbolToRender;
    } else {
      textArea.value = textArea.value.substr(0, positionOfCaret)
      + symbolToRender + textArea.value.substr(positionOfCaret);
      textArea.selectionStart = positionOfCaret + symbolToRender.length;
      textArea.selectionEnd = positionOfCaret + symbolToRender.length;
    }

    textArea.focus();
  }

  handleMouseUp(event) {
    const ativeKeyElement = event.target.nodeName === 'DIV'
      ? event.target.querySelector('span span:not([hidden])')
      : event.target;

    const key = ativeKeyElement.closest('div');
    if (key.id === 'ShiftLeft' || key.id === 'ShiftRight') {
      keyboardButton.keyShiftUp(this.isCapsLockPressed);
      keyboardButton.removeColorMouseEvent(key);
      this.isShiftPressed = false;
    }
  }
}

const keyboard = new Keyboard();
export { keyboard, Keyboard };
