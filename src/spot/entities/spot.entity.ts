import { Document, Schema, Model, model } from 'mongoose';

// Define the interface for the Category schema
interface ICategory extends Document {
  name: string;
  description?: string;
}

// Define the interface for the Spot schema
interface ISpot extends Document {
  name: string;
  description: string;
  difficultyLevel: 'Easy' | 'Moderate' | 'Difficult';
  type: 'Hiking' | 'Trekking';
  latitude: number;
  longitude: number;
  categories: ICategory['_id'][];
  images: string[];
}


// Define the Spot schema
export const spotSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficultyLevel: {
    type: String,
    enum: ['Easy', 'Moderate', 'Difficult'],
    required: true,
  },
  type: {
    type: String,
    enum: ['Hiking', 'Trekking'],
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  images: [{
    type: String,
  }],
});

// Create models
const Spot: Model<ISpot> = model<ISpot>('Spot', spotSchema);


export { Spot, ISpot };
