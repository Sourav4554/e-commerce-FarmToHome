import express from 'express'

const app=express()

//initial route 
app.get('/',(_,res)=>{
res.end('server sucessfully running')
})





export default app