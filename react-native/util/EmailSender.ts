const SERVICE_ID = 'mailgun';
const API_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const USER_ID = 'user_VGoIWoPTZlQsKlUbtQv2Y';
const TEMPLATE_ID = {
    bug: 'template_c2cJPJ9H',
    suggestion: 'suggestion',
};

interface EmailFormData {
    from: string;
    subject: string;
    body: string;
}

/**
 * @description Use EmailJS to send an email through Mailgun
 * @external https://dashboard.emailjs.com/
 * @external https://app.mailgun.com/app/dashboard
 * @param templateId - Determines which form EmailJS will use.
 * @param data - Data that will fill in form.
 */
function sendToEmailJsRestAPI(templateId: string, data: EmailFormData): void {
    // Ignore camel casing. Must be formatted this way for EmailJS.
    const restData = {
        service_id: SERVICE_ID, // eslint-disable-line @typescript-eslint/camelcase
        template_id: templateId, // eslint-disable-line @typescript-eslint/camelcase
        user_id: USER_ID, // eslint-disable-line @typescript-eslint/camelcase
        template_params: data, // eslint-disable-line @typescript-eslint/camelcase
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(restData),
    });
}

/**
 * @description Creates a promise to send an email to my email
 * @param templateId - ID sent to EmailJS to determine how content should be formatted in email sent out.
 * @param subject - User entered subject.
 * @param from - User who email is from (name or email).
 * @param body - User entered text.
 */
function sendEmail(templateId: string, subject: string, from: string, body: string): void {
    const data = {
        from,
        subject,
        body,
    };

    sendToEmailJsRestAPI(templateId, data);
}

export { TEMPLATE_ID };
export default sendEmail;
