// 날씨 정보 내보내기
export function getWeather() {
  // 날씨 정보 API
  const weatherResult = fetch(
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=cbKPAKuWx1NutItr9hyyQeTi1Sx%2BBmKYKNE2khzyNrvHABB0vA7hVL8dV1X3zJFT3X3jpUMmihKQ4d%2FQlqaQZA%3D%3D&numOfRows=10&pageNo=1&dataType=JSON&base_date=20221102&base_time=0800&nx=62&ny=123'
  )
    .then((response) => response.json())
    .then(getWeatherData);

  function getWeatherData(data) {
    const weatherDataItems = data.response.body.items.item;
    let tmpData = 0; // 기온 몇 °C인지
    let ptyData = 0; // 강수형태 몇인지

    // 기온
    // TMP = 1시간 기온
    viewWeatherTemp();
    function viewWeatherTemp() {
      const weatherTemp = document.querySelector('.weather-temp');
      weatherDataItems.forEach((weatherData) => {
        const tmp = weatherData.fcstValue;
        if (weatherData.category === 'TMP') {
          weatherTemp.textContent = `${tmp}°C`;
          tmpData = tmp; // 기온 몇 °C인지 tmpData에 할당
          return;
        }
      });
    }

    // 강수형태
    // PTY = 0(없음), 1(비), 2(비/눈), 3(눈), 4(소나기)
    viewWeatherImg(tmpData);
    function viewWeatherImg(tmp) {
      const weatherInfo = document.querySelector('.weather-pty');
      const weatherImg = document.querySelector('.weather');

      weatherDataItems.forEach((weatherData) => {
        const pty = weatherData.fcstValue;
        if (weatherData.category === 'PTY') {
          if (pty == 1) {
            weatherInfo.textContent = '비';
            weatherImg.style.backgroundImage = `url(../images/weather/rain.svg)`; // 비
          } else if (pty == 2) {
            console.log('비/눈');
            if (tmp > 0) {
              // tmp가 0°C보다 높으면 비
              weatherInfo.textContent = '비';
              weatherImg.style.backgroundImage = `url(../images/weather/rain.svg)`;
            } else {
              // tmp가 0°C보다 낮으면 눈
              weatherInfo.textContent = '눈';
              weatherImg.style.backgroundImage = `url(../images/weather/snow.svg)`;
            }
          } else if (pty == 3) {
            weatherInfo.textContent = '눈';
            weatherImg.style.backgroundImage = `url(../images/weather/snow.svg)`; // 눈
          } else if (pty == 4) {
            weatherInfo.textContent = '소나기';
            weatherImg.style.backgroundImage = `url(../images/weather/rain.svg)`; // 소나기
          } else {
            weatherInfo.textContent = '맑음';
            weatherImg.style.backgroundImage = `url(../images/weather/sun.svg)`; // 맑음
          }

          ptyData = pty; // 강수형태 몇인지 ptyData에 할당
          return;
        }
      });
    }
    return ptyData;
  }
  return weatherResult;
}

// 미세먼지 정보 내보내기
export function getPM() {
  // 실시간 미세먼지 정보 API
  const pMResult = fetch(
    'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=cbKPAKuWx1NutItr9hyyQeTi1Sx%2BBmKYKNE2khzyNrvHABB0vA7hVL8dV1X3zJFT3X3jpUMmihKQ4d%2FQlqaQZA%3D%3D&returnType=json&numOfRows=100&pageNo=1&stationName=대왕판교로(백현동)&dataTerm=DAILY&ver=1.3'
  )
    .then((response) => response.json())
    .then(getPMData);

  // PM10 = 미세먼지
  // pm10Value = 미세먼지 농도
  // pm10Grade1h = 미세먼지 1시간 등급
  // Grade 값 = 1(좋음), 2(보통), 3(나쁨), 4(매우나쁨)
  function getPMData(data) {
    const updatePMData = data.response.body.items[0]; // 최신 미세먼지 정보

    const pMImg = document.querySelector('.pm');
    const pMGrade = document.querySelector('.pm-grade');
    const pMValue = document.querySelector('.pm-value');

    // resize될 때 마다 이미지 색상 변경
    window.addEventListener('resize', viewPMImg);

    // 미세먼지 농도
    pMValue.textContent = `${updatePMData.pm10Value} ㎍/㎥`;

    // 미세먼지 등급
    viewPMGrade();
    function viewPMGrade() {
      if (updatePMData.pm10Grade1h == 1) {
        pMGrade.textContent = '좋음';
      } else if (updatePMData.pm10Grade1h == 2) {
        pMGrade.textContent = '보통';
      } else if (updatePMData.pm10Grade1h == 3) {
        pMGrade.textContent = '나쁨';
      } else {
        pMGrade.textContent = '매우나쁨';
      }
    }
    // viewPMImg 함수에서 사용하기 위해 pMGrade.textContent 값을 변수에 담는다.
    const pMGradeText = pMGrade.textContent;

    // 미세먼지 등급에 따른 이미지
    viewPMImg();
    function viewPMImg() {
      if (window.innerWidth < 989) {
        if (pMGradeText == '좋음') {
          pMImg.style.backgroundImage = `url(../images/emoji/very-good.svg)`;
        } else if (pMGradeText == '보통') {
          pMImg.style.backgroundImage = `url(../images/emoji/good.svg)`;
        } else if (pMGradeText == '나쁨') {
          pMImg.style.backgroundImage = `url(../images/emoji/bad.svg)`;
        } else {
          pMImg.style.backgroundImage = `url(../images/emoji/very-bad.svg)`;
        }
      } else {
        if (pMGradeText == '좋음') {
          pMImg.style.backgroundImage = `url(../images/emoji/very-good-black.svg)`;
        } else if (pMGradeText == '보통') {
          pMImg.style.backgroundImage = `url(../images/emoji/good-black.svg)`;
        } else if (pMGradeText == '나쁨') {
          pMImg.style.backgroundImage = `url(../images/emoji/bad-black.svg)`;
        } else {
          pMImg.style.backgroundImage = `url(../images/emoji/very-bad-black.svg)`;
        }
      }
    }
    return updatePMData.pm10Grade1h;
  }
  return pMResult;
}
