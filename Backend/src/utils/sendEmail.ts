import nodemailer from 'nodemailer'
export const sendEmail =  async(to:string,otp?:string)=>{
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: "hariharimass1205@gmail.com",
                pass: "fagn tumb wdcc lyjt",
              }
        });
        const mailOptions={
            from:"hariharimass1205@gmail.com",
            to,
            subject:"Your one time otp :",
            text:`${otp}`
        };
        await transporter.sendMail(mailOptions);
        return "Email sent success"
    } catch (error) {
        return "otp not sent"
    }
}

function next(error: unknown) {
    throw new Error('Function not implemented.');
}
