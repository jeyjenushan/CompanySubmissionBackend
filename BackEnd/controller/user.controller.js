
const bcryptjs=require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");
const { connection } = require("../db/connectToMysql");
const { v4: uuidv4 } = require("uuid");


const signup=async (req,res)=>{
    try {
        const {firstname,lastname,email,password,confirmPassword}=req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }

        connection.query(
            "SELECT * FROM users WHERE email=?",[email],
            async(err,results)=>{
                      if (err) {
          console.error("MySQL select error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
          return res.status(400).json({ error: "Email already registered" });
        }

try {
         const salt=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password,salt)
            const userId = uuidv4();

             const insertQuery = `
            INSERT INTO users (userId, firstName, lastName, email, password)
            VALUES (?, ?, ?, ?, ?)
          `;
          const values = [userId, firstname, lastname, email, hashPassword];

            connection.query(insertQuery, values, (insertErr, result) => {
            if (insertErr) {
              console.error("MySQL insert error:", insertErr);
              return res.status(500).json({ error: "Failed to register user" });
            }

            const newUser = { firstname, lastname, email };
            const token = generateTokenAndSetCookie(newUser.email, res);

            res.status(201).json({
              message: "User registered successfully",
              user: newUser,
              token,
            });
          });

    
} catch (error) {
             console.error("Hashing error:", hashErr);
          return res.status(500).json({ error: "Server error during registration" });
}




            }
        )
  

    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }

}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      
      connection.query("SELECT * FROM users WHERE email = ? ", [email], async (err, results) => {
        if (err) {
          console.log("Error querying database", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
  
               const user = results[0];
      const isPasswordCorrect=await bcryptjs.compare(password,user?.password || "");

           if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }
 
  
   
      generateTokenAndSetCookie(user.userId, res);

    
        res.status(200).json({ message: "User Login successfully" });
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const logout = async (req, res) => {
    try {
      res.cookie("jwt", "", {
        maxAge: 0, 
        path: "/", 
        httpOnly: true, 
        sameSite: "strict", 
        secure: process.env.NODE_ENV !== "development", 
      });
  
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


module.exports={
    signup,login,logout
}