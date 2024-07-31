import { Router } from 'express';
import { generateCertificate } from '../controllers/certificateController';


const certificateRoutes = Router();

certificateRoutes.post('/generate', generateCertificate);

export default certificateRoutes;
