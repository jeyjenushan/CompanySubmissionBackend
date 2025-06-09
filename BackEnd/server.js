const express=require("express")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const { connectToMySql } = require("./db/connectToMysql");
const { createUsersTable } = require("./models/user.Model");
const { createProductsTable } = require("./models/product.Model.");
const router = express.Router();

const productRoutes=require("./routes/product.routes")
const userRoutes=require("./routes/user.routes")

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); 
app.use(cookieParser());

app.use("/api/products",productRoutes );
app.use("/api/users", userRoutes);




app.listen(PORT, () => {
	connectToMySql();
    createUsersTable();
    createProductsTable()
	console.log(`Server Running on port ${PORT}`); 
});