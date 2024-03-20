import { Router } from "express";
import Controller from '../controllers/posts';
import Validator from '../controllers/posts/validator';
const val = new Validator();


const router: Router = Router();
// @ts-ignore
const controller = new Controller();

router.post(
    '/:id/comments',
    Validator.validateCommentSchema(),
    val.validate(),
    controller.postComment()
);

router.get(
    '/',
    controller.topPosts()
);

export default router;
