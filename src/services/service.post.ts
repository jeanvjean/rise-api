import PostQueries from '../queries/query.post';
import DatabaseQueryRunner from '../configs/database';
import { PostInterface, CommentInterface } from '../modules/interfaces/interface.posts';

export default class PostService {
    public async create(data: PostInterface) {
        return DatabaseQueryRunner.transaction(PostQueries.createPost, data);
    }

    public async getPosts(payload: string) {
        return DatabaseQueryRunner.transaction(PostQueries.getPosts, [ payload ]);
    }

    public async postComment(data: CommentInterface) {
        return DatabaseQueryRunner.transaction(PostQueries.postComment, data);
    }

    public async topPosts() {
        return DatabaseQueryRunner.transaction(PostQueries.topPosts, []);
    }
}