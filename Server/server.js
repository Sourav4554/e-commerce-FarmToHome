import app from "./app.js";
import 'dotenv/config'
import { connectDatabase } from "./Config/mongodb.config.js";

const PORT=process.env.PORT || 3000

//database connection and server running
connectDatabase().then(()=>{
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`)
        })
})