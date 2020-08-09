const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addProductCategory = functions.https.onRequest((request, response) => {
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

