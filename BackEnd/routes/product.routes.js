const express=require("express");
const protectRoute = require("../middleware/protectRoute");
const { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require("../controller/product.controller");

const router = express.Router();


router.post('/', protectRoute, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id',protectRoute, updateProductById);
router.delete('/:id',protectRoute, deleteProductById);


module.exports=router