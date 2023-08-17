CREATE TABLE users_1 (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

INSERT INTO users_1 (name, email) VALUES ('John', 'john.doe@hasura.io');
INSERT INTO users_1 (name, email) VALUES ('Jane', 'jane.doe@hasura.io');
