const {base} = require('@playwright/test');

exports.test = base.test.extend(
{
  testDataForOrder : {
    userName : "kaleos31@gmail.com",
    password : "sonata666",
    productName : "ADIDAS ORIGINAL"
    }

} 

)