const router = require("express").Router();

const Product = require('./productRouter');
const Shop = require('./shopRouter');

router.use("/api/v1/products", Product)
router.use("/api/v1/shops", Shop)

module.exports = router;