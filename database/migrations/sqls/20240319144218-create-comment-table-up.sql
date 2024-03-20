/* Replace with your SQL commands */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE comments(
    id VARCHAR PRIMARY KEY DEFAULT 'comment-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() As varchar(50))
            , '-','')
        ),
    content VARCHAR(1000) NOT NULL,
    post_id VARCHAR(50) REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS comment_cid_index ON comments(id);

