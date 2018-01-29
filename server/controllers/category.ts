import * as multer from 'multer';
import category from '../models/category';

const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` });

export default class categoryCtrl {
    model = category;
	insert = (req, res) => {
  	console.log('inside',req.body);
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }
}
 