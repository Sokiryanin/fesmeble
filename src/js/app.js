// Підключення функціоналу "Чортоги Фрілансера"
import {
  addTouchAttr,
  addLoadedAttr,
  isMobile,
  FLS
} from '@js/common/functions.js';

import { tabsInit } from '@js/modules/tabs.js';

// Запуск
document.addEventListener('DOMContentLoaded', () => {
  tabsInit();
});

addTouchAttr();
addLoadedAttr();
