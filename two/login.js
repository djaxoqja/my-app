document.addEventListener('DOMContentLoaded', () => {
  // 카카오 SDK 초기화
  Kakao.init('905182a9471e589035907c05f32bc67c'); // JavaScript 키 입력
  console.log('Kakao SDK 초기화:', Kakao.isInitialized()); // 초기화 여부 확인

  const kakaoLoginButton = document.getElementById('enter-number');

  // 로그인 함수
  function loginWithKakao() {
    Kakao.Auth.login({
        success: function(authObj) {
            console.log(authObj); // 로그인 성공 후 처리
        },
        fail: function(err) {
            console.log(err); // 로그인 실패 처리
        },
        redirectUri: 'https://djaxoqja.github.io/my-app/select/select.html'  // 리디렉션 URI 설정
    });
}


  // 사용자 정보 요청 함수
  function getUserInfo() {
      Kakao.API.request({
          url: '/v2/user/me',
          success: function (res) {
              console.log('사용자 정보:', res); // 사용자 정보 출력

              // 로그인 성공 후, 다음 페이지로 리다이렉트
              console.log('로그인 성공 후 리디렉션');
              window.location.href = 'https://djaxoqja.github.io/my-app/select/select.html';
 // 절대 경로 권장
          },
          fail: function (err) {
              console.error('사용자 정보 요청 실패:', err); // 요청 실패 시 오류 출력
              alert('사용자 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.');
          },
      });
  }

  // 버튼 클릭 이벤트 추가
  kakaoLoginButton.addEventListener('click', loginWithKakao);
});
