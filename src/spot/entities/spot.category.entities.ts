import { Document, Schema, Model, model } from 'mongoose';

// Define the interface for the Category schema
interface ICategory extends Document {
  name: string;
  description?: string;
}


// Define the Category schema
export const categorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});


// Create models
const Category: Model<ICategory> = model<ICategory>('Category', categorySchema);

export { Category,ICategory, };
