const { connection } = require("../db/connectToMysql");

// Create Products table
const createProductsTable = () => {
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
   productId VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT DEFAULT 0,
      PRIMARY KEY (productId)
  );
`;



connection.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Failed to create products table:', err);
  } else {
    console.log('Products table created or already exists.');
  }
});
}

module.exports = {
  createProductsTable,
};