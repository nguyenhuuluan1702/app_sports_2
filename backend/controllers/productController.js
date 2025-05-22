import { v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, sizes, bestseller } = req.body;

        // Lấy ảnh từ req.file (vì sử dụng upload.single)
        const image1 = req.file;

        if (!image1) {
            return res.json({ success: false, message: 'Vui lòng cung cấp một ảnh.' });
        }

        // Upload ảnh lên Cloudinary
        const result = await cloudinary.uploader.upload(image1.path, { resource_type: 'image' });
        const imageUrl = result.secure_url;

        // Chuẩn bị dữ liệu sản phẩm
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            image: imageUrl,
            date: Date.now()
        };

        console.log(productData);

        // Lưu sản phẩm vào cơ sở dữ liệu
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Thêm sản phẩm thành công' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
}


const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Xoa san pham thanh cong" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
}

export { addProduct, listProducts, removeProduct, singleProduct }