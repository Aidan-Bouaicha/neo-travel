import nodemailer from "nodemailer";
import path from "path";

export class MailService {
  static async sendQuoteEmail(
    to: string,
    quoteNumber: string
  ): Promise<void> {

    console.log("===== MAIL SERVICE =====");
    console.log("MAIL_USER :", process.env.MAIL_USER);
    console.log(
      "MAIL_PASS :",
      process.env.MAIL_PASS ? "OK" : "MANQUANT"
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const pdfPath = path.join(
      process.cwd(),
      "uploads",
      `${quoteNumber}.pdf`
    );

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,

      subject: `Votre devis NeoTravel - ${quoteNumber}`,

      text: `
Bonjour,

Veuillez trouver ci-joint votre devis NeoTravel.

Merci pour votre confiance.

L'équipe NeoTravel
`,

      attachments: [
        {
          filename: `${quoteNumber}.pdf`,
          path: pdfPath,
        },
      ],
    });

    console.log("✅ Email envoyé avec succès !");
  }
}