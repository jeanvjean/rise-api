/* Replace with your SQL commands */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE posts(
    id VARCHAR PRIMARY KEY DEFAULT 'post-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() As varchar(50))
            , '-','')
        ),
    title VARCHAR(250) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    creator_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS post_uid_index ON posts(id);
CREATE INDEX IF NOT EXISTS post_title_index ON posts(title);
