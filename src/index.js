const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');
const User = require("./models/user");

const bodyParser =  require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://gawadepooja729:gawadepooja729@cluster0.yetkynf.mongodb.net/projectdb").then(function(){
    console.log("Mongoose connected");
    app.get("/", function(req, res){
        res.send("This is the home page");
    });
    app.post("/register", async (req, res) => {
        let result = {};
        try {
            // Check if all fields are filled
            if (!req.body.email || !req.body.password || !req.body.name) {
                result = { 
                    code: 400,
                    status: "failure",
                    message: "Please fill all mandatory fields" 
                };
                return res.status(400).json(result);
            }
    
            // Check if email is unique
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                result = {
                    code: 400,
                    status: "failure",
                    message: "Email is already registered"
                }
                return res.status(400).json(result);
            }
    
            // Create a new user
            let user = new User(req.body);
            let savedUser = await user.save();
            savedUser = savedUser.toObject();
            delete savedUser.password;

            // result = {
            //     code: 200,
            //     status: "success",
            //     message: "User registered successfully",
            //     data: savedUser
            // };

            // res.status(200).json(result);
            return res.status(200).json({
                status:'success',
                code:200,
                message:'User Registered Successfully',
                data:[savedUser]
            })
        } catch (error) {
            console.error(error);
            result = {
                code: 500,
                status: "failure",
                message: "Internal server error",
            };
            res.status(500).json(result);
        }
    });
    
    app.post("/logins", async(req, res) => {
        let result = {};
        try {
            if (req.body.password && req.body.email) {
                let user = await User.findOne({ email: req.body.email }).select("-password");
                if (user) {
                    result = {
                        code: 200,
                        status: "success",
                        message: "Login successful", user
                    };
                    return res.status(200).json(result);
                } else {
                    result = {
                        code: 404,
                        status: "failure",
                        message: "No user found", user
                    }
                    return res.status(404).json(result);
                }
            } else {
                result = {
                    code: 400,
                    status: "failure",
                    message: "Send all mandatory fields"
                }
                // return res.status(400).json(result);
                return res.status(200).json({
                    status:'success',
                    code:200,
                    message:'User Registered Successfully',
                    data:[res]
                })
            }
        } catch (error) {
            console.error(error);
            result = {
                code: 500,
                status: "failure",
                message: "Internal server error",
            };
            res.status(500).json(result);        }
    });
    
});

app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const checkExistEmail=await User.findOne({email:email,password:password});
        if(!checkExistEmail){
            return res.status(400).json({
                status:'failure',
                code:400,
                message:'Email and password not found'
            })
        }
        return res.status(200).json({
            status:'success',
            code:200,
            message:'Login'
        })
    }catch(error){
        console.log("error",error);
        return res.status(500).json({
            status:'failure',
            code:500,
            error:error.message
        })
    }
})

app.listen(5000, function(){
    console.log("Server started at PORT:5000");
});