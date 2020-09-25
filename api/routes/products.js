const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + file.originalname);
    }
  });

  
const fileFilter = (req, file, cb)=>{
    // reject a file.
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 * 5
},
    fileFilter: fileFilter
});


const Product = require('../models/products');
const productController = require('../controllers/products');

router.get('/',productController.productAll);


router.post('/', checkAuth, upload.single('productImage'), productController.productPost);


router.get('/:productId',productController.productGetOne);

router.patch('/:productId', checkAuth, productController.productUpdate);

router.delete('/:productId', checkAuth, productController.productDelete);

module.exports = router;