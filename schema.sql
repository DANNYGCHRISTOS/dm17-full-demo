CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(55)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    authid VARCHAR(55),
    user_name VARCHAR(55)
);
