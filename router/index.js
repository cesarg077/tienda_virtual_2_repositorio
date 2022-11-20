const express=require("express")
const router=express.Router()
const bodyParser=require("body-parser")
const coneccion = require("../conexion")
const { send } = require("process")
const urlcodeparser=bodyParser.urlencoded({extended:false})

const app=express()

app.use(bodyParser.json())

router.get("/",function(req,res){
    res.send("mensaje: soy la api tienda_v con mongo")
})

//insertar cliente

router.post("/insertar_cliente",urlcodeparser,async(req,res,err)=>{
    const db=await coneccion()
    var obj={
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        cedula:req.body.cedula,
        telefono:req.body.telefono,
        correo:req.body.correo,
    }
    console.log(obj)
    await db.collection("datos_cliente").insertOne(obj,function(err,result){
        if(err){res.send(err)}
        else{
            res.status(200).send({save:1})
            if(res.status(200)){
                console.log("usuario almacenado")
            }
        }
    })

})

// eliminar por cedula

router.post("/eliminar_cliente",urlcodeparser,async(req,res)=>{
    let obj_buscar={cedula:req.body.cedula}
    console.log(obj_buscar)

    const db=await coneccion()
    await db.collection("datos_cliente").deleteOne(obj_buscar,function(err,result){
        if (err) throw err
        if(err){res.send({eliminado:0})}
        else{
            if(res.status(200)){
                res.status(200).send({eliminado:1,msn:"documento eliminado"})
                console.log("documento eliminado")
            }

        }
    })

})

//insertar factura

router.post("/insertar_factura",urlcodeparser,async(req,res,err)=>{
    const db=await coneccion()
    var obj={
        N_factura:req.body.N_factura,
        fecha:req.body.fecha,
        cedula_cliente:req.body.cedula_cliente,
        subtotal:req.body.subtotal,
        total:req.body.total,
       
    }
    console.log(obj)
    await db.collection("datos_factura").insertOne(obj,function(err,result){
        if(err){res.send(err)}
        else{
            res.status(200).send({save:1})
            if(res.status(200)){
                console.log("factura almacenada")
            }
        }
    })

})

module.exports=router