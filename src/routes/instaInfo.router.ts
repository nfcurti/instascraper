import {Router} from 'express';
import { GetInfo } from '../controllers/instaInfo.controller';
const instaInfoRouter = Router();

instaInfoRouter.route('/info').get(GetInfo)

export default instaInfoRouter