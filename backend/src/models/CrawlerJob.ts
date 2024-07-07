import mongoose, { Document, Schema } from 'mongoose';

export interface ICrawlerJob extends Document {
  userId: string;
  targetUrl: string;
  status: 'pending' | 'in-progress' | 'completed';
  foundUrls: string[];
}

const CrawlerJobSchema: Schema = new Schema({
  userId: String,
  targetUrl: String,
  status: String,
  foundUrls: Array,
});

const CrawlerJob = mongoose.model<ICrawlerJob>('CrawlerJob', CrawlerJobSchema);
export default CrawlerJob;
