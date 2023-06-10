import axios from 'axios'
import { message as Msg } from 'ant-design-vue'
import useTokenStore from '@/stores/token.js'
import { getTimeStamp } from '@/utils/auth.js'
import router from '@/router'

const TimeOut = 5400 // 定义一个超时的时间差 3600秒等于1个小时

const serive = axios.create({
    //初始化参数
    baseURL: '/api',
    timeOut: 10000 // 当超过多少毫秒时 认定超时
})


//请求拦截器
serive.interceptors.request.use(
    config => {
        //获取token
        const { token, removeToken } = useTokenStore()
        if (token) {
            // true token 超时  重新登录
            if (CheckTimeOut()) {
                removeToken()         // 登出 清除token
                router.push('/login') // 调到登录页
                console.log('跳转登录页');
                return Promise.reject(new Error('您的token已经超时,请重新登录'))
            }
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    }, error => {
        Promise.reject(error)
    }
)

//相应拦截器
serive.interceptors.response.use(
    response => {
        const { success, message, data } = response.data
        if (success) {
            return data
        }
        //提示信息
        //ant-design-vue 提供的弹窗
        Msg.error(message)
        //报错
        return Promise.reject(new Error(message))
    },
    error => Promise.reject(error)
)

// 检查时间过期
function CheckTimeOut() {
    // 从缓存中读取时间戳 和当前的时间节点进行比较 如果相差 大于 我们设定的期限的 认定超时
    var currentTime = Date.now() // 当前时间
    var timeStamp = getTimeStamp() // 缓存中的时间戳
    return (currentTime - timeStamp) / 1000 > TimeOut
}

export default serive
