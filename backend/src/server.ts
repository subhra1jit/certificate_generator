import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import certificateRoutes from './routes/certificates';


const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://subhrajitb43:Jitu1234@cluster0.venvuxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/certificates', certificateRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
