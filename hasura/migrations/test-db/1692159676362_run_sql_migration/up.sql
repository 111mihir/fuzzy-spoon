CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

INSERT INTO users (name, email) VALUES ('John', 'john.doe@hasura.io');
INSERT INTO users (name, email) VALUES ('Jane', 'jane.doe@hasura.io');
