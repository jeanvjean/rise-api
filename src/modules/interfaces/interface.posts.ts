export interface PostInterface {
    title: string;
    content: string;
    creator_id?: string
    created_at?: Date;
    updated_at?: Date;
}

export interface CommentInterface {
    id: string;
    content: string;
    post_id: string;
    created_at?: Date;
    updated_at?: Date;
}