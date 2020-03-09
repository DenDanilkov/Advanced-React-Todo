import axios from 'axios';

const httpClient = baseURL => {
  return {
    get: async (path, params) => {
      const res = await axios.get(`${baseURL}${path}`, { params });
      console.log('FFFFFF', res.data)
      return res.data;

    },
    post: async (path, params) => {
      const res = await axios.post(`${baseURL}${path}`, params);
      return res.data;
    },
    put: async (path, params) => {
      const res = await axios.put(`${baseURL}${path}`, { params });
      return res.data;
    },
    delete: async (path, params) => {
      const res = await axios.delete(`${baseURL}${path}`, { params });
      return res.data;
    }
  };
};

export default httpClient;
