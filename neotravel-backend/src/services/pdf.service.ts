import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs-extra";
import path from "path";

export class PdfService {
  static async generateQuotePdf(data: any): Promise<string> {
    try {
      console.log("=== Début génération PDF ===");

      const pdfDoc = await PDFDocument.create();

      const page = pdfDoc.addPage([595, 842]); // Format A4

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      let y = 790;

      page.drawText("NeoTravel", {
        x: 50,
        y,
        size: 24,
        font: bold,
        color: rgb(0, 0.45, 0.75),
      });

      y -= 40;

      page.drawText("DEVIS", {
        x: 50,
        y,
        size: 18,
        font: bold,
      });

      y -= 40;

      page.drawText(`Numéro : ${data.quote_number}`, {
        x: 50,
        y,
        size: 12,
        font,
      });

      y -= 25;

      page.drawText(`Nom : ${data.nom}`, {
        x: 50,
        y,
        size: 12,
        font,
      });

      y -= 20;

      page.drawText(`Email : ${data.email}`, {
        x: 50,
        y,
        size: 12,
        font,
      });

      y -= 20;

      page.drawText(`Départ : ${data.depart}`, {
        x: 50,
        y,
        size: 12,
        font,
      });

      y -= 20;

      page.drawText(`Arrivée : ${data.arrivee}`, {
        x: 50,
        y,
        size: 12,
        font,
      });

      y -= 20;

      page.drawText(`Date : ${data.date_trajet}`, {
        x: 50,
        y,
        size: 12,
        font,
      });

      y -= 20;

      page.drawText(`Passagers : ${data.nb_passagers}`, {
        x: 50,
        y,
        size: 12,
        font,
      });

      y -= 40;

      page.drawText(`Prix : ${data.prix} €`, {
        x: 50,
        y,
        size: 18,
        font: bold,
        color: rgb(0, 0.6, 0),
      });

      y -= 60;

      page.drawText("Merci pour votre confiance.", {
        x: 50,
        y,
        size: 12,
        font,
      });

      const pdfBytes = await pdfDoc.save();

      const uploadsDir = path.join(process.cwd(), "uploads");

      console.log("Dossier uploads :", uploadsDir);

      await fs.ensureDir(uploadsDir);

      const fileName = `${data.quote_number}.pdf`;

      const filePath = path.join(uploadsDir, fileName);

      console.log("Chemin du PDF :", filePath);

      // Conversion en Buffer (plus fiable sous Node.js)
      await fs.writeFile(filePath, Buffer.from(pdfBytes));

      console.log("PDF créé avec succès !");

      return filePath;

    } catch (error) {
      console.error("Erreur génération PDF :", error);
      throw error;
    }
  }
}