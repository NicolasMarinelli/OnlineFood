import express from "express"
import App from "./services/ExpressApp"
import dbConection from "./services/Database"


const StartServer= async ()=>{

    const app= express() 

    await dbConection()

    await App(app);

    app.listen(8000, ()=>{
        console.log("listening to port 8000")
    })

}

StartServer()