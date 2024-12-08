const toggleBtn = document.getElementById('toggleBtn');
      const body = document.body;

      toggleBtn.addEventListener('change', () => {
        if (toggleBtn.checked) {
          body.setAttribute('data-theme', 'dark-mode');
        } else {
          body.setAttribute('data-theme', 'light-mode');
        }
      });