const Order = require('../models/orders');
const Product = require('../models/products');
const mongoose = require('mongoose');

exports.ordersGetAll= (req,res,next)=>{
    Order.find()
    .select('quantity product _id')
    .populate('product','name price')
    .exec()
    .then(docs=>{
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc=>{
                return {
                    _id : doc.id,
                    product: doc.product, 
                    quantity: doc.quantity,
                    request : {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });  
    })
}

exports.orderCreate = (req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product =>{ 
        if(!product){
            return res.status(404).json({
                message: "Product not found."
            });
        } 
    const order = new Order({
        _id : mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
     return order.save()
    })
    .then(result=>{
        res.status(200).json({
            message: 'Order Stored.',
            request: {
                type: 'GET',
                createdOrder: {
                    _id: result.id,
                    product : result.product,
                    quantity: result.quantity
                },
                url : 'http://localhost:3000/orders/' + result._id
            }
        });
    })
    
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
    
} 

exports.orderGetOne =  (req,res,next)=>{
    Order.findById(req.params.orderId)
    .populate('product','name price')
    .exec()
    .then(order =>{
        if(!order){
            res.status(404).json({
                message: 'Order not found.'
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url : 'http://localhost:3000/orders'
            }
        })
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}

exports.orderDelete =  (req,res,next)=>{
    Order.deleteOne({_id: req.params.orderId}).exec()
    .then(result =>{
        res.status(200).json({
            message: "Order Deleted.",
            request : {
                type: 'GET',
                url :"http://localhost:3000/orders",
                body:{
                    product : "ID",
                    quantity:"Number"
                }
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}