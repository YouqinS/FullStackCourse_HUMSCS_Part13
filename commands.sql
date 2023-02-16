postgres=# \d
Did not find any relations.

postgres=# CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes integer DEFAULT 0
);
CREATE TABLE
postgres=# \d
List of relations
Schema |     Name     |   Type   |  Owner
--------+--------------+----------+----------
public | blogs        | table    | postgres
public | blogs_id_seq | sequence | postgres
(2 rows)

postgres=# \d blogs
Table "public.blogs"
Column |  Type   | Collation | Nullable |              Default
--------+---------+-----------+----------+-----------------------------------
id     | integer |           | not null | nextval('blogs_id_seq'::regclass)
author | text    |           |          |
url    | text    |           | not null |
title  | text    |           | not null |
likes  | integer |           |          | 0
Indexes:
"blogs_pkey" PRIMARY KEY, btree (id)


postgres=# insert into blogs (author, url, title) values ('helsinki university', 'https://fullstackopen.com/en/', 'fullstack open');
INSERT 0 1
postgres=# insert into blogs (author, url, title) values ('postgresql.org', 'https://www.postgresql.org/', 'PostgreSQL');
INSERT 0 1


postgres=# select * from blogs;
 id |       author        |              url              |     title      | likes
----+---------------------+-------------------------------+----------------+-------
  1 | helsinki university | https://fullstackopen.com/en/ | fullstack open |     0
  2 | postgresql.org      | https://www.postgresql.org/   | PostgreSQL     |     0
(2 rows)

