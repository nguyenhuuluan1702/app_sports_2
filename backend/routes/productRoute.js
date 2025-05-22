import express from 'express';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Chỉ upload một ảnh duy nhất
productRouter.post('/add', adminAuth, upload.single('image1'), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.get('/list', listProducts);
productRouter.get('/single', singleProduct);

export default productRouter;
