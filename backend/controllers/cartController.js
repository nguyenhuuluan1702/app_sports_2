import userModel from "../models/userModel.js";

// them sp vao gio hang
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
    
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
    
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
    
        await userModel.findByIdAndUpdate(userId, {cartData});

        res.json({success: true, message: 'Them san pham vao gio thanh cong'})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
};

// cap nhat gio hang
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
    
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
    
        cartData[itemId][size] = quantity
    
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cap nhat gio hàng thanh cong" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
};

// xem gio hang
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
    
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
    
        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
    
};

export { addToCart, updateCart, getUserCart };
