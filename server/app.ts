import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as multer from 'multer';
import setRoutes from './routes';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` });
const app = express();
import * as cors from "cors";
const router = express.Router();

//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin:  'http://localhost:4200',
  preflightContinue: false
};

//use cors middleware
router.use(cors(options));

//add your routes

//enable pre-flight
router.options("*", cors(options));
 
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
console.log('inside',__dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}


mongoose.Promise = global.Promise;
const mongodb = mongoose.connect(mongodbURI, { useMongoClient: true });

mongodb
  .then((db) => {
    console.log('Connected to MongoDB on', db.host + ':' + db.port);

    setRoutes(app);

    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    if (!module.parent) {
      app.listen(app.get('port'), () => {
        console.log('port',app.get('port'));
        console.log('Angular Full Stack listening on port ' + app.get('port'));
        console.log(__dirname);
      });
    }

  })
  .catch((err) => {
    console.error(err);
    console.log(__dirname);
});

export { app };
