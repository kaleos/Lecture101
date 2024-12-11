class APiUtils
{

  constructor(apiContext, loginPayLoad)             // This is passsed from the webAPIPart1.spec.js file under newContext() and invoked by 
  {
    this.apiContext = apiContext;                   // This apiContext can only be accessed within this scope here.
    this.loginPayLoad = loginPayLoad;
  }

  async getToken()
  {
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",   // Post here by providing the url and the payload data.
      {
        data:this.loginPayLoad                                                   // And the payload data.
      })//200,201

      const loginResponseJson = await loginResponse.json()                  // This is getting the json response.
      const token = loginResponseJson.token;                                      // This is getting the token.
      console.log(token)
      return token;
  }

  async createOrder(orderPayload)
  {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",   // Post here by providing the url where an order was made and checked out.
      {     
        data : orderPayload,                                                // And the payload data.
        headers:{
                  'Authorization' : response.token,
                  'Content-Type' : 'application/json'                       // This comes from the Headers tab under Request Headers, section 
                },
      })
      const orderResponseJson = await orderResponse.json();                 // Gets the response in json format.
      console.log(orderResponseJson);
      const orderId = orderResponseJson.orders[0];                          // Gets the order id by index.
      response.orderId = orderId;

      return response;
  }
}

module.exports = {APiUtils};                                                 // With this export now this class is globally visible to all files in the project. The file using this class right now is webAPIPart1 file.