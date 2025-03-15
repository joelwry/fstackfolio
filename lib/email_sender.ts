import nodemailer from 'nodemailer'

// Create a transporter using Gmail and Google App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendEmail(email:string, phone : string, name: string,title : string, message_content: string, reciever_message : null | string, enquiryPurpose:string) : Promise<boolean> {
  try {
    
    // Email to admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: title,
      html: `
        <h1>Message from JDEK portfolio</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Enquiry Type:</strong> ${enquiryPurpose}</p>
        <p><strong>Message:</strong> ${message_content}</p>
      `,
    })

    // Email to user
    if(reciever_message){
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Message Sent to Joelwry`,
      html: `
        <h2>Message Summary</h2>
        <p> ${reciever_message}</p>
      `,
    })
  }
    return true;
  } catch (error) {
    console.error(error)
    return false;
  }
}
