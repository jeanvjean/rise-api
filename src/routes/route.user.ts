import {Router as expressRouter} from 'express';
import Validator from '../controllers/users/validator';
import PostValidator from '../controllers/posts/validator';
import UserMiddleware from '../middlewares/middleware.user';
import UserController from '../controllers/users';
import PostController from '../controllers/posts';
const val = new Validator();
// @ts-ignore
const middleware = new UserMiddleware();
// @ts-ignore
const controller = new UserController();
// @ts-ignore
const postController = new PostController();

const router: expressRouter = expressRouter();

router.post(
  '/',
  Validator.validateUserSchema(),
  val.validate(),
  middleware.getUser('create'),
  middleware.generatePasswordHash(),
  controller.create()
);

router.get(
  '/',
  middleware.getAuthorizationToken(),
  controller.getUsers()
)

router.post(
  '/login',
  Validator.validateLoginSchema(),
  val.validate(),
  middleware.getUser(),
  middleware.validateUserPassword(),
  middleware.generateAuthToken(),
  controller.login()
);

router.post(
  '/:id/posts',
  middleware.getAuthorizationToken(),
  PostValidator.validateCreatePostSchema(),
  val.validate(),
  postController.create()
)

router.get(
  '/:id/posts',
  middleware.getAuthorizationToken(),
  postController.fetchPosts()
)

export default router;
