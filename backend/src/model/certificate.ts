import { Schema, model, Document } from 'mongoose';

interface ICertificate extends Document {
  studentName: string;
  courseName: string;
  dateOfCompletion: Date;
  certificateUrl: string;
}

const CertificateSchema = new Schema<ICertificate>({
  studentName: { type: String, required: true },
  courseName: { type: String, required: true },
  dateOfCompletion: { type: Date, required: true },
  certificateUrl: { type: String, required: true }
});

const Certificate = model<ICertificate>('Certificate', CertificateSchema);

export default Certificate;
