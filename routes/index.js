const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const deleteProductController = require('../controller/product/deleteProduct')
const forgotpassword = require('../controller/user/forgotpassword')
const resetpassword = require('../controller/user/resetpassword')
const qrcode = require('qrcode');
const deleteallcart = require('../controller/user/deleteallcart')

router.post("/reset-password/:token",resetpassword)
router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.delete("/delete-product",authToken,deleteProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)
router.post("/forgot-password",forgotpassword);
router.delete("/deleteallcart",authToken,deleteallcart);
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhook')
const orderController = require('../controller/order/order.controller')
const allOrderController = require('../controller/order/allOrder.controller')

router.post('/generate-qr', async (req, res) => {
    const { amount} = req.body;
    const name="ANKIT";
    const note="Thank you for shopping";
    // Create UPI payment string
    const upiString = `upi://pay?pa=${process.env.upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
  
    try {
      const qrCodeUrl = await qrcode.toDataURL(upiString);
      res.status(200).json({ data:qrCodeUrl,success:true });
    } catch (err) {
      res.status(500).json({ msg:err,error: 'Failed to generate QR code',success:false });
    }
  });
  router.post('/checkout',authToken,paymentController)
  router.post('/webhook',webhooks) // /api/webhook
  router.get("/order-list",authToken,orderController)
  router.get("/all-order",authToken,allOrderController)




module.exports = router