import express from "express";
import userController from "../controllers/userController";
import productControllers from "../controllers/productController";
import profileControllers from "../controllers/profileController";
import upload from "../controllers/uploadImageController";
import CustomerController from "../controllers/customerController";
// import saleController from "../controllers/saleController";
import { verifyToken }from "../middlewares/verifyToken";
const router = express.Router();
 // MEAN: user router
router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.get("/users", userController.getUsers);


// MEAN: product router
router.post("/products",verifyToken, productControllers.createProduct);
router.get("/products", productControllers.getProducts);
router.delete("/products/:id", productControllers.deleteProduct);
router.put("/products/:id", productControllers.updateProduct);
router.get("/products/:id", productControllers.getProduct)

// MEAN: prfile router
router.post("/profile/:id",upload.single("image"), profileControllers.createProfile);
// router.get("/profile/:id", profileControllers.getProfile);
router.get("/profile", profileControllers.getProfiles);
router.delete("/profile/:id", profileControllers.deleteProfile);

// MEAN: customer router
router.post("/customer", CustomerController.createCustomer);	
router.get("/customer", CustomerController.getCustiomer);

// MEAN: sale router 
// router.post("/sale", saleController.createSale);
// router.get("/sale", saleController.getSales)
// router.get("/sale/:id", saleController.getSale)
// router.delete("/sale/:id", saleController.deleteSale);
// router.put("/sale/:id", saleController.updateSale);
export default router
