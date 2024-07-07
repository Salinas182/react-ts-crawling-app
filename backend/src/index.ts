import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import crawlerJobRoutes from './routes/crawlerJobRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  credentials: true,
  origin: [process.env.FRONT!]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@cluster0.cfw9d7m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/jobs', crawlerJobRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
