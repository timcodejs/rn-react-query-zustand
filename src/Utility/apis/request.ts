import axios, {Method} from 'axios';

const request = async (
  method: Method,
  url: string,
  headers = {},
  jsonData: any,
) => {
  if (method === 'get') {
    try {
      const data = await axios({
        method: method,
        url: url,
        headers: {
          ...headers,
        },
        params: jsonData,
      });

      return data;
    } catch (err) {
      await Promise.reject(err);
    }
  } else {
    try {
      const data = await axios({
        method: method,
        url: url,
        headers: {
          ...headers,
        },
        data: jsonData,
      });

      return data;
    } catch (err) {
      await Promise.reject(err);
    }
  }
};

export default request;
