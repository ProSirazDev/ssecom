import express from 'express';
import { getOrder, getOrdersByCustomer, placeOrder, updateOrder } from '../controllers/orders.controller.js';


const router = express.Router();


router.post('/', placeOrder);

router.get('/', getOrder);
router.put('/:id', updateOrder);
router.get('/customer/:customer_id', getOrdersByCustomer);



export default router;
