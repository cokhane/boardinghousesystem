const express = require('express');
const router = express.Router();
const Room = require('../models/room')
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({dest: '/uploads/'})

// router.get('/', (req,res,next) => {
//   // res.status(200).json({
//   //   message:'Handling GET request to /products'
//   // })
//   Product.find()
//   .select('name price _id')
//   .exec()
//   .then(docs => {
//     const response = {
//       count:docs.length,
//       products: docs.map(item => {
//         return{
//           name:item.name,
//           price:item.price,
//           _id: item._id,
//           request : {
//             type: 'GET',
//             url: 'http://localhost:4000/products/' + item._id
//           }
//         }
//       })
//     }
//
//
//     if(docs.length > 0){
//       res.status(200).json(response)
//     }else{
//       res.status(404).json({
//         message: 'No entries found'
//       })
//     }
//   })
//   .catch(err => {
//     console.log(err)
//     res.status(500).json({
//       error:err
//     })
//   })
// })
//


router.post('/', (req,res,next) => {
  const room = new Room({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  })
  room.save()
  .then(result => {
    console.log(result)
    res.status(201).json({
      message:'Created Room successfully',
      createdRoom:{
           name: result.name,
          _id:result._id,
            request:{
              type: 'POST',
              url: 'http://localhost:4000/rooms/' + result._id
            }
      }

      // createdProduct: {
      //   name: result.name,
      //   price:result.price,
      //   _id:result._id,
      //   request:{
      //     type: 'POST',
      //     url: 'http://localhost:4000/products/' + result._id
      //   }
      // }
    })
  })
  .catch(err => {
     console.log(err)
     res.status(500).json({
       error:err
     })
  })
})

// router.get('/:productId', (req,res,next) => {
//   const id = req.params.productId
//
//   Product.findById(id)
//   .select('name price _id')
//   .exec()
//   .then(doc => {
//     console.log("From Database",doc)
//     doc ? res.status(200).json({
//       product:doc,
//       request:{
//         type: 'GET',
//         description:'GET_BY_ID',
//         url: 'http://localhost:4000/products/' + result._id
//       }
//     }) : res.status(404)({
//       message: 'No valid entry found for provided ID'
//     })
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error:err
//     })
//   })
// })
//
// router.patch('/:productId', (req, res, next) => {
//   // res.status(200).json({
//   //   message: 'Updated product!'
//   // })
//   const id = req.params.productId
//   const updateOps = {};
//   for(const ops of req.body){
//     updateOps[ops.propName] = ops.value
//   }
//   Product.update({ _id:id}, { $set: updateOps }).exec()
//   .then(res => {
//     res.status(200).json({
//       message:'Product updated',
//       request:{
//         type: 'GET',
//         url: 'http://localhost:4000/products/' + _id
//       }
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.status(500).json({
//       error:err
//     })
//   })
// })
//
// router.delete('/:productId', (req, res, next) => {
//   const id = req.params.productId
//   Product.deleteOne({ _id:id })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message:"Delete Success!",
//         request:{
//           type: 'POST',
//           url: 'http://localhost:4000/products/',
//           body: {name: 'String', price: 'Number'}
//         }
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({
//         error:err
//       })
//     })
//   // res.status(200).json({
//   //   message: 'Deleted product'
//   // })
//
// })

module.exports  = router
