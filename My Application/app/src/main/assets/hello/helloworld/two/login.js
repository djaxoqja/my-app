document.addEventListener('DOMContentLoaded', () => {
    Kakao.init('905182a9471e589035907c05f32bc67c'); // JavaScript 키 입력
    console.log('Kakao SDK 초기화:', Kakao.isInitialized());

    const kakaoLoginButton = document.getElementById('enter-number');

    kakaoLoginButton.addEventListener('click', () => {
        // 리디렉션 방식으로 카카오 로그인
        Kakao.Auth.loginForm({
            success: function (authObj) {
                console.log('로그인 성공:', authObj);

                // 서버로 액세스 토큰 전달
                fetch('https://port-0-findmerestapi-m3fhz3vp2699497a.sel4.cloudtype.app/users/kakao/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ access_token: authObj.access_token }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.access_token) {
                        // JWT 토큰을 쿠키에 저장
                        document.cookie = `token=${data.access_token}; path=/; Secure`;
                        console.log('JWT Token 저장 완료:', data.access_token);

                        // 로그인 성공 후 리디렉션
                        window.location.href = '../select/select.html';
                    } else {
                        alert('로그인에 실패했습니다.');
                    }
                })
                .catch((error) => {
                    console.error('API 요청 실패:', error);
                    alert('서버 요청에 실패했습니다. 다시 시도해주세요.');
                });
            },
            fail: function (err) {
                console.error('로그인 실패:', err);
            }
        });
    });
});
