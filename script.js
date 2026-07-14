/* ---- Tab Navigation ---- */
function go(sectionId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick')?.includes(sectionId)) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.bento-card');
  const modal = document.getElementById('assignment-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body-content');
  const modalTag = document.getElementById('modal-tag');
  
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
