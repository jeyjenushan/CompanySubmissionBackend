const jwt=require("jsonwebtoken");
const { connection } = require("../db/connectToMysql");



const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		    const findQuery =  "SELECT * FROM users WHERE userId=?"
          ;
          const value = [ decoded.userId];


		       connection.query(findQuery, value, (findErr, result) => {
            if (findErr) {
          
              console.error("MySQL find error:", findErr);
              return res.status(500).json({ error: "Failed to find user" });
            }
			     if (result.length == 0) {
            
          return res.status(400).json({ error: "User not found" });
        }
		const user=result[0];

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
next()
       
          });

	


        
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}
module.exports=protectRoute