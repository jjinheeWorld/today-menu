import { getWeather } from './getData.js';
import { getPM } from './getData.js';

getWeather().then(todayMenu);

function todayMenu(data) {
  // 추천된 메뉴 이미지, 이름 노드 준비
  const menuImg = document.querySelector('.pick-menu-img');
  const menuName = document.querySelector('.pick-menu-name');

  // 메뉴 리스트
  // 비/눈/소나기 올 때 추천 메뉴
  const rainMenuList = [
    '두부김치',
    '떡볶이',
    '수제비',
    '어묵탕',
    '짬뽕',
    '칼국수',
    '파전',
  ];
  // 미세먼지 나쁨 이상일 때 추천 메뉴
  const pMHighMenuList = [
    '고등어구이',
    '마라탕',
    '미역국',
    '삼겹살',
    '오리고기',
    '콩나물국밥',
  ];
  // 모든 메뉴
  const allMenuList = [...rainMenuList, ...pMHighMenuList];

  // 메뉴 랜덤 추천
  const rainMenu = Math.floor(Math.random() * rainMenuList.length);
  const pMHighMenu = Math.floor(Math.random() * pMHighMenuList.length);
  const allMenu = Math.floor(Math.random() * allMenuList.length);

  // 강수형태
  let ptyData = data;

  // 미세먼지 등급
  getPM().then((data) => {
    let pMGradeData = data;

    // 조건에 따라 랜덤으로 메뉴 추천하기
    // 추천된 메뉴의 이름과 이미지 브라우저에 띄우기
    if (
      // 비/눈/소나기 O, 미세먼지 나쁨 이상 O
      (ptyData == 1 || ptyData == 2 || ptyData == 3 || ptyData == 4) &&
      (pMGradeData == 3 || pMGradeData == 4)
    ) {
      menuImg.src = `./images/food/${rainMenuList[rainMenu]}.jpg`;
      menuName.textContent = rainMenuList[rainMenu];
    } else if (
      // 비/눈/소나기 O, 미세먼지 나쁨 이상 X
      (ptyData == 1 || ptyData == 2 || ptyData == 3 || ptyData == 4) &&
      (pMGradeData == 1 || pMGradeData == 2)
    ) {
      menuImg.src = `./images/food/${rainMenuList[rainMenu]}.jpg`;
      menuName.textContent = rainMenuList[rainMenu];
    } else if (
      // 비/눈/소나기  X, 미세먼지 나쁨 이상 O
      ptyData == 0 &&
      (pMGradeData == 3 || pMGradeData == 4)
    ) {
      menuImg.src = `./images/food/${pMHighMenuList[pMHighMenu]}.jpg`;
      menuName.textContent = pMHighMenuList[pMHighMenu];
    } else if (
      // 비/눈/소나기  X, 미세먼지 나쁨 이상 X
      ptyData == 0 &&
      (pMGradeData == 1 || pMGradeData == 2)
    ) {
      menuImg.src = `./images/food/${allMenuList[allMenu]}.jpg`;
      menuName.textContent = allMenuList[allMenu];
    } else {
      throw '데이터에 문제가 있습니다.';
    }
  });
}

/**
 * 강수형태
 * 0(없음), 1(비), 2(비/눈), 3(눈), 4(소나기)
 *
 * 미세먼지 등급
 * 1(좋음), 2(보통), 3(나쁨), 4(매우나쁨)
 */

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
