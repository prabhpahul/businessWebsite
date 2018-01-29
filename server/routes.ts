import * as express from 'express';
import * as multer from 'multer';
import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import categoryCtrl from './controllers/category';
import Cat from './models/cat';
import User from './models/user';

const upload = multer({
    dest: 'client/assets/',
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const CategoryCtrl = new categoryCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  //Category
  router.post('/category',upload.single('photo'), (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(req.file)
        res.send(req.file);

});



  router.route('/categoryAdd').post(CategoryCtrl.insert);
  


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
