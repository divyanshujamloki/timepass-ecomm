const express = require("express");
const router = express.Router();
const productController = require("../Controller/Products");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
// Define other routes for CRUD operations

module.exports = router;
