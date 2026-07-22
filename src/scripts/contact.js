// ===== Contact Form Handler =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                date: document.getElementById('date').value,
                people: document.getElementById('people').value,
                experience: document.getElementById('experience').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Validación
            if (!validateForm(formData)) {
                return;
            }
            
            // Mostrar mensaje de carga
            showMessage('Enviando...', 'info');
            
            // Simular envío (aquí se puede integrar con Formspree, EmailJS, o backend)
            setTimeout(() => {
                // En producción, reemplazar con llamada real a API
                console.log('Form data:', formData);
                
                // Mostrar mensaje de éxito
                showMessage('¡Gracias! Tu mensaje ha sido enviado. Te contactaremos pronto.', 'success');
                
                // Limpiar formulario
                contactForm.reset();
                
                // Opcional: Redirigir o hacer scroll
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 2000);
            }, 1500);
        });

        // ===== Validación en tiempo real =====
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
    
    // ===== Validación de formulario =====
    function validateForm(data) {
        // Validar nombre
        if (data.name.length < 3) {
            showMessage('Por favor, ingresa un nombre válido (mínimo 3 caracteres).', 'error');
            return false;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Por favor, ingresa un email válido.', 'error');
            return false;
        }
        
        // Validar teléfono
        const phoneRegex = /^[0-9+\s()-]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            showMessage('Por favor, ingresa un teléfono válido (mínimo 10 dígitos).', 'error');
            return false;
        }
        
        // Validar fecha
        if (!data.date) {
            showMessage('Por favor, selecciona una fecha de viaje.', 'error');
            return false;
        }
        
        // Validar número de personas
        if (data.people < 1) {
            showMessage('Por favor, ingresa un número válido de personas.', 'error');
            return false;
        }
        
        // Validar tipo de experiencia
        if (!data.experience) {
            showMessage('Por favor, selecciona un tipo de experiencia.', 'error');
            return false;
        }
        
        // Validar mensaje
        if (data.message.length < 10) {
            showMessage('Por favor, escribe un mensaje más detallado (mínimo 10 caracteres).', 'error');
            return false;
        }
        
        return true;
    }
    
    // ===== Mostrar mensaje =====
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form__message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
        // Scroll al mensaje
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch(field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Email inválido';
                break;
                
            case 'tel':
                const phoneRegex = /^[0-9+\s()-]{10,}$/;
                isValid = phoneRegex.test(value);
                errorMessage = 'Teléfono inválido';
                break;
                
            case 'number':
                isValid = parseInt(value) >= 1;
                errorMessage = 'Número inválido';
                break;
        }
        
        if (field.id === 'name' && value.length < 3) {
            isValid = false;
            errorMessage = 'Nombre muy corto';
        }
        
        if (field.id === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Mensaje muy corto';
        }
        
        // Aplicar estilos de error
        if (!isValid && value) {
            field.classList.add('error');
            field.style.borderColor = '#dc3545';
        } else {
            field.classList.remove('error');
            field.style.borderColor = '';
        }
        
        return isValid;
    }
});

// ===== Integración con Formspree (Opcional) =====
// Para usar Formspree, descomenta y reemplaza 'YOUR_FORM_ID' con tu ID de formulario
/*
function submitToFormspree(formData) {
    return fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showMessage('¡Gracias! Tu mensaje ha sido enviado.', 'success');
            return true;
        } else {
            showMessage('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
            return false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        return false;
    });
}
*/

// ===== Integración con EmailJS (Opcional) =====
// Para usar EmailJS, descomenta y configura con tus credenciales
/*
function submitToEmailJS(formData) {
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        date: formData.date,
        people: formData.people,
        experience: formData.experience,
        message: formData.message
    })
    .then(function(response) {
        showMessage('¡Gracias! Tu mensaje ha sido enviado.', 'success');
    }, function(error) {
        showMessage('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
    });
}
*/






























