const SERVICE_ID = 'mailgun';
const API_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const USER_ID = 'user_VGoIWoPTZlQsKlUbtQv2Y';

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

    _sendToEmailJsRestAPI(SERVICE_ID, templateId, data);
}

function _sendToEmailJsRestAPI(serviceId, templateId, data) {
    const restData = {
        service_id: serviceId,
        template_id: templateId,
        user_id: USER_ID,
        template_params: data
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(restData)
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.error(err);
    })
}

const TEMPLATE_ID = {
    'bug': 'template_c2cJPJ9H',
    suggestion: 'suggestion'
};

export { TEMPLATE_ID };
export default sendEmail;