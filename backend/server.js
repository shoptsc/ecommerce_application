import "dotenv/config.js"
import express from "express"
import {notFound, errorHandler} from "./middleWare/errorMiddleWare.js"
import connectDB from "./config/db.js"
import colors from "colors"
import path from "path"
import morgan from "morgan"

import productRoutes from "./routes/productRoute.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoute from "./routes/uploadRoute.js"

connectDB()

const app = express();

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Api is running....")
})

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoute);

app.get("/api/config/paypal", (req, res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))


app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} on port ${PORT} `.yellow.bold))