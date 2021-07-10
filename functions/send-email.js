const SparkPost = require('sparkpost')

const client = new SparkPost(process.env.REACT_APP_SPARKPOST)

const successCode = '200'
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const handler = async (event, context, callback) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
  }
  console.log('Send email started');
  const data = JSON.parse(event.body)
  if (!data.message || !data.name || !data.email || !data.subject) {
    return { statusCode: 422, body: 'Name, email, message, subject and message are required.' }
  }
  const {name, email, subject, message} = data
  console.log('data', data);
  console.log('client', client);

  return client.transmissions.send({
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
      headers,
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