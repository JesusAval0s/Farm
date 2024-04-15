import routerx from 'express-promise-router';
import ProductoR from './Producto'

const router = routerx();

router.use('/producto',ProductoR);

export default router;