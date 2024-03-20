import { PostInterface } from './../../modules/interfaces/interface.posts';
import { RequestHandler, Request, Response } from 'express';
import {post} from "../../modules";
import Ctrl from "../ctrl";
import enums from '../../configs/enums';
import Post from '../../modules/posts';

const PostModule = post;

class PostController extends Ctrl {
    private module: Post

    constructor(module: Post) {
        super();
        this.module = module
    }

    create(): RequestHandler {
        return async(req: Request, res: Response) => {
            try {
                // @ts-ignore
                const post = await PostModule.create(req.body, req.params);
                this.ok(res, enums.RESOURCE_CREATED('post'), post)
            } catch (error) {
                // @ts-ignore
                this.handleError(error, req, res);
            }
        }
    }

    fetchPosts(): RequestHandler {
        return async(req: Request, res: Response) => {
            try {
                // @ts-ignore
                const post = await PostModule.fetchPosts(req.params);
                this.ok(res, 'creator posts fetched', post);
            } catch (error) {
                // @ts-ignore
                this.handleError(error, req, res);
            }
        }
    }

    topPosts(): RequestHandler {
        return async(req: Request, res: Response) => {
            try {
                // @ts-ignore
                const posts: PostInterface[] | undefined = await PostModule.topPosts();
                this.ok(res, 'top posts fetched', posts);
            } catch (error) {
                // @ts-ignore
                this.handleError(error, req, res);
            }
        }
    }

    postComment(): RequestHandler {
        return async(req: Request, res: Response) => {
            try {
                // @ts-ignore
                const comment = await PostModule.postComment(req.body, req.params.id);
                this.ok(res, enums.RESOURCE_CREATED('comment'), comment);
            } catch (error) {
                // @ts-ignore
                this.handleError(error, req, res);
            }
        }
    }
}

export default PostController;