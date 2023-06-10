<template>
    <a-menu mode="inline" theme="dark" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-for="(item) of routes" :key="item.path">
            <router-link :to="item.path">
                <component :is="item.meta.icon"></component>
                <span>{{ item.meta.title }}</span>
            </router-link>
        </a-menu-item>
    </a-menu>
</template>

<script setup>

import { computed, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const routes = computed(() => {
    return router.options.routes[1].children
})
const selectedKeys = ref([routes.value[0].path])
const path = routes.value.find(item => item.path == route.path.slice(1))

onMounted(() => {
    // selectedKeys.value = [routes.value[0].path]; // 默认选中第一个路由菜单项
    selectedKeys.value = [path.path]; // 默认选中第一个路由菜单项
})

</script>

<style lang="less" module></style>
