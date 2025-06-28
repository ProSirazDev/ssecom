import pool from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const placeOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      customer_id,
      payment_method,
      payment_status,
      order_status = 'Pending', // Default order status
      shipping_address,
      address_id,
      

      cartItems,
    } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const orderId = uuidv4();
    const generateOrderId = () => {
  return 'ORD-' + Date.now(); // Example: ORD-1716806785123
};
const store_id='68ab9085-2a4b-449f-9ab0-217d746e06b8'
    const order_id= generateOrderId();
    const total_amount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await client.query('BEGIN');

    await client.query(
      `INSERT INTO orders (id, customer_id, total_amount, payment_method, payment_status,order_status, shipping_address,address_id,order_id,store_id)
       VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10)`,
      [orderId, customer_id, total_amount, payment_method, payment_status,order_status, shipping_address,address_id,order_id,store_id]
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
    const orderResult = await client.query(`SELECT 
  orders.id,
  orders.order_id,
  orders.customer_id,
  users.firstname || ' ' || users.lastname AS customer_name,
  orders.total_amount,
  orders.payment_method,
  orders.payment_status,
  orders.order_status,
  orders.shipping_address,
  orders.address_id,
  
  TO_CHAR(orders.cdate, 'DD-MM-YYYY HH24:MI') AS cdate,
  TO_CHAR(orders.udate, 'DD-MM-YYYY HH24:MI') AS udate
FROM orders
JOIN users ON orders.customer_id = users.usid
ORDER BY orders.udate DESC;
`);

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
    const { payment_method, payment_status, order_status, shipping_address } = req.body;
const result = await client.query(
  `UPDATE orders
   SET payment_method = COALESCE($1, payment_method),
       payment_status = COALESCE($2, payment_status),
       order_status = COALESCE($3, order_status),
       shipping_address = COALESCE($4, shipping_address),
      udate = NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata'
   WHERE id::uuid = $5
   RETURNING *`,
  [payment_method, payment_status, order_status, shipping_address, id]
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




export const getOrderDetailsById = async (req, res) => {
  const { orderid } = req.params;

  try {
    const query = `
      SELECT 
        orders.id AS id,
        orders.order_id AS orderid,
        orders.payment_method,
        orders.cdate AS order_date,
        orders.order_status,
        orders.customer_id,
        orders.total_amount,
        orders.payment_status,
        orders.shipping_address,

        stores.store_name,
        stores.phone AS store_phone,
        stores.email AS store_email,
        stores.address AS store_address,
        stores.city AS store_city,
        stores.state AS store_state,
        stores.country AS store_country,

        order_items.id AS order_item_id,
        order_items.product_id,
        order_items.quantity,
        order_items.unit_price,
        products.product_name

      FROM orders
      JOIN order_items ON orders.id = order_items.order_id
      JOIN stores ON orders.store_id = stores.id
     JOIN products ON order_items.product_id = products.id 


      WHERE orders.id = $1 ORDER BY orders.udate ASC
    `;

    const result = await pool.query(query, [orderid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Extract order-level info from the first row
    const orderInfo = {
      id: result.rows[0].id,
      order_id: result.rows[0].orderid,
      payment_method: result.rows[0].payment_method,
      order_date: result.rows[0].order_date,
      order_status: result.rows[0].order_status,
      customer_id: result.rows[0].customer_id,
      total_amount: result.rows[0].total_amount,
      payment_status: result.rows[0].payment_status,
      shipping_address: result.rows[0].shipping_address,
      store: {
        store_name: result.rows[0].store_name,
        phone: result.rows[0].store_phone,
        email: result.rows[0].store_email,
        address: result.rows[0].store_address,
        city: result.rows[0].store_city,
        state: result.rows[0].store_state,
        country: result.rows[0].store_country,
      },
      items: result.rows.map(row => ({
        order_item_id: row.order_item_id,
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: row.quantity,
        unit_price: row.unit_price,
      })),
    };

    res.json(orderInfo);
  } catch (err) {
    console.error("Error fetching order details:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
