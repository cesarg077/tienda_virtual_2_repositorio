const express=require("express")
const connection=require("./conexion")
const indexroutes=require("./router/index")
const app=express()

app.listen(3005,function(){
    console.log("api g36 en el puerto 3005")

})

app.use("/",indexroutes)

app.use((req,res,next)=>{
    res.setHeader("Acces-Control-Allow-Origin","*")

})