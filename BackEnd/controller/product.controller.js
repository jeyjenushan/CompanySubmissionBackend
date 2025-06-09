const { connection } = require("../db/connectToMysql");
const { v4: uuidv4 } = require("uuid");


// Create a new product
exports.createProduct = async (req, res) => {
    try {
      const { name, price, quantity } = req.body;
      const productId=uuidv4();
      const query = `
              INSERT INTO products 
              (productId,name, price, quantity)
              VALUES (?,?, ?, ?)
          `;
          
          const values = [productId,name, price, quantity];
           connection.query(query, values, (error, results) => {
           if (error) {
      return res.status(400).json({ message: error.message });
           }

  return res.status(201).json({name,price,quantity})
});
}  catch (error) {
      res.status(400).json({ message: error.message });
    }
  };




  // Get all products
exports.getAllProducts = async (req, res) => {
    try {
   
        const query = 'SELECT * FROM products';
        
        connection.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  
  // Get a product by ID
  exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const query = 'SELECT * FROM products WHERE productId = ?';
        
        connection.query(query, [productId], (error, results) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(results[0]);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  
  // Update a product by ID
  exports.updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, quantity } = req.body;
        
      

        // Build the update query dynamically based on provided fields
        let updateFields = [];
        let values = [];
        
        if (name !== undefined) {
            updateFields.push('name = ?');
            values.push(name);
        }
        if (price !== undefined) {
            updateFields.push('price = ?');
            values.push(price);
        }

        if (quantity !== undefined) {
            updateFields.push('quantity = ?');
            values.push(quantity);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No valid fields provided for update' });
        }

        values.push(productId); 

        const query = `
            UPDATE products 
            SET ${updateFields.join(', ')}
            WHERE productId = ?
        `;

        connection.query(query, values, (error, results) => {
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            // Fetch the updated product to return it
            connection.query('SELECT * FROM products WHERE productId = ?', [productId], (err, product) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                res.json(product[0]);
            });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
  
  // Delete a product by ID
  exports.deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        
     
        const checkQuery = 'SELECT * FROM products WHERE productId = ?';
        
        connection.query(checkQuery, [productId], (checkError, checkResults) => {
            if (checkError) {
                return res.status(500).json({ message: checkError.message });
            }
            
            if (checkResults.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
        
            const deleteQuery = 'DELETE FROM products WHERE productId = ?';
            
            connection.query(deleteQuery, [productId], (deleteError, deleteResults) => {
                if (deleteError) {
                    return res.status(500).json({ message: deleteError.message });
                }
                
                if (deleteResults.affectedRows === 0) {
         
                    return res.status(404).json({ message: 'Product not found' });
                }
                
                res.json({ 
                    message: 'Product deleted successfully',
                    deletedProduct: checkResults[0] 
                });
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  