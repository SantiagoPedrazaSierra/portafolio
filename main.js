document.addEventListener('DOMContentLoaded', function() {
  // Sistema de pestañas
  const tabs = document.querySelectorAll('.tab');
  const fileLinks = document.querySelectorAll('.file-explorer .file');
  const tabContents = document.querySelectorAll('.tab-content');
  
  function switchTab(tabId) {
    tabContents.forEach(content => {
      content.style.display = 'none';
      content.classList.remove('active');
    });
    
    tabs.forEach(tab => tab.classList.remove('active'));
    fileLinks.forEach(file => file.classList.remove('active'));
    
    document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
    document.querySelector(`.file[data-tab="${tabId}"]`).classList.add('active');
    
    const activeContent = document.getElementById(tabId);
    activeContent.style.display = 'flex';
    activeContent.classList.add('active');
  }
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
  
  fileLinks.forEach(file => {
    file.addEventListener('click', () => switchTab(file.dataset.tab));
  });

  // Máquina de escribir
  const welcomeMessage = document.querySelector('.welcome-message');
  if (welcomeMessage) {
    const text = welcomeMessage.textContent;
    welcomeMessage.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        welcomeMessage.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    typeWriter();
  }

  // Formulario de contacto MEJORADO
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Crear elemento para mensajes
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    contactForm.appendChild(messageDiv);
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const button = this.querySelector('button');
      const messageDiv = this.querySelector('.form-message');
      
      // Validación básica
      const name = this.querySelector('#name').value.trim();
      const email = this.querySelector('#email').value.trim();
      const message = this.querySelector('#message').value.trim();
      
      if (!name || !email || !message) {
        messageDiv.textContent = '❌ Por favor completa todos los campos';
        messageDiv.style.color = 'var(--error-color)';
        return;
      }
      
      // Mostrar estado de envío
      button.textContent = 'Enviando...';
      button.disabled = true;
      messageDiv.textContent = '';
      
      // Simular envío (en un caso real sería una petición AJAX)
      setTimeout(() => {
        // Mostrar confirmación
        messageDiv.textContent = '✅ ¡Mensaje enviado con éxito!';
        messageDiv.style.color = 'var(--comment-color)';
        
        button.textContent = 'submit_contact()';
        button.disabled = false;
        
        // Resetear después de 3 segundos
        setTimeout(() => {
          this.reset();
          messageDiv.textContent = '';
        }, 3000);
      }, 1500);
    });
  }
});