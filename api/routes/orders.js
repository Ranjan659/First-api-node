const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'This is an order get request.'
    })
})

router.post('/',(req,res,next)=>{
    const order = {
        productId : req.body.productId, 
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: "Handling POST request to orders",
        ProductOrdered: order
    })
})

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message: 'Order details',
        orderId : req.params.orderId
    })
})


router.patch('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling PATCH request to /orders"
    })
})

router.delete('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling DELETE request to /orders"
    })
})


module.exports = router;