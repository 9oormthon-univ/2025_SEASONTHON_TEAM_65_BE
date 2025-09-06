import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import { ping } from './controller/system.js';
import { getMemories, getMemoryDetail, createMemoryRecord } from './controller/memory.js';
import config from './config/config.js';
import { getAllUsers } from './repository/user.js';
import { setupSwagger } from './config/swagger.js'; 

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
const router = express.Router();

router.route('/ping').get(ping);
router.route('/users').get(getAllUsers);
router.route('/memories').get(getMemories);
router.route('/memory/:userId/:memoryId').get(getMemoryDetail);
router.route('/memory/:userId').post(createMemoryRecord);

app.use(config.BASE_URL, router);

setupSwagger(app, config.SERVER_PORT);

app.listen(config.SERVER_PORT, () => {
  console.log(`Server is running at http://localhost:${config.SERVER_PORT}${config.BASE_URL}/`);  
});

// http://localhost:3000/ItDa/api/v1/
// http://localhost:3000/ItDa/api-docs