document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page');
  const cards = document.querySelectorAll('.bento-card');
  const modal = document.getElementById('assignment-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body-content');
  const modalTag = document.getElementById('modal-tag');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  sections.forEach(section => sectionObserver.observe(section));
  
  // Category labels for each modal
  const categoryLabels = {
    'modal-b1': '📁 Thao Tác Hệ Thống',
    'modal-b2': '🔍 Nghiên Cứu Học Thuật',
    'modal-b3': '🤖 Kỹ Nghệ Prompting',
    'modal-b4': '🤝 Công Cụ Hợp Tác',
    'modal-b5': '🎨 Sáng Tạo Nội Dung',
    'modal-b6': '🛡️ Sử Dụng AI Đạo Đức'
  };

  // Open Modal and Load Content from Template
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-target');
      const num = targetId.replace('modal-b', '');
      const categoryText = categoryLabels[targetId] || '✨ Bài Tập';
      
      // Set title tag
      modalTag.textContent = categoryText;
      
      // Show modal overlay
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Lock background scrolling
      
      // Load content from HTML Template tag
      const template = document.getElementById(`template-b${num}`);
      if (template) {
        modalBody.innerHTML = template.innerHTML;
      } else {
        modalBody.innerHTML = `
          <div class="docx-content" style="text-align: center; padding: 40px 0;">
            <p style="color: #ef4444; font-weight: 600;">Không tìm thấy nội dung bài tập.</p>
          </div>
        `;
      }
    });
  });

  // Close Modal
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Unlock scrolling
    setTimeout(() => {
      modalBody.innerHTML = ''; // Clear content after animation
    }, 400);
  }

  modalClose.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
});
