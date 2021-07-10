const SparkPost = require('sparkpost')

const client = new SparkPost(process.env.REACT_APP_SPARKPOST)

const successCode = '200'
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const handler = async (event) => {
  console.log(event)
  const data = JSON.parse(event.body)
  const { email, subject, message } = data
  client.transmissions
  .send({
    options: {
      sandbox: true,
    },
    content: {
      from: {name: "Bitlads Software Site", email: "no.worries@bitladssoftware.com"},
      subject: subject,
      text: `${message} from ${email}`,
      html: `Big after Christmas sale...${email}`
    },
    recipients: [{ address: 'marcoblaj@gmail.com' }],
  })
  .then(response => {
    console.log('Mail has been sent successfully!')
    console.log(response);
    return {
      statusCode: successCode,
      body: JSON.stringify(response),
    }

  })
  .catch(err => {
    console.log('Whoops! Something went wrong')
    console.log(err)
    return {statusCode: 500, body: error.toString()}
  })
}

module.exports = { handler }
