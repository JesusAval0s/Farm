import mongoose from "mongoose";

const producto=new mongoose.Schema({
    nombre:String,
    cantidad:String,
    fechaCaducidad:String,
    dosis:String,
    precio:String
});

const Productos=mongoose.model('producto',producto);
export default Productos;
