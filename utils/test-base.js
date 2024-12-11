const base = require('@playwright/test');
//.test is the newly created object from base and therefore a JavaScript object.

exports.customtest = base.test.extend(
{
  testDataForOrder : {
    userName : "kaleos31@gmail.com",
    password : "sonata666",
    productName : "ADIDAS ORIGINAL"
  }
}

)