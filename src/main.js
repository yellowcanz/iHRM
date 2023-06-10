
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { HomeOutlined,SettingOutlined,MenuUnfoldOutlined,LockOutlined,MenuFoldOutlined } from '@ant-design/icons-vue'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import pluginState from 'pinia-plugin-persistedstate'


import 'ant-design-vue/dist/antd.css';
import './permission.js'



const app = createApp(App)

app.use(router)
app.use(Antd)
app.use(createPinia().use(pluginState))

app.component('SettingOutlined',SettingOutlined)
app.component('HomeOutlined',HomeOutlined)
app.component('MenuUnfoldOutlined',MenuUnfoldOutlined)
app.component('MenuFoldOutlined',MenuFoldOutlined)
app.component('LockOutlined',LockOutlined)


app.mount('#app')
