const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://ranjan:ranjan219@first-api.umr6o.mongodb.net/<dbname>?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true});

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use((req,res, next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Header','Origin,X-Requested-With,Content-Type, Accept,Authorization');

  if(req.method === "OPTIONS"){
    res.header('Accept-Control-Allow-Method','GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
})


app.use("/products",productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);

app.use((req, res , next)=>{
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error,req,res,next)=>{
   res.status(error.status || 500)
   res.json({
     error: {
       message: error.message
     }
   })
})

  // This uses both get and post request
  /* app.use((req,res, next)=>{
         res.status(200).json({
             message : "It works!",
         });
     });   */

module.exports = app;