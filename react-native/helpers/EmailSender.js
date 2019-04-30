import emailjs from 'emailjs-com';

const SERVICE_ID = 'mailgun';
export const TEMPLATE_ID = {
    'bug': 'template_c2cJPJ9H',
    suggestion: 'suggestion'
}

/**
 * Creates a promise to send an email to 'grayson.ricketts@gmail.com'
 * @param {string} subject 
 * @param {string} from 
 * @param {string} body 
 */
function sendEmail(templateId, subject, from, body) {
    const data = {
        from,
        subject,
        body
    };

    emailjs.send(SERVICE_ID, templateId, data);
}

export default sendEmail;