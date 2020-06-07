import axios from 'axios'
import { Message } from 'element-ui'


// create an axios instance
const service = axios.create({
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
                message: res.msg,
                type: 'error',
                duration: 3 * 1000
            })
        } else {
            return res
        }
    },
    error => {
        Message({
            message: error,
            type: 'error',
            duration: 3 * 1000
        })
    }
)

export default service
