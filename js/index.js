import { keyboard } from './keyboard/keyboard.js';
import { setLocalStorage, getLocalStorage } from './localStorage.js';

window.onload = function init() {
  if (getLocalStorage('lang')) {
    keyboard.language = getLocalStorage('lang');
  } else {
    setLocalStorage('lang', keyboard.language);
  }

  keyboard.render();
};
