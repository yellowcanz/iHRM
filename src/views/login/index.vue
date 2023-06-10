<template>
    <div class="login-container">
        <div class="logo">
            <div class="icon">iHRM</div>
            <img src="@/assets/logo.svg" alt="">
            <p>开箱即用的中后台管理系统</p>
        </div>
        <div class="form">
            <h3>iHRM 人力资源管理系统</h3>
            <a-card class="login-card">
                <a-form :model="loginForm" autocomplete="off" @finish="onfinish" :label-col="{ span: 6 }">
                    <!-- 手机号码/用户名 -->
                    <a-form-item label="Username" name="mobile" :rules="[{
                        required: true,
                        message: '手机号或用户名不能为空!',
                        trigger: ['change', 'blur'],
                    },
                    {
                        pattern: /^1[3-9]\d{9}$/,
                        message: '手机号码格式不正确',
                        trigger: ['change', 'blur']
                    }]">
                        <a-input size="large" v-model:value="loginForm.mobile" />
                    </a-form-item>
                    <!-- 密码 -->
                    <a-form-item label="Password" name='password'
                        :rules="[{ required: true, message: '密码不能为空！', trigger: ['change', 'blur'] }]">
                        <a-input-password size="large" v-model:value="loginForm.password" />
                    </a-form-item>
                    <!-- 同意 -->
                    <a-form-item name="isAgree" :rules="[{ validator: validatorAgree }]">
                        <a-checkbox v-model:checked="loginForm.isAgree">请先同意用户协议</a-checkbox>
                    </a-form-item>
                    <!-- 登录 -->
                    <a-form-item>
                        <a-button type="primary" size="large" block htmlType="submit">登录</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue"
import { login } from '../../api/login.js'
import useToken from '../../stores/token.js'
import { setTimeStamp } from '@/utils/auth.js'
import { useRouter } from "vue-router"

const { updateToken } = useToken()
const router = useRouter()

const loginForm = reactive({
    //系统默认账号
    mobile: '13800000002',
    //默认密码
    password: 'hm#qd@23!',
    isAgree: false
})


const onfinish = (value) => {
    login(value).then(res => {
        updateToken(res)
        router.push('/')
        setTimeStamp()
    })
}

const validatorAgree = (rule, value) => {
    // 判断value是不是ture，不是就报错
    // Promise是es6的一个构造函数，等待  成功 失败  resolve 成功 reject 失败
    return value ? Promise.resolve() : Promise.reject(new Error('不同意用户协议你还想用？'))
}

</script>

<style lang="less" scoped>
.login-container {
    display: flex;
    align-items: stretch;
    height: 100vh;

    .logo {
        flex: 3;
        background: rgba(70, 114, 161, 0.993);
        border-top-right-radius: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        padding: 0 100px;

        .icon {
            width: 400px;
            text-align: center;
            margin-bottom: 50px;
            font-weight: bold;
            font-size: 56px;
            color: #fff;
        }

        img {
            width: 400px;
            height: 400px;
        }

        p {
            color: #fff;
            font-size: 18px;
            margin-top: 20px;
            width: 420px;
            text-align: center;
        }
    }

    .form {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-left: 50px;

        .ant-card {
            width: 400px;
            border: none;
            padding: 0;
        }

        h3 {
            padding-left: 30px;
            font-size: 36px;
            font-weight: bold;
        }
    }

}
</style>
