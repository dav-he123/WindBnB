const properties = require('./json/properties.json');
const users = require('./json/users.json');

const db = require('./db')

// const { Pool } = require('pg');
// const e = require('express');
// const myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);  

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return db
  .query(`SELECT * FROM users WHERE users.email = $1`, [email])
  .then((result) => {

    // console.log("AAAAA: ", result);
    if(result.rows.length === 0) {

      return null;

    }

    return result.rows[0];

  })
  .catch((err) => {
    
    console.log(err.message)
    
  });
  
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return db
  .query(`SELECT * FROM users WHERE users.id = $1`, [id])
  .then((result) => {


    // console.log("BBBBB: ", result);

    if(result.rows.length === 0) {

      return null;

    }

    return result.rows[0];

  })
  .catch((err) => {
    
    console.log(err.message)
    
  });

}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  // console.log("ASDASDAD: ", user);

  return db
  .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) 
        RETURNING *;`, [user.name, user.email, user.password])
  .then((result) => {

    // console.log("CCCCC: ", result);

    return result.rows[0];

  })
  .catch((err) => {
    
    console.log(err.message)
    
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return db
  .query(`SELECT * FROM reservations JOIN users ON users.id = $1 LIMIT $2`, [guest_id, limit])
  .then((result) => {
    
    console.log("%%%%%%: ", result); 
    return result.rows;

  })
  .catch((err) => {
    
    console.log(err.message)
    
  });

  // return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];   

  let queryString = `

  SELECT properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // console.log("ANSWER: ", options);

  if(Object.values(options).join('')) {

    queryString += `WHERE `;  

  }


  if(options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `city LIKE $${queryParams.length} AND`;

  } 

  if(options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `cost_per_night >= $${queryParams.length} AND`;

  } 
    
  if(options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `cost_per_night <= $${queryParams.length} AND`;

  }

  if(options.minimum_rating) {

    queryParams.push(`${options.minimum_rating}`);
    queryString += `property_reviews.rating >= $${queryParams.length}`;

  }

  if(queryString.endsWith('AND')) {
    const lastIndex = queryString.lastIndexOf('AND');
    queryString = queryString.substring(0, lastIndex);

  }


  // console.log("ANSWER: ", queryString);

  queryParams.push(limit);

  queryString += `
  
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  
  `;


  // console.log(queryString, queryParams);


  return db.query(queryString, queryParams).then((result) => {

    // console.log(result.rows);
    return result.rows;

  })
}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  // console.log("ANSWER1111: ", property);

  return db
  .query(`INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
        RETURNING *;`, 
        [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])

  .then((result) => {

    // console.log("ANSWER_addProperty:", result);

    return result.rows[0];

  })
  .catch((err) => {
    
    console.log(err.message)
    
  });


  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
}
exports.addProperty = addProperty;
