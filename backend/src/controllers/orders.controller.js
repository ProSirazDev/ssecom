import pool from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const placeOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      customer_id,
      payment_method,
      payment_status,
      shipping_address,

      cartItems,
    } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const orderId = uuidv4();
    const generateOrderId = () => {
  return 'ORD-' + Date.now(); // Example: ORD-1716806785123
};

    const order_id= generateOrderId();
    const total_amount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await client.query('BEGIN');

    await client.query(
      `INSERT INTO orders (id, customer_id, total_amount, payment_method, payment_status, shipping_address,order_id)
       VALUES ($1, $2, $3, $4, $5, $6,$7)`,
      [orderId, customer_id, total_amount, payment_method, payment_status, shipping_address,order_id]
    );

    for (const item of cartItems) {
      const itemId = uuidv4();
     await client.query(
  `INSERT INTO order_items (id, order_id, product_id, quantity, unit_price)
   VALUES ($1, $2, $3, $4, $5)`,
  [itemId, orderId, item.product_id || item.id, item.quantity, item.price]
);

    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  } finally {
    client.release();
  }
};

export const getOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    const orderResult = await client.query(`SELECT * FROM orders`);

    res.json({
      orders: orderResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get orders' });
  } finally {
    client.release();
  }
};


export const updateOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const { payment_method, payment_status, shipping_address } = req.body;

    const result = await client.query(
      `UPDATE orders
       SET payment_method = COALESCE($1, payment_method),
           payment_status = COALESCE($2, payment_status),
           shipping_address = COALESCE($3, shipping_address)
       WHERE id = $4
       RETURNING *`,
      [payment_method, payment_status, shipping_address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order updated successfully', order: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update order' });
  } finally {
    client.release();
  }
};

// export const getOrdersByCustomer = async (req, res) => {
//   const client = await pool.connect();
//   try {
//     const { customer_id } = req.params;

//     if (!customer_id) {
//       return res.status(400).json({ error: 'Missing customer_id' });
//     }

//     const result = await client.query(
//       `
//       SELECT 
//         o.id AS order_id,
//         o.order_id AS order_reference,
//         o.total_amount,
//         o.payment_method,
//         o.payment_status,
//         o.shipping_address,
//         o.cdate,
//         oi.product_id,
//         oi.quantity,
//         oi.unit_price
//       FROM orders o
//       LEFT JOIN order_items oi ON o.id = oi.order_id
//       WHERE o.customer_id = $1
//       ORDER BY o.cdate DESC
//       `,
//       [customer_id]
//     );

//     // Group by order
//     const ordersMap = {};

//     result.rows.forEach(row => {
//       if (!ordersMap[row.order_id]) {
//         ordersMap[row.order_id] = {
//           order_id: row.order_id,
//           order_reference: row.order_reference,
//           total_amount: row.total_amount,
//           payment_method: row.payment_method,
//           payment_status: row.payment_status,
//           shipping_address: row.shipping_address,
//           created_at: row.created_at,
//           items: [],
//         };
//       }

//       ordersMap[row.order_id].items.push({
//         product_id: row.product_id,
//         quantity: row.quantity,
//         unit_price: row.unit_price,
//       });
//     });

//     const orders = Object.values(ordersMap);

//     res.status(200).json({ orders });
//   } catch (err) {
//     console.error('Error fetching customer orders:', err);
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   } finally {
//     client.release();
//   }
// };

export const getOrdersByCustomer = async (req, res) => {
  const { customer_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT
  o.order_id,
  o.cdate,
  o.order_status,
  oi.quantity,
  oi.unit_price,
  p.product_name,
  b.brand_name,
  p.unit_image,
  p.id
FROM
  orders o
JOIN
  order_items oi ON o.id = oi.order_id
JOIN
  products p ON oi.product_id = p.id
  JOIN
  brands b ON b.id = p.brand_id
WHERE o.customer_id = $1::uuid
ORDER BY
  o.cdate DESC`
,
      [customer_id] // Assuming customer_id is a UUID
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
