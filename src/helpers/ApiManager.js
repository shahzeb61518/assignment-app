import axios from "axios";

export default class ApiManager {
  // LocalHost
  _BASE_URL =
    "https://my-json-server.typicode.com/benirvingplt/products/products";

  // Products
  //   _GET_PRODUCTS = "products/get";

  async sendGetRequest(_url, _params, _headers) {
    _url = this._BASE_URL;
    console.log("API _url", _url);

    if (!_headers) {
      _headers = {
        "Content-Type": "application/json",
      };
    }

    try {
      let response = await axios.get(_url);

    //   console.log("API call response", response);
      return response;
    } catch (error) {
      let err = [];
      err.error = error;
      err.no_result = true;
      console.log("catch error on ", _url, " call fail", err);
      setTimeout(() => {
        alert("Unable to connect with server");
      }, 400);
      return err;
    }
  }

  getProducts() {
    let url = this._GET_PRODUCTS;
    return this.sendGetRequest(url);
  }
}
