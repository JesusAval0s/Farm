
import express from "express"
import router from "./routes";
import mongoose from 'mongoose';
import cors from "cors";


//Connection bd
//mongoose.Promise;
//const dbUrl= "mongodb://127.0.0.1:27017/info";

const dbUrl=`mongodb+srv://jklsjesus:zsoZJRBNJllOxmOS@farm.zywh6rd.mongodb.net/`

mongoose.connect(dbUrl)
.then(mongoose=>console.log('Base de datos conectado'));

const app = express()

app.set('port',process.env.PORT || 4000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api',router);

app.listen(app.get('port'), () => {
  console.log(`Servidor ejecutandose en el puerto:`+app.get('port'))
})