import models from '../models';

export default {
  postProducto: async (req, res, next) => {
    try {
      const { nombre, cantidad, fechaCaducidad, dosis, precio } = req.body;

      const guardar = new models.Productos({
        nombre,
        cantidad,
        fechaCaducidad,
        dosis,
        precio
      });

      const enviar = await guardar.save();

      res.status(200).json(enviar);
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      res.status(500).send({
        message: 'No se pudo realizar la conexión'
      });
      next(error);
    }
  },

  getProductos: async (req, res, next) => {
    try {
      const buscar = await models.Productos.find();
      res.status(200).json(buscar);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).send({
        message: 'No se pudo obtener la información de los productos'
      });
      next(error);
    }
  },

  getProducto: async (req, res, next) => {
    try {
      const buscar = await models.Productos.findById(req.params.id);
      if (!buscar) {
        return res.status(404).send({
          message: 'Producto no encontrado'
        });
      }
      res.status(200).json(buscar);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).send({
        message: 'No se pudo obtener la información del producto'
      });
      next(error);
    }
  },

  delProducto: async (req, res, next) => {
    try {
      const eliminar = await models.Productos.findByIdAndDelete(req.params.id);
      if (!eliminar) {
        return res.status(404).send({
          message: 'Producto no encontrado'
        });
      }
      res.status(200).send({
        message: 'Datos eliminados correctamente'
      });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).send({
        message: 'No se pudo eliminar el dato'
      });
      next(error);
    }
  },

  venderProducto: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const { cantidad } = req.body;

      // Buscar el producto por su ID
      const producto = await models.Productos.findById(productId);

      if (!producto) {
        return res.status(404).send({
          message: 'Producto no encontrado'
        });
      }

      // Verificar si hay suficiente cantidad para vender
      if (producto.cantidad < cantidad) {
        return res.status(400).send({
          message: 'No hay suficiente cantidad disponible para vender'
        });
      }

      // Restar la cantidad vendida
      producto.cantidad -= cantidad;

      // Guardar el producto actualizado
      await producto.save();

      // Enviar respuesta de éxito
      res.status(200).send({
        message: 'Venta realizada con éxito'
      });
    } catch (error) {
      // Manejar errores
      console.error('Error al vender el producto:', error);
      res.status(500).send({
        message: 'Error al vender el producto'
      });
      next(error);
    }
  },

  updateProducto:async(req,res,next)=>{
    try {
        const {nombre, cantidad, fechaCaducidad, dosis, precio}=req.body;

        const actualizarDatos={
          nombre, cantidad, fechaCaducidad, dosis, precio
      };
      
      const actualizar = await models.Productos.findByIdAndUpdate(req.params.id, actualizarDatos);
      res.status(200).json(actualizar);
          
      } catch (error) {
          res.status(500).send({
              message:"No se pudo realizar la conexion"
          })
          next(error);
      }
   },

   getOneProducto:async (req,res,next)=>{
    try {
     const buscar= await models.Productos.findById(req.params.id);
     res.status(200).json(buscar);
    } catch (error) {
     res.status(500).send({
         message:"No se obtuvo la informacion"
     })
     next(error);
   }
}
};
