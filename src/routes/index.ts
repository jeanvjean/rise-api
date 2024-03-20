import {Request, Response, Router as expressRouter} from 'express';
import AppConfig from '../configs/app';
import usersRoutes from './route.user';
import postRoutes from './routes.post';

const router: expressRouter = expressRouter();
router.get('/', (req: Request, res: Response): void => {
  res.send(`You've reached api routes of ${AppConfig.appName}`);
});

router.use('/users', usersRoutes);
router.use('/posts', postRoutes);

export default router;
