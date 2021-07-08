import SparkPost from "sparkpost";
const client = new SparkPost(process.env.SPARKPOST);

exports.handler = function(event, context, callback) {
  console.log('event',event);
  client.transmissions
  .send({
    content: {
      from: 'chris@css-tricks.com',
      subject: 'Hello, World!',
      html:
          "<html><body><p>My cool email.</p></body></html>"
    },
    recipients: [{ address: 'chriscoyier@gmail.com' }]
  }).then(data => {
    callback(null, {
      statusCode: 200,
      body: 'So far so good.'
    })
  });
}