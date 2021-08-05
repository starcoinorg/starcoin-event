import axios from 'axios';

const instance = axios.create({
  baseURL: window.location.host.includes('localhost')
    ? 'http://localhost:3333'
    : process.env.REACT_APP_STARCOIN_EVENT_API_URL,
});

instance.interceptors.response.use(function(response) {
  const data = response.data
  if (data.success) {
    return data
  } else {
    return Promise.reject(data)
  }
})

export default instance;
