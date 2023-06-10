<template>
   <a-button type="primary" @click="showModal">新增角色</a-button>
        <!-- 新增角色弹窗 -->
        <a-modal v-model:visible="visible" title="新增角色" @cancel="handleCancel" :width="600" centered>
          <template #footer>
            <a-button size="large" key="back" @click="handleCancel">Cancel</a-button>
            <a-button size="large" key="submit" type="primary" :loading="loading" @click="handleOk">ok</a-button>
          </template>
          <a-form>
            <a-form-item v-bind="form.validateInfos.name">
              <a-input size="large" v-model:value="modelRef.name" placeholder="请输入角色名称" />
            </a-form-item>
            <br />
            <a-form-item v-bind="form.validateInfos.description">
              <a-input size="large" v-model:value="modelRef.description" placeholder="请输入角色描述" />
            </a-form-item>
          </a-form>
        </a-modal>
        <!-- 表格内容 -->
        <a-table :columns="columns" :dataSource="roleList" :pagination="pagination" @change="handlePageChange">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operation'">
              <a-space>
                <a-button type="primary" @click="editorRole(record.id)">编辑</a-button>
                <a-button type="danger" @click="deleteRole(record.id)">删除</a-button>
              </a-space>
            </template>
          </template>
        </a-table>
</template>

<script setup>
import { ref, onMounted, reactive, createVNode } from "vue"
import { getRoleList, addRole, getRoledetail, updateRole, deltelRole } from '@/api/login'
import { Form, message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
const roleList = ref([])
const pagination = reactive({
  // 注意这里的 page pageSize 要和接口的请求参数一样 不然分页会有问题
  page: 1, // 当前页码
  pageSize: 10, // 每页显示的条数
  total: 0, // 总条数
})

// 表头信息
const columns = [
  {
    title: '序号',
    width: 100,
    customRender: ({ index }) => {
      //必须和当前的分页数据进行结合
      // 1 -> 1
      // 2 -> (当前页码 - 1 ) * 每页条数 + 1
      return (pagination.page - 1) * pagination.pageSize + index + 1
    }
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 150,
  },
]
// 表格列表数据
const getList = async () => {
  const { total, rows } = await getRoleList(pagination)
  roleList.value = rows
  pagination.total = total
  console.log(total);
}

// 分页
const handlePageChange = (page) => {
  pagination.page = page.current
  pagination.pageSize = page.pageSize
  getList()
}

//弹窗
const loading = ref(false);
const visible = ref(false);

// 表单内容
const modelRef = ref({
  // name: '',
  // description: '',
});

//表单检验规则
const rulesRef = reactive({
  name: [{ required: true, message: '请输入角色名称', trigger: ['change', 'blur'], }],
  description: [{ required: true, message: '请输入角色描述', trigger: ['change', 'blur'], }],
});

// 获取form实例
const form = Form.useForm(modelRef, rulesRef)
const showModal = () => {
  visible.value = true;
};

const handleOk = async () => {
  loading.value = true              // 转圈
  try {
    //表单验证通过
    await form.validate()           //这里不报错 就成功 
    if (modelRef.value.id) {
      await updateRole(modelRef.value)
      message.success('编辑角色成功')  // 提示信息
    } else {
      await addRole(modelRef.value)
      message.success('新增角色成功')  // 提示信息
    }
    handleCancel()                  // 重置表单数据
    getList()                       // 重新获取角色列表数据
    loading.value = false           // 关闭转圈
    visible.value = false;          // 关闭弹窗
  } catch (err) {
    console.log('表单验证不通过：', err);
    loading.value = false           // 关闭转圈
  }
};

const handleCancel = () => {
  modelRef.value = {
    name: '',
    description: '',
  }
  visible.value = false;
  //重置数据
  form.resetFields()
};


// 角色详情信息
const editorRole = async (id) => {
  const roleDetail = await getRoledetail(id)
  modelRef.value = roleDetail
  showModal() // 为了不出现闪烁的问题 先获取数据 再弹出层
}

// 删除角色
const deleteRole = (id) => {

  // console.log(id);
  Modal.confirm({
    title: '确定删除该角色吗?',
    icon: createVNode(ExclamationCircleOutlined),
    centered:true,
    // content: 'xxxxxxxxxxxx',
    async onOk() {
      await deltelRole(id)
      message.success('删除成功！')
      getList()   // 更新数据
    },
    onCancel() { },
  })
}




onMounted(() => getList())


</script>

<style lang="less" scoped>
:deep(.ant-form-item) {
  margin-bottom: 0;
}
</style>
