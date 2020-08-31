const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const express = require('express');


admin.initializeApp(functions.config().firebase);

const app = express()

app.use(cors({ origin: true }));

app.post('/products',(request, response) => {
  if(request.method !== "POST"){
    response.send(405, 'HTTP Method ' +request.method+' not allowed');
  }
  else{
    console.log(`Request: ${request.body}`);
    productName = request.body.product;
    console.log(`Product Name: ${productName}`);
    admin.database().ref('products/').push({
      product:productName
    }).then(()=>{
      response.send({
          status:200,
          message:"Successfully added new product"
      })
    }).catch((err)=>{
        console.log(err)
        response.send({
            status:403,
            message: err
        })
    })
  }
});

app.post('/vendors',(request, response) => {
  if(request.method !== "POST"){
    response.send(405, 'HTTP Method ' +request.method + ' not allowed');
  }
  else{
    console.log(`Request: ${request.body}`);
    vendor = request.body;
    admin.database().ref('vendors/').push(vendor).then(()=>{
      response.send({
          status:200,
          message:"Successfully added new vendor"
      })
    }).catch((err)=>{
        console.log(err)
        response.send({
            status:403,
            message: err
        })
    })
  }
});

app.post('/vendors/update',(request, response) => {
  if(request.method !== "POST"){
    response.send(405, 'HTTP Method ' +request.method + ' not allowed');
  }
  else{
    console.log(`Request: ${request.body}`);
    vendor = request.body;
    console.log(vendor.id)
    const update = {
      name: vendor.name,
      address: vendor.address,
      phone: vendor.phone,
    }
    console.log(update)
    admin.database().ref('vendors/'+ vendor.id).update(update).then(()=>{
      response.send({
          status:200,
          message:"Successfully updated vendor"
      })
    }).catch((err)=>{
        console.log(err)
        response.send({
            status:403,
            message: err
        })
    })
  }
});

app.post('/vendors/add-rating',(request, response) => {
  if(request.method !== "POST"){
    response.send(405, 'HTTP Method ' +request.method + ' not allowed');
  }
  else{
    const data = request.body;
    const datetime = new Date().toISOString();
    const payload = {
      rating:data.rating
    }
    const remarks = {
      datetime:datetime,
      rating:data.rating,
      remark:data.remark,
    }
    admin.database().ref('vendors/' + data.id).update(payload).then(()=>{
      admin.database().ref('remarks/' + data.id + '/').push(remarks).then(()=>{
        response.send({
            status:200,
            message:"Successfully added remarks"
        })
      }).catch((err)=>{
        console.log(err)
        response.send({
            status:403,
            message: err
        })
      })
    }).catch((err)=>{
        console.log(err)
        response.send({
            status:403,
            message: err
        })
    })
  }
});

exports.widgets = functions.https.onRequest(app);