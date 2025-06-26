const SparkPost = require('sparkpost')

const client = new SparkPost(process.env.REACT_APP_SPARKPOST)

const successCode = '200'
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  console.log('Send email started')
  
  try {
    const data = JSON.parse(event.body)
    
    // Validate required fields
    if (!data.message || !data.name || !data.email || !data.subject) {
      return {
        statusCode: 422, 
        headers,
        body: JSON.stringify({ 
          error: 'Name, email, subject and message are required.' 
        })
      }
    }

    const { name, email, subject, message, company, phone } = data

    // Send email using SparkPost
    const result = await client.transmissions.send({
      options: {
        sandbox: false,
      },
      content: {
        from: { 
          name: "Bitlads Software", 
          email: "contact@bitladssoftware.com" 
        },
        subject: `New Contact: ${subject}`,
        html: generateTemplate(name, email, subject, message, company, phone)
      },
      recipients: [{ address: 'hello@bitladssoftware.com' }],
    })

    console.log('Email sent successfully:', result)

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully' 
      })
    }

  } catch (error) {
    console.error('Error sending email:', error)
    
    return {
      statusCode: error.statusCode || 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Internal server error' 
      })
    }
  }
}

const generateTemplate = (name, email, subject, message, company = '', phone = '') => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa; color: #212529;">
    
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background-color: #ffd100; padding: 24px; text-align: center;">
            <h1 style="margin: 0; color: #202020; font-size: 20px; font-weight: 600;">
                New Contact Form Submission
            </h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px;">
            
            <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px 0; color: #202020; font-size: 16px; font-weight: 600;">
                    Contact Information
                </h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px; width: 80px; vertical-align: top;">Name:</td>
                        <td style="padding: 8px 0; color: #202020; font-size: 14px; font-weight: 500;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px; vertical-align: top;">Email:</td>
                        <td style="padding: 8px 0; color: #202020; font-size: 14px; font-weight: 500;">${email}</td>
                    </tr>
                    ${company ? `
                    <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px; vertical-align: top;">Company:</td>
                        <td style="padding: 8px 0; color: #202020; font-size: 14px; font-weight: 500;">${company}</td>
                    </tr>
                    ` : ''}
                    ${phone ? `
                    <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px; vertical-align: top;">Phone:</td>
                        <td style="padding: 8px 0; color: #202020; font-size: 14px; font-weight: 500;">${phone}</td>
                    </tr>
                    ` : ''}
                    <tr>
                        <td style="padding: 8px 0; color: #6c757d; font-size: 14px; vertical-align: top;">Subject:</td>
                        <td style="padding: 8px 0; color: #202020; font-size: 14px; font-weight: 500;">${subject}</td>
                    </tr>
                </table>
            </div>
            
            <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px 0; color: #202020; font-size: 16px; font-weight: 600;">
                    Message
                </h3>
                <div style="background-color: #f8f9fa; padding: 16px; border-radius: 6px; border-left: 3px solid #ffd100;">
                    <p style="margin: 0; color: #202020; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${message}</p>
                </div>
            </div>
            
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 16px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="margin: 0; color: #6c757d; font-size: 12px;">
                Sent from Bitlads Software contact form • ${new Date().toLocaleString()}
            </p>
        </div>
        
    </div>
    
</body>
</html>
  `
}

module.exports = { handler }