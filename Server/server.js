import app from "./app.js";
import 'dotenv/config'

const PORT=process.env.PORT || 3000

//start server
app.listen(PORT,()=>{
console.log(`http://localhost:${PORT}`)
})