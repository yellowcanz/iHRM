import router from '@/router'
import useTokenStores from './stores/token';

import nProgress from 'nprogress';
import 'nprogress/nprogress.css'


// 定义白名单
const whiteList = ['/login', '/404']

// 路由守卫 在路由跳转之前执行
// to   到哪里去
// from 从哪里来
// next 放行，必须执行的一个函数

router.beforeEach((to, from, next) => {
    // 开始进度条
    nProgress.start()
    const { token } = useTokenStores()

    //判断是否有token
    if (token) {
        //判断是否登录页
        if (to.path === '/login') {
            //跳转主页
            router.push('/')
        } else {
            //直接放行
            next()
        }
    } else {
        // 没有token 判断是否在白名单中
        if (whiteList.includes(to.path)) {
            // 在白名单中放行
            next()
        } else {
            // 不在白名单中跳转登录页
            router.push('/login')
        }
    }
})

// 路由跳转之后
// 关闭进度条
router.afterEach(() => {nProgress.done()})