document.addEventListener('DOMContentLoaded', () => {
    const muteToggle = document.getElementById('muteToggle');
    const backgroundAudio = document.getElementById('backgroundAudio');
    const effectAudio = document.getElementById('effectAudio');

   // 초기 상태: 음소거
   backgroundAudio.volume = 0; // 음소거
   backgroundAudio.play();

   // 토글 상태 변경 시 처리
   muteToggle.addEventListener('change', () => {
       if (muteToggle.checked) {
           // 효과음 재생
           effectAudio.src = "../sound/switch_03.mp3";
           effectAudio.currentTime = 0; // 효과음 처음부터 재생
           effectAudio.play();

           // 음소거 해제
           backgroundAudio.volume = 1; // 볼륨 최대
       } else {
           // 음소거
           backgroundAudio.volume = 0; // 음소거
       }
   });
});