-- src/main/resources/db/migration/V2__seed_first_blog.sql
INSERT INTO blog (title, short_description, long_description_md, created_at)
VALUES (
           'Hello, world',
           'First post on my personal blog.',
           '# Hello, world

This is the first post in **Markdown**.

- Built with Spring Boot + PostgreSQL
- Managed with Flyway
- Served via REST API

Enjoy!
',
           NOW()
       );
