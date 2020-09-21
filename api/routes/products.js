const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const Product = require('../models/products');

router.get('/',(req,res,next)=>{
    Product.find()
    .select("name price _id")
    .exec()
    .then(docs=>{
        const response = {
            count : docs.length, 
            products:docs.map(doc =>{
                return {
                    name: doc.name,
                    price : doc.price,
                    _id : doc._id, 
                    request : {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);

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
            message: "Created product successfully",
            createdProduct :{
                name: result.name,
                price: result.price,
                 id: result._id,

            }
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