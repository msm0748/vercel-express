const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = 8080;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: true, // 클라이언트의 Origin
    credentials: true, // 요청에 인증 정보를 포함할 것임을 허용
  })
);

app.get('/', function (req, res) {
  res.send('ㅎㅇㅎㅇ');
});

app.post('/login', (req, res) => {
  console.log('요청옴');
  // 가정: 로그인이 성공했을 때 사용자 정보를 생성하고 쿠키에 저장한다.
  const userInfo = { username: 'exampleUser', id: 123456 };

  // 쿠키 만료 시간 설정 (1시간)
  const oneHour = 60 * 60 * 1000; // milliseconds
  const expiryDate = new Date(Date.now() + oneHour);

  // 쿠키 생성
  res.cookie('userInfo', userInfo, {
    httpOnly: true, // HTTP Only 설정
    expires: expiryDate, // 만료 시간 설정
    sameSite: 'none',
    secure: true, // Secure 설정
  });

  res.send('쿠키 심기');
});

app.post('/cookie', (req, res) => {
  console.log("req.cookies['userInfo'] = ", req.cookies['userInfo']);
  res.send('쿠키 가져오기');
});

// 서버가 실행할 PORT를 지정하고, 실행했을 때 콘솔로그를 찍음
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}! http://localhost:${PORT}`);
});
