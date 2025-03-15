import {NextResponse} from 'next/server';
import { sendEmail } from '@/lib/email_sender';

export async function POST(request: Request) {
  try {
    const message = await request.json();

    // notifying admin on new message 
    const success = await sendEmail(message.email,message.phone,message.name,`JDEK personal portfolio Contact Form for ${message.enquiryPurpose}`,message.message,`Your Message about ${message.enquiryPurpose} has been recieved by Joel<br><strong>Message </strong> : ${message.message}`,message.enquiryPurpose);
    if(!success){
      throw Error("Messange could not be sent to joelwry...")
    }
    return NextResponse.json({message : 'Message sent to Joelwry'}, {status : 200})
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}

