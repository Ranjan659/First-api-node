const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const Product = require('../models/products');

router.get('/',(req,res,next)=>{
    Product.find().exec()
    .select("name price _id")
    .then(docs=>{
        const response = {
            count : docs.length, 
            products:docs
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})


router.post('/',(req,res,next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name, 
        price: req.body.price
    });

    product.save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: "Handling POST request to products",
            createdProduct : result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
 
})


router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
   Product.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: "No valid entry found the Provided ID. "})
        }
        
    })
    .catch(err=>{
        console.log({err});
        res.status(500).json({err});
    })

})

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] =  ops.value;
    }
    Product.update({_id: id}, {$set : updateOps}).exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

})

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.remove({_id : id}).exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    })
})

module.exports = router;