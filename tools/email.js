const send = require('gmail-send')({
    user: 'ali.mahmodi500544@gmail.com',
    pass: '09121788072'
})

function sendEmail(text, mailto) {
    return new Promise(function(resolve, reject) {
        send({
            to: mailto,
            text,
            subject: 'Reset password'
        }).then(({ result, full }) => {
            resolve(result)
        }).catch((error) => reject(error))
    })
}

module.exports = { sendEmail }