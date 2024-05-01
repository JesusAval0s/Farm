import routerx from 'express-promise-router';
import ProductoC from '../controllers/Producto';



const router=routerx();

router.post('/guardarProducto',ProductoC.postProducto);
router.get('/buscarProducto',ProductoC.getProductos);
router.get('/buscarProducto/:id',ProductoC.getProducto);
router.delete('/eliminar/:id',ProductoC.delProducto);
router.put('/vender/:id', ProductoC.venderProducto);
router.patch('/actualizar/:id', ProductoC.updateProducto);
router.get('/buscarOneProducto/:id', ProductoC.getOneProducto);





export default router;