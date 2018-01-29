import * as mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  category: String,
  description : String,
  image : String
});

const Category = mongoose.model('Category', categorySchema);

export default Category;