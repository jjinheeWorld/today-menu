import { getWeather } from './getData.js';
// import { getPM } from './getData.js';

getWeather().then(todayMenu);

function todayMenu(data) {
  // 강수형태
  let ptyData = data;
}
