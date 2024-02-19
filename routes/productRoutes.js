const express = require('express');
const productController = require(`${__dirname}/../controllers/productController`);

const router = express.Router();

router.post('/products',productController.addProduct);

router.get('/products/:id',productController.getProduct);
router.get('/products',productController.getProduct);

router.put('/products/:id',productController.updateProduct);
// router.put('/products',productController.updateProduct);

router.delete('/products/:id',productController.deleteProduct);
router.delete('/products',productController.deleteProduct);

module.exports = router;