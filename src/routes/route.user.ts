import {Router as expressRouter} from 'express';
import Validator from '../controllers/users/validator';
import UserMiddleware from '../middlewares/middleware.user';
import UserController from '../controllers/users';
const val = new Validator();
// @ts-ignore
const user = new UserMiddleware();
// @ts-ignore
const controller = new UserController();

const router: expressRouter = expressRouter();

router.post(
  '/',
  Validator.validateUserSchema(),
  val.validate(),
  user.getUser(),
  controller.create()
);

router.get(
  '/',
  controller.getUsers()
)

export default router;
