import { getWeather } from './getData.js';
// import { getPM } from './getData.js';

getWeather().then(todayMenu);

function todayMenu(data) {
  // 강수형태
  let ptyData = data;
}

// 버튼 이벤트
(function () {
  const btn = document.querySelector('.today-menu > button');
  const lightBox = document.querySelector('.today-menu-lightbox');
  const pickMenu = document.querySelector('.pick-menu');

  btn.addEventListener('click', showPickMenu);

  // 추천 메뉴 화면 보이기
  function showPickMenu() {
    lightBox.classList.add('on');
    pickMenu.classList.add('on');
  }
  // 추천 메뉴 화면 닫기
  lightBox.addEventListener('click', closePickMenu);
  function closePickMenu() {
    lightBox.classList.remove('on');
    pickMenu.classList.remove('on');
  }
})();
