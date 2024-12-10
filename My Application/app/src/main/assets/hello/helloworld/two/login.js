document.addEventListener('DOMContentLoaded', () => {
    Kakao.init('905182a9471e589035907c05f32bc67c'); // JavaScript 키 입력
    console.log('Kakao SDK 초기화:', Kakao.isInitialized());

    const kakaoLoginButton = document.getElementById('enter-number');

    kakaoLoginButton.addEventListener('click', () => {
        // Redirect 방식으로 로그인 요청
        Kakao.Auth.authorize({
            redirectUri: 'https://djaxoqja.github.io/my-app/kakao-callback.html', // Redirect URI 설정
        });
    });
});
