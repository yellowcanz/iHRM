<template>
  <a-layout class="app-layout">
    <a-layout-sider :collapsed="collapsed" collapsible :trigger="null">
      <div class="logo">{{ collapsed ? 'HR' : 'HRSASS' }}</div>
      <sideBar></sideBar>
    </a-layout-sider>
    <a-layout class="right-layout">
      <a-layout-header>
        <navBar v-model:collapsed="collapsed"></navBar>
      </a-layout-header>
      <a-layout-content>
        <RouterView></RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import sideBar from './components/side-bar.vue';
import navBar from './components/nav-bar.vue';
const collapsed = ref(false)

</script>

<style scoped lang="less">
.app-layout {
  min-height: 100vh;
  display: flex;

  .ant-layout-sider {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100vh;

    .logo {
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #fff;
      font-size: 24px;
      text-shadow: 2px 2px 4px #666;
      transform: skewX(-10deg);
    }
  }

  .right-layout {
    flex: 1;
    height: 100vh;
    overflow-y: auto;
  }

  .ant-layout-header {
    background-color: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .anticon {
      font-size: 20px;
      cursor: pointer;
    }
  }
}

.my-avatar {
  color: #f56a00;
  background-color: #fde3cf;
  cursor: pointer;
}

.my-select {
  margin: -5px -16px;

  .item {
    padding: 5px 20px;
    margin-bottom: 0 !important;
    color: #666;

    &:hover {
      background-color: #fafafa;
      cursor: pointer;
    }
  }
}
</style>