import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
//import productModel from "../models/productModel.js";
// Thanh toan khi nhan hang
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
    
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };
    
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {}}); 
        res.json({ success: true, message: "Đặt hàng thành công" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
};

const placeOrderStripe = async (req, res) => {

};

const placeOrderRazorpay = async (req, res) => {

};

const allOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
};

const userOrders = async (req, res) => {

};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Cập nhật trạng thái đơn hàng dựa vào orderId
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } // Trả về tài liệu đã được cập nhật
        );

        if (!updatedOrder) {
            return res.json({ success: false, message: "Không tìm thấy đơn hàng" });
        }

        res.json({ success: true, message: "Cập nhật trạng thái thành công", updatedOrder });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };



