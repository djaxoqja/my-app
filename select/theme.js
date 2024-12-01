// 페이지 로드 시 다크모드 상태를 확인하고 적용
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme"); // 로컬 스토리지에서 저장된 테마 읽기
    if (savedTheme === "dark-mode") {
      document.body.setAttribute("data-theme", "dark-mode"); // 다크 모드 적용
      const toggleBtn = document.getElementById("toggleBtn");
      if (toggleBtn) toggleBtn.checked = true; // 토글 버튼 상태 동기화
    } else {
      document.body.setAttribute("data-theme", "light-mode"); // 라이트 모드 적용
    }
  });
  
  // 다크모드 토글 버튼 이벤트 리스너
  const toggleBtn = document.getElementById("toggleBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("change", () => {
      if (toggleBtn.checked) {
        document.body.setAttribute("data-theme", "dark-mode"); // 다크 모드 적용
        localStorage.setItem("theme", "dark-mode"); // 다크모드 상태 저장
      } else {
        document.body.setAttribute("data-theme", "light-mode"); // 라이트 모드 적용
        localStorage.setItem("theme", "light-mode"); // 라이트모드 상태 저장
      }
    });
  }
  