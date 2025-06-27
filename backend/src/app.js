import express from 'express';
import productRoutes from './routes/product.routes.js';
import cors from 'cors'; // ✅ FIXED: added 'cors' package import
import brandRoutes from '../src/routes/brands.route.js'
import weightclassRoutes from '../src/routes/weightclass.routes.js'
import heightclassRoutes from '../src/routes/heightclass.routes.js'
import lengthclassRoutes from '../src/routes/lengthclass.routes.js'
import categoriesRoutes from '../src/routes/categories.routes.js'
import attributeRoutes from '../src/routes/attribute.routes.js'
import orderRoutes from '../src/routes/orders.routes.js'
import authRoutes from '../src/routes/auth.routes.js'
import reviewsRoutes from '../src/routes/reviews.routes.js';
import paymentRoutes from '../src/routes/payment.routes.js'; // ✅ FIXED: added 'payment.routes' import
import cookieParser from 'cookie-parser'; // ✅ FIXED: added 'cookie-parser' import
import addressRoutes from '../src/routes/address.routes.js'; // ✅ FIXED: added 'address.routes' import
import metricsRoute from './routes/metrics.route.js';
import couponRoutes from './routes/coupon.routes.js'
import customersRoute from './routes/customers.routes.js'
import { httpRequestCounter } from './metrics/metrics.js';


const app = express();


app.use(cors({
  origin: true, // Reflects the request origin
  credentials: true, // Allow cookies, Authorization headers, etc.
}));
app.use(cookieParser()); 

app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });
  });
  next();
});

app.use('/api/products', productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/weightclass", weightclassRoutes);
app.use("/api/heightclass", heightclassRoutes);
app.use("/api/lengthclass", lengthclassRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/metrics', metricsRoute);
app.use('/api/customers', customersRoute);


export default app;
