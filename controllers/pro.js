import models from '../models';

export default {
  postProducto: async (req, res, next) => {
    try {
      const { nombre, cantidad, fechaCaducidad, dosis, precio } = req.body;

      const guardar = new models.Productos({
        nombre, cantidad, fechaCaducidad, dosis, precio
      });

      const enviar = await guardar.save();

      res.status(200).json(enviar);
    } catch (error) {
      res.status(500).send({
        message: "No se pudo realizar la conexión"
      });
      next(error);
    }
  },

  getProductos: async (req, res, next) => {
    try {
      const buscar = await models.Productos.find();
      res.status(200).json(buscar);
    } catch (error) {
      res.status(500).send({
        message: "No se pudo obtener la información"
      });
      next(error);
    }
  },

  getProducto: async (req, res, next) => {
    try {
      const buscar = await models.Productos.findById(req.params.id);
      res.status(200).json(buscar);
    } catch (error) {
      res.status(500).send({
        message: "No se pudo obtener la información"
      });
      next(error);
    }
  },

  delProducto: async (req, res, next) => {
    try {
      await models.Productos.findByIdAndDelete(req.params.id);
      res.status(200).send({
        message: "Datos eliminados correctamente"
      });
    } catch (error) {
      res.status(500).send({
        message: "No se pudo eliminar el dato"
      });
      next(error);
    }
  },


  
  venderProducto: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { cantidad } = req.body;

      const producto = await models.Productos.findById(id);

      if (!producto) {
        return res.status(404).send({
          message: "Producto no encontrado"
        });
      }

      if (producto.cantidad < cantidad) {
        return res.status(400).send({
          message: "La cantidad seleccionada es mayor que la disponible"
        });
      }

      producto.cantidad -= cantidad;
      await producto.save();

      res.status(200).send({
        message: "Venta realizada con éxito"
      });
    } catch (error) {
      res.status(500).send({
        message: "Error al realizar la venta"
      });
      next(error);
    }
  }
};
