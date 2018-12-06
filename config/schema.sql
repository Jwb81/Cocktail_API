DROP DATABASE IF EXISTS cocktaildb;
CREATE DATABASE cocktaildb;

USE cocktaildb;

CREATE TABLE user_accounts (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    username VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(60) NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (username),
    UNIQUE (email)
);

CREATE TABLE user_favorites (
    user_id INT NOT NULL,
    recipe_id VARCHAR(45),
    make_count INT DEFAULT 0,

    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) 
        REFERENCES user_accounts(id)
        ON DELETE CASCADE
);

CREATE TABLE machines (
    id INT NOT NULL AUTO_INCREMENT,
    start_date DATE,
    street VARCHAR(45),
    city VARCHAR(45),
    state VARCHAR(45),
    zip_code VARCHAR(45),
    owner VARCHAR(45),

    PRIMARY KEY (id)
);