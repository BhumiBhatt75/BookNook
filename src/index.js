const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")
const staticPath = path.join(__dirname, "../public");
const tempelatePath=path.join(__dirname,'../tempelate')

app.use(express.static(staticPath));
app.use(express.json())
app.set("view engine","hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({extended:false}))
app.get("/login",(req,res)=>{
    console.log("Login route hit");
    res.render("login")
})
app.get("/signup",(req,res)=>{
    console.log("Signup route hit");
    res.render("signup")
})
app.post("/signup", async(req,res)=>{
    const data={
         name:req.body.name,
         email:req.body.email,
         password:req.body.password

    }
    await collection.insertMany([data])
    res.render("home")

})

app.post("/login", async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.name})
        if(check.password==req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong password")
        }

    }catch{
        res.send("wrong details")

    }
})

app.listen(3000,()=>{
    console.log("port connected");
})