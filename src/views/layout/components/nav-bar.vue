
<template>
    <!-- 点击图标时触发 -->
    <div class="menufold" @click="changeCollapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
    </div>
    <a-popover placement="bottomRight">
        <a-avatar class="my-avatar">{{ userInfo.username?.charAt(0) }}</a-avatar>
        <template #content>
            <div class="my-select" @click="loginOut">
                <p class="item">
                    <LockOutlined /><span>退出登录</span>
                </p>
            </div>
        </template>
    </a-popover>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserInfo } from '@/api/login'
import useToken from '@/stores/token.js';
import router from '@/router'


// eslint-disable-next-line vue/no-setup-props-destructure
const { collapsed } = defineProps({
    collapsed: Boolean
})

// 获取事件触发器
const emit = defineEmits(['update:collapsed'])
const changeCollapsed = () => {
    emit('update:collapsed', !collapsed)  // 触发了一个事件- 传出了一个参数 子传父
    // v-model实际上是监听了 子组件触发的事件  update:modelValue
}

const userInfo = ref({})


// 封装获取用户信息的方法
const getUserProfile = async () => {
    // pinia 存储用户信息
    const { updateSserInfoStores } = useToken();
    userInfo.value = await getUserInfo()
    updateSserInfoStores(userInfo.value)
    // userInfoStores.value = await getUserInfo()
}

const loginOut = () => {
    const { removeToken } = useToken()
    removeToken()
    router.push('/login') // 调到登录页
}

//挂载完毕后渲染数据
onMounted(() => {
    getUserProfile()
})


</script>

<style scoped>
.menufold {
    cursor: pointer;
    font-size: 24px;
}

.my-avatar {
    color: #f56a00;
    background-color: #fde3cf;
    cursor: pointer;
    user-select: none;
}

.item {
    margin-bottom: 0;
    cursor: pointer;
}
</style>

