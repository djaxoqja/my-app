document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); // 카카오에서 전달받은 인증 코드

    if (code) {
        // 서버로 인증 코드 전달
        fetch('https://port-0-findmerestapi-m3fhz3vp2699497a.sel4.cloudtype.app/users/kakao/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }), // 인증 코드 서버로 전송
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
    } else {
        alert('인증 코드가 없습니다. 다시 시도해주세요.');
    }
});
