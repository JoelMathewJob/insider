import PDFDocument from "pdfkit";
import { Readable } from "stream";

export async function generatePDF(selectedOptions: string[], timeRange: string) {
  const doc = new PDFDocument();
  const buffers: Buffer[] = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {});

  doc.fontSize(20).text("User Activity Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Time Range: ${timeRange}`);
  doc.moveDown();

  selectedOptions.forEach((option) => {
    doc.fontSize(14).text(option, { underline: true });
    doc.fontSize(12).text("Data for this section...");
    doc.moveDown();
  });

  doc.end();

  return Buffer.concat(buffers);
}
