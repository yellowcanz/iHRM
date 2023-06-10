<template>
  <div class="container">
    <a-tabs class="setting-tab" v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="角色设置">
        <role></role>
      </a-tab-pane>
      <a-tab-pane key="2" tab="公司设置" force-render>
        <company></company>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import role from './setting/role.vue'
import company from './setting/company.vue'
import { ref } from 'vue'
const activeKey = ref('1')
</script>

<style lang="less" scoped>
.container {
  padding: 16px;

  .setting-tab {
    background-color: #fff;
    padding: 16px;

    :deep(.ant-table-thead>tr>th) {
      font-weight: 900 !important;
      font-size: larger !important;
    }
  }

  :deep(.ant-table-wrapper) {
    margin-top: 16px;
  }
}

:deep(.ant-modal-body) {
  padding: 48px;
}

// :deep(.ant-form-item) {
//   margin-bottom: 0;
// }
</style>
