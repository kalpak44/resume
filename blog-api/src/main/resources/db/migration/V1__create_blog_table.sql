-- src/main/resources/db/migration/V1__create_blog_table.sql
CREATE TABLE blog (
                      id BIGSERIAL PRIMARY KEY,
                      title VARCHAR(255) NOT NULL,
                      short_description VARCHAR(500) NOT NULL,
                      long_description_md TEXT NOT NULL,
                      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_created_at ON blog (created_at DESC);
