# Booking Form Setup Instructions

The booking form is now ready to work with EmailJS to send booking requests to `recyclexsk@gmail.com`. Follow these steps to make it fully functional:

## 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Set Up Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (recommended for recyclexsk@gmail.com)
4. Connect your Gmail account (recyclexsk@gmail.com)
5. Copy the **Service ID** (you'll need this later)

## 3. Create Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Taxi Booking Request from {{from_name}}

New taxi booking request received:

Customer Details:
- Name: {{from_name}}
- Phone: {{phone}}
- Email: {{from_email}}

Booking Details:
- Pick-up Date: {{pickup_date}}
- Pick-up Time: {{pickup_time}}
- Pick-up Location: {{pickup_location}}
- Drop-off Location: {{dropoff_location}}
- Cab Type: {{cab_type}}
- Number of Passengers: {{passengers}}
- Trip Type: {{direction}}

Submitted: {{submission_time}}

Please contact the customer to confirm this booking.

---
RECYCLEX s.r.o. Booking System
```

4. Set the **To Email** to: `recyclexsk@gmail.com`
5. Copy the **Template ID** (you'll need this later)

## 4. Get Your Public Key

1. Go to **Account** > **General** in your EmailJS dashboard
2. Copy your **Public Key**

## 5. Update the JavaScript Configuration

Edit the file `js/booking-form.js` and replace the following placeholders:

```javascript
// Line 12: Replace YOUR_PUBLIC_KEY with your actual public key
emailjs.init('YOUR_ACTUAL_PUBLIC_KEY');

// Lines 114-117: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
const response = await emailjs.send(
    'YOUR_ACTUAL_SERVICE_ID',
    'YOUR_ACTUAL_TEMPLATE_ID',
    templateParams
);
```

## 6. Test the Form

1. Open `booking.html` in your browser
2. Fill out all required fields
3. Click "Book Now" / "Rezervovať"
4. You should see a success message and receive an email at recyclexsk@gmail.com

## Form Features

- **Validation**: All required fields are validated before submission
- **Multi-language**: Success/error messages adapt to the current language (EN/SK)
- **User Feedback**: Loading states and confirmation messages
- **Email Format**: Professional booking request emails with all details
- **Error Handling**: Graceful error handling with helpful messages

## Troubleshooting

### Form Not Sending
- Check browser console for JavaScript errors
- Verify all three values (Public Key, Service ID, Template ID) are correctly set
- Ensure EmailJS service is properly connected to Gmail

### Not Receiving Emails
- Check spam/junk folder
- Verify the template "To Email" is set to recyclexsk@gmail.com
- Test the EmailJS service directly from their dashboard

### Validation Issues
- Ensure all required fields have proper `name` attributes
- Check that email format validation is working

## EmailJS Free Plan Limits

- 200 emails per month (free tier)
- For higher volume, consider upgrading to a paid plan
- Alternative: Set up a simple PHP backend for unlimited emails

## Security Notes

- EmailJS public key is safe to expose in client-side code
- No sensitive server credentials are exposed
- Email content is sent through EmailJS servers securely

---

Once configured, the booking form will automatically send detailed booking requests to recyclexsk@gmail.com whenever a customer submits the form!
