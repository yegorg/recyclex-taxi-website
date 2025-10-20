// Booking Form Handler for RECYCLEX s.r.o.
// Uses EmailJS to send booking requests to recyclexsk@gmail.com

class BookingFormHandler {
    constructor() {
        this.init();
    }

    init() {
        // Initialize EmailJS with your public key
        // You'll need to replace 'YOUR_PUBLIC_KEY' with actual EmailJS public key
        emailjs.init('06IFKOj-6EjGVO-A1');
        
        document.addEventListener('DOMContentLoaded', () => {
            const bookingForm = document.querySelector('.book-agileinfo-form form');
            if (bookingForm) {
                bookingForm.addEventListener('submit', (e) => this.handleSubmit(e));
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitButton = form.querySelector('input[type="submit"]');
        const originalButtonValue = submitButton.value;
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.value = this.getLoadingText();
        
        try {
            // Collect form data
            const formData = this.collectFormData(form);
            
            // Validate required fields
            if (!this.validateForm(formData)) {
                throw new Error('Please fill in all required fields');
            }
            
            // Send email via EmailJS
            await this.sendEmail(formData);
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Booking submission error:', error);
            this.showErrorMessage(error.message);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.value = originalButtonValue;
        }
    }

    collectFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        // Collect all form fields
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Get selected options text for dropdowns
        const cabSelect = form.querySelector('#cab');
        const passengersSelect = form.querySelector('#passengers');
        const directionSelect = form.querySelector('#direction');
        
        data.cabType = cabSelect.options[cabSelect.selectedIndex]?.text || 'Not selected';
        data.passengersCount = passengersSelect.options[passengersSelect.selectedIndex]?.text || 'Not selected';
        data.tripDirection = directionSelect.options[directionSelect.selectedIndex]?.text || 'Not selected';
        
        // Add timestamp
        data.submissionTime = new Date().toLocaleString();
        
        return data;
    }

    validateForm(data) {
        const requiredFields = ['Name', 'Phone no', 'email', 'Text', 'Time', 'Pick-up Location', 'Drop-off Location'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                return false;
            }
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error('Please enter a valid email address');
        }
        
        return true;
    }

    async sendEmail(data) {
        // Email template parameters
        const templateParams = {
            to_email: 'recyclexsk@gmail.com',
            from_name: data.Name,
            from_email: data.email,
            phone: data['Phone no'],
            pickup_date: data.Text,
            pickup_time: data.Time,
            pickup_location: data['Pick-up Location'],
            dropoff_location: data['Drop-off Location'],
            cab_type: data.cabType,
            passengers: data.passengersCount,
            direction: data.tripDirection,
            submission_time: data.submissionTime,
            message: `New taxi booking request from ${data.Name}

Customer Details:
- Name: ${data.Name}
- Phone: ${data['Phone no']}
- Email: ${data.email}

Booking Details:
- Pick-up Date: ${data.Text}
- Pick-up Time: ${data.Time}
- Pick-up Location: ${data['Pick-up Location']}
- Drop-off Location: ${data['Drop-off Location']}
- Cab Type: ${data.cabType}
- Number of Passengers: ${data.passengersCount}
- Trip Type: ${data.tripDirection}

Submitted: ${data.submissionTime}

Please contact the customer to confirm this booking.`
        };

        // Send email using EmailJS
        // You'll need to replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual values
        const response = await emailjs.send(
            'service_3aptdmq',
            'template_xsbc9bc',
            templateParams
        );

        if (response.status !== 200) {
            throw new Error('Failed to send booking request');
        }
    }

    showSuccessMessage() {
        const currentLang = window.languageSwitcher?.getCurrentLanguage() || 'en';
        
        const messages = {
            en: 'Booking request sent successfully! We will contact you soon to confirm your reservation.',
            sk: 'Požiadavka o rezerváciu bola úspešne odoslaná! Čoskoro vás budeme kontaktovať pre potvrdenie rezervácie.'
        };
        
        this.showMessage(messages[currentLang], 'success');
    }

    showErrorMessage(error) {
        const currentLang = window.languageSwitcher?.getCurrentLanguage() || 'en';
        
        const messages = {
            en: `Error sending booking request: ${error}. Please try again or call us directly at +421918094394.`,
            sk: `Chyba pri odosielaní požiadavky o rezerváciu: ${error}. Skúste to znova alebo nám zavolajte priamo na +421918094394.`
        };
        
        this.showMessage(messages[currentLang], 'error');
    }

    showMessage(message, type) {
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `booking-message booking-message-${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-icon">${type === 'success' ? '✓' : '⚠'}</span>
                <span class="message-text">${message}</span>
                <button class="message-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add styles
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 400px;
            z-index: 10000;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
            border-radius: 8px;
            padding: 15px;
            color: ${type === 'success' ? '#155724' : '#721c24'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease-out;
        `;

        // Add animation styles
        if (!document.getElementById('booking-message-styles')) {
            const styles = document.createElement('style');
            styles.id = 'booking-message-styles';
            styles.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .message-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .message-close {
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 0;
                    color: inherit;
                }
                .message-close:hover {
                    opacity: 0.7;
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(messageDiv);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 10000);
    }

    getLoadingText() {
        const currentLang = window.languageSwitcher?.getCurrentLanguage() || 'en';
        return currentLang === 'sk' ? 'Odosielanie...' : 'Sending...';
    }
}

// Initialize booking form handler
const bookingFormHandler = new BookingFormHandler();
