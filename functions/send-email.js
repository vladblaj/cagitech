const SparkPost = require('sparkpost')

const client = new SparkPost(process.env.REACT_APP_SPARKPOST)

const successCode = '200'
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const handler = async (event, context, callback) => {
  console.log('Send email started');
  const data = JSON.parse(event.body)
  const {name, email, subject, message} = data

  client.transmissions
  .send({
    options: {
      sandbox: false,
    },
    content: {
      from: {name: "Bitlads Software Site", email: "contact@bitladssoftware.com"},
      subject,
      html: generateTemplate(name, email, subject, message)
    },
    recipients: [{address: 'marcoblaj@gmail.com'}],
  })
  .then(response => {
    console.log('Mail has been sent successfully!')
    console.log(response);
    callback(null, {
      statusCode: successCode,
      body: JSON.stringify(response),
    })
  })
  .catch(err => {
    console.log('Whoops! Something went wrong')
    console.log(err)
    callback(null, {
      statusCode: 500,
      body: error.toString()
    })
  })
}
const generateTemplate = (name, email, subject, message) => {
  return `<div>
          <p>Am fumat 12 tigari mami. Auuuuuu Te-o contactat un posibil client: <b>${name}</b></p>
          <p>Are mailul mami: <b>${email}</b></p>
          <p>Pe scurt mami: <b>${subject}</b></p>
          <p>Pe lung mami: <b>${message}</b></p>
          </div>`;

}
module.exports = {handler}