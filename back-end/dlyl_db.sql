CREATE TABLE USERS(
user_id SERIAL          PRIMARY KEY,
username                varchar(100),
email                   varchar(100),
password                varchar(100),
creation_date           timestamp,
company_affiliation     varchar(255) NULL,
user_industry           varchar(255) NULL,
real_name               varchar(100) NULL,
activity_count          integer,
active_date             timestamp,
avatar                  text NULL
);


CREATE TABLE ARTICLES(
article_id SERIAL       PRIMARY KEY,
article_link            text,
title                   varchar(255),
summary                 text,
time                    timestamp
);

CREATE TABLE POSTS(
post_id SERIAL          PRIMARY KEY,
user_id                 integer REFERENCES USERS (user_id) ON DELETE CASCADE,
title                   varchar(100),
body                    text,
time                    timestamp
);

CREATE TABLE COMMENTS(
comment_id SERIAL       PRIMARY KEY,
comment                 text,
user_id                 integer REFERENCES USERS (user_id) ON DELETE CASCADE,
post_id                 integer REFERENCES POSTS (post_id) ON DELETE CASCADE,
article_id              integer REFERENCES ARTICLES (article_id) ON DELETE CASCADE,
time                    timestamp
);

CREATE TABLE THREADS(
thread_id SERIAL        PRIMARY KEY,
user_id                 integer REFERENCES USERS (user_id) ON DELETE CASCADE,
title                   varchar(100),
body                    text,
comment                 text,
time                    timestamp
)