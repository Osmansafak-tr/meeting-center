const axios = require("axios");

class RequestHandler {
  constructor(baseUrl, headers = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async get(url, headers = this.headers) {
    const targetUrl = this.baseUrl + url;
    const response = await axios.get(targetUrl, { headers: headers });
    return response;
  }

  async post(url, body, headers = this.headers) {
    const targetUrl = this.baseUrl + url;
    const response = await axios.post(targetUrl, body, {
      headers: headers,
    });
    return response;
  }
}

exports.tokenService = new RequestHandler(process.env.TOKEN_API_URL, {
  Authorization: `${process.env.TOKEN_API_SHARED_SECRET_KEY}`,
});

// module.exports = RequestHandler;
