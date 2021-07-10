const SparkPost = require('sparkpost')

const client = new SparkPost(process.env.REACT_APP_SPARKPOST)

const successCode = '200'
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed', headers: {'Allow': 'POST'}}
  }
  console.log('Send email started');
  const data = JSON.parse(event.body)
  if (!data.message || !data.name || !data.email || !data.subject) {
    return {statusCode: 422, body: 'Name, email, message, subject and message are required.'}
  }
  const {name, email, subject, message} = data
  return new Promise((resolve, reject) => {
    client.transmissions.send({
      options: {
        sandbox: false,
      },
      content: {
        from: {name: "Bitlads Software Site", email: "contact@bitladssoftware.com"},
        subject,
        html: generateTemplate(name, email, subject, message)
      },
      recipients: [{address: 'marcoblaj@gmail.com'}, {address: 'bogdan.bitfoi@gmail.com'}],
    })
    .then(res => {
      if (res.results.total_accepted_recipients === 2) {
        resolve({
          statusCode: 200,
          headers: {'content-type': 'application/json'}
        })
      } else {
        console.log('error', res);
        resolve({statusCode: res.status || 500, body: res.statusText})
      }
    })
    .then(d => {
      const response = {
        statusCode: 200,
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(d)
      }
      resolve(response);
    })
    .catch(err => {
      console.log('errrrror');
      console.log(err)
      resolve({statusCode: err.statusCode || 500, body: err.message})
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