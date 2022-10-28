// 날씨 정보 API
fetch(
  'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=cbKPAKuWx1NutItr9hyyQeTi1Sx%2BBmKYKNE2khzyNrvHABB0vA7hVL8dV1X3zJFT3X3jpUMmihKQ4d%2FQlqaQZA%3D%3D&numOfRows=10&pageNo=1&dataType=JSON&base_date=20221025&base_time=0800&nx=62&ny=123'
)
  .then((response) => response.json())
  .then(getWeatherData);

// TMP = 1시간 기온
// PTY = 0(없음), 1(비), 2(비/눈), 3(눈), 4(소나기)
function getWeatherData(data) {
  const weatherDataItems = data.response.body.items.item;
  console.log(weatherDataItems);
  weatherDataItems.forEach((weatherData) => {
    const tmp = weatherData.fcstValue;
    const pty = weatherData.fcstValue;
    // 기온
    if (weatherData.category === 'TMP') {
      console.log(`${tmp}°C`);
    }

    // 강수형태
    if (weatherData.category === 'PTY') {
      if (pty === 1) {
        console.log('비');
      } else if (pty === 2) {
        console.log('비/눈');
      } else if (pty === 3) {
        console.log('눈');
      } else if (pty === 4) {
        console.log('소나기');
      } else {
        console.log('없음');
      }
    }
  });
}

// 실시간 미세먼지 정보 API
fetch(
  'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=cbKPAKuWx1NutItr9hyyQeTi1Sx%2BBmKYKNE2khzyNrvHABB0vA7hVL8dV1X3zJFT3X3jpUMmihKQ4d%2FQlqaQZA%3D%3D&returnType=json&numOfRows=100&pageNo=1&stationName=대왕판교로(백현동)&dataTerm=DAILY&ver=1.3'
)
  .then((response) => response.json())
  .then(getPMData);

// PM10 = 미세먼지
// PM2.5 = 초미세먼지
// dataTime = 측정일
// pm10Value = 미세먼지 농도
// pm25Value = 초미세먼지 농도
// pm10Grade1h, pm25Grade1h = 미세먼지 1시간 등급
// Grade 값 = 1(좋음), 2(보통), 3(나쁨), 4(매우나쁨)
function getPMData(data) {
  // const pMDataItems = data.response.body.items;
  const updatePMData = data.response.body.items[0];
  console.log(updatePMData);
  console.log(updatePMData.dataTime);
  console.log(updatePMData.pm10Grade1h); // 좋음
}
