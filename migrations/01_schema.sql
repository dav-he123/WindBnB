CREATE TABLE users (

    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255),
    password VARCHAR(255)

);


CREATE TABLE properties (

    id SERIAL PRIMARY KEY NOT NULL,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    cost_per_night VARCHAR(32),
    parking_spaces SMALLINT,
    number_of_bedrooms SMALLINT,
    number_of_bathrooms SMALLINT,
    thumbnail_photo_url VARCHAR(255),
    cover_photo_url VARCHAR(255),
    country TEXT,
    street TEXT,
    city TEXT,
    province TEXT, 
    post_code TEXT,
    active BOOLEAN DEFAULT TRUE

);
