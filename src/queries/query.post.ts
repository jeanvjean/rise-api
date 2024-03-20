export default {
    createPost: `
        INSERT INTO posts(
            title,
            content,
            creator_id
        ) VALUES(
            $/title/,
            $/content/,
            $/creator_id/
        )
        RETURNING *
    `,

    getPosts: `
        SELECT * FROM posts WHERE creator_id = $1
    `,

    postComment: `
        INSERT INTO comments(
            content,
            post_id
        )VALUES(
            $/content/,
            $/post_id/
        )
        RETURNING *
    `,

    topPosts: `
        WITH postsData AS (
            SELECT 
                COUNT(id),
                creator_id
            FROM posts
            GROUP BY creator_id
        ),
        postComments AS (
            SELECT 
                comments.content,
                comments.post_id,
                posts.creator_id
            FROM comments
            LEFT JOIN posts ON posts.id = comments.post_id
            ORDER BY comments.created_at DESC
        )
        SELECT 
            first_name,
            last_name,
            email,
            postsData.count AS total_posts,
            postComments.content
        FROM users
        LEFT JOIN postsData ON postsData.creator_id = users.id
        LEFT JOIN postComments ON postComments.creator_id = users.id
        ORDER BY postsData.count DESC 
        LIMIT 3
    `
}