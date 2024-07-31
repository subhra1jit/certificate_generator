import { Request, Response } from 'express';
const PDFDocument = require('pdfkit')
import fs from 'fs';
import path from 'path';
import Certificate from '../model/certificate';


export const generateCertificate = async (req: Request, res: Response) => {
  const { studentName, courseName, dateOfCompletion } = req.body;

  const certificatesDir = path.join(__dirname, '../../certificates');
  const filePath = path.join(certificatesDir, `${studentName}_${courseName}.pdf`);

  // Ensure the certificates directory exists
  if (!fs.existsSync(certificatesDir)) {
    fs.mkdirSync(certificatesDir, { recursive: true });
  }

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(filePath);

  doc.pipe(writeStream);

  doc.fontSize(25).text('Certificate of Completion', 100, 100);
  doc.fontSize(20).text('This is to certify that', 100, 150);
  doc.fontSize(25).text(studentName, 100, 200);
  doc.fontSize(20).text('has successfully completed the course', 100, 250);
  doc.fontSize(25).text(courseName, 100, 300);
  doc.fontSize(20).text('on', 100, 350);
  doc.fontSize(25).text(dateOfCompletion, 100, 400);

  doc.end();

  writeStream.on('finish', async () => {
    // Save the certificate details to the database
    const certificate = new Certificate({
      studentName,
      courseName,
      dateOfCompletion,
      certificateUrl: filePath
    });

    await certificate.save();

    // Send the PDF file as a response for download
    res.download(filePath, `${studentName}_${courseName}.pdf`, (err) => {
      if (err) {
        res.status(500).send({ message: 'Error downloading the file' });
      }
    });
  });

  writeStream.on('error', (err) => {
    console.error('Error writing PDF file:', err);
    res.status(500).send({ message: 'Error generating the certificate' });
  });
};
