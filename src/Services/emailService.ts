import nodemailer from 'nodemailer'
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars'
import path from 'path'

export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: 'd02cf54616625e',
    pass: process.env.EMAIL_PASS
  }
})

const handlebarOption: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, '..', 'template'),
    defaultLayout: undefined
  },
  viewPath: path.resolve(__dirname, '..', 'template')
}

transport.use('compile', hbs(handlebarOption))

export const mailOptions = (to: string[], subject: string, template: string, context: any) => {
  return {
    from: 'arthur.linemburg@unesc.net',
    to,
    subject,
    template,
    context
  }
}
