// Forms Enhancement Script
console.log('Forms script loaded');

(function() {
  'use strict';
  
  // Form validation and enhancement
  const enhanceForms = () => {
    const forms = document.querySelectorAll('form[data-enhance]');
    
    forms.forEach(form => {
      // Add loading state
      form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.dataset.originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
        }
      });

      // Email validation
      const emailInputs = form.querySelectorAll('input[type="email"]');
      emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
          const email = this.value;
          const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          
          if (email && !isValid) {
            this.classList.add('error');
            this.setCustomValidity('Please enter a valid email address');
          } else {
            this.classList.remove('error');
            this.setCustomValidity('');
          }
        });
      });

      // Phone number formatting
      const phoneInputs = form.querySelectorAll('input[type="tel"]');
      phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '');
          if (value.length > 0) {
            if (value.length <= 3) {
              value = `(${value}`;
            } else if (value.length <= 6) {
              value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
              value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
          }
          e.target.value = value;
        });
      });

      // Character counter for textareas
      const textareas = form.querySelectorAll('textarea[maxlength]');
      textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.fontSize = '0.875rem';
        counter.style.color = '#666';
        counter.style.marginTop = '0.25rem';
        textarea.parentNode.insertBefore(counter, textarea.nextSibling);
        
        const updateCounter = () => {
          const remaining = maxLength - textarea.value.length;
          counter.textContent = `${remaining} characters remaining`;
          counter.style.color = remaining < 20 ? '#ff6b6b' : '#666';
        };
        
        updateCounter();
        textarea.addEventListener('input', updateCounter);
      });
    });
  };

  // Auto-save form data
  const initAutoSave = () => {
    const forms = document.querySelectorAll('form[data-autosave]');
    
    forms.forEach(form => {
      const formId = form.id || 'form-' + Math.random().toString(36).substr(2, 9);
      form.id = formId;
      
      // Load saved data
      const savedData = localStorage.getItem(`form-${formId}`);
      if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(name => {
          const field = form.elements[name];
          if (field) field.value = data[name];
        });
      }
      
      // Save on input
      form.addEventListener('input', () => {
        const data = {};
        Array.from(form.elements).forEach(field => {
          if (field.name && field.type !== 'submit') {
            data[field.name] = field.value;
          }
        });
        localStorage.setItem(`form-${formId}`, JSON.stringify(data));
      });
      
      // Clear on successful submit
      form.addEventListener('submit', () => {
        localStorage.removeItem(`form-${formId}`);
      });
    });
  };

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      enhanceForms();
      initAutoSave();
    });
  } else {
    enhanceForms();
    initAutoSave();
  }

  // Expose form utilities
  window.Forms = {
    validate: (form) => {
      return form.checkValidity();
    },
    reset: (form) => {
      form.reset();
      const formId = form.id;
      if (formId) {
        localStorage.removeItem(`form-${formId}`);
      }
    }
  };
})();