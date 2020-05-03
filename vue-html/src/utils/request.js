import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'

// create an axios instance
const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, 

  timeout: 3000 // request timeout
})


service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
  }
)


service.interceptors.response.use(

  response => {
    const res = response.data

    if (res.code !== 200) {
      Message({
        message: "error",
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error,
      type: 'error',
      duration: 3 * 1000
    })
  }
)

export default service
