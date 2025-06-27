import express from 'express';
import { getOrder, getOrderDetailsById, getOrdersByCustomer, placeOrder, updateOrder } from '../controllers/orders.controller.js';


const router = express.Router();


router.post('/', placeOrder);

router.get('/', getOrder);

router.get('/details/:orderid', getOrderDetailsById);

router.get('/customer/:customer_id', getOrdersByCustomer);
router.put('/:id', updateOrder);



export default router;
