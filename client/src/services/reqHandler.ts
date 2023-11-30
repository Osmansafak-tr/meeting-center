import axios from "axios";

class RequestHandler {
  private baseUrl;
  private headers;

  constructor(baseUrl: string, headers = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async get(url: string, headers = this.headers) {
    const targetUrl = this.baseUrl + url;
    const response = await axios.get(targetUrl, { headers: headers });
    return response;
  }

  async post(url: string, body: {}, headers = this.headers) {
    const targetUrl = this.baseUrl + url;
    const response = await axios.post(targetUrl, body, {
      headers: headers,
    });
    return response;
  }

  async delete(url: string, headers = this.headers) {
    const targetUrl = this.baseUrl + url;
    const response = await axios.delete(targetUrl, { headers: headers });
    return response;
  }
}

const backendReqHandler = new RequestHandler(import.meta.env.VITE_BACKEND_URL, {
  "x-api-key": `${import.meta.env.VITE_BACKEND_SHARED_SECRET_KEY}`,
});
const agoraApiReqHandler = new RequestHandler(
  import.meta.env.VITE_AGORA_API_URL,
  {
    "x-api-key": `${import.meta.env.VITE_AGORA_API_SHARED_SECRET_KEY}`,
  }
);
export { backendReqHandler, agoraApiReqHandler };
