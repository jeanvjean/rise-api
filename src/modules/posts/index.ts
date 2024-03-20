import { UserInterface } from './../interfaces/interface.users';
import { PostInterface, CommentInterface } from './../interfaces/interface.posts';
import { Module } from "../module";
import { PostService } from "../../services";

type PostPropType = {
    service: PostService;
}

interface FetchPostsInterface {
    id: string;
}


class PostModule extends Module {
    private service: PostService;

    constructor(props: PostPropType) {
        super();
        this.service = props.service;
    }

    public async create(data: PostInterface, user: UserInterface): Promise<PostInterface | undefined> {
        try {
            const [ post ] = await this.service.create({ ...data, creator_id: user.id });
            return post;
        } catch (error) {
            // @ts-ignore
            this.handleException(error);
        }
    }

    public async fetchPosts(params: FetchPostsInterface): Promise<PostInterface[] | undefined> {
        try {
            const posts = await this.service.getPosts(params.id);
            return posts;
        } catch (error) {
            // @ts-ignore
            this.handleException(error);
        }
    }
    
    public async postComment(data: CommentInterface, post_id: string): Promise<CommentInterface | undefined> {
        try {
            const [ comment ] = await this.service.postComment({ ...data, post_id });
            return comment;
        } catch (error) {
            // @ts-ignore
            this.handleException(error);            
        }
    }

    public async topPosts(): Promise<CommentInterface[] | undefined> {
        try {
            const posts = await this.service.topPosts();
            return posts;
        } catch (error) {
            // @ts-ignore
            this.handleException(error);            
        }
    }
    
}

export default PostModule;
