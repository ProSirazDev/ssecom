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
const app = express();


app.use(cors({
  origin: 'http://localhost:5173', // ✅ explicitly allow your frontend origin
  credentials: true,               // ✅ allow cookies, tokens, etc.
}));
app.use(cookieParser()); 

app.use(express.json());

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

export default app;
