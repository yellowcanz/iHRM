<template>
  <div>
    <div class="work-header">
      <a-avatar src="https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640" :size="72"></a-avatar>
      <div class="center">
        <p>早安, {{userInfoStores.username}}, 开始您一天的工作吧</p>
        <p>今日晴, 20℃ - 32℃</p>
      </div>
      <div class="right">
        <p>待办</p>
        <p>2/10</p>
      </div>
      <div class="right">
        <p>项目</p>
        <p>8</p>
      </div>
      <div class="right">
        <p>团队</p>
        <p>300</p>
      </div>
    </div>
    <a-row style="padding: 16px">
      <a-col class="gutter-row" :span="16">
        <a-card title="最新动态" style="margin-right: 16px">
          <template #extra>
            <a-button type="link" size="small">更多</a-button>
          </template>
          <a-list item-layout="horizontal" :data-source="dynamicInfoItems">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #description>
                    {{ item.date }}
                  </template>
                  <template #title> {{ item.name }} <span v-html="item.desc"> </span> </template>
                  <template #avatar>
                    <a-avatar :src="item.avatar" :size="30" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>

          <!-- <a-list class="demo-loadmore-list" :loading="initLoading" item-layout="horizontal" :data-source="list">
            <template #loadMore>
              <div v-if="!initLoading && !loading"
                :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                <a-button @click="onLoadMore">loading more</a-button>
              </div>
            </template>
            <template #renderItem="{ item }">
              <a-list-item>
                <template #actions>
                  <a key="list-loadmore-edit">edit</a>
                  <a key="list-loadmore-more">more</a>
                </template>
                <a-skeleton avatar :title="false" :loading="!!item.loading" active>
                  <a-list-item-meta
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team">
                    <template #title>
                      <a href="https://www.antdv.com/">{{ item.name.last }}</a>
                    </template>
                    <template #avatar>
                      <a-avatar :src="item.picture.large" />
                    </template>
                  </a-list-item-meta>
                  <div>content</div>
                </a-skeleton>
              </a-list-item>
            </template>
          </a-list> -->

        </a-card>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <a-card class="imgbox">
          <!-- <img src="https://img1.baidu.com/it/u=848178330,1897186311&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500" alt="" /> -->
          <!-- <img src="https://img0.baidu.com/it/u=3798579065,1653988178&fm=253&fmt=auto&app=138&f=JPEG?w=909&h=500" alt="" /> -->
          <img src="https://img1.baidu.com/it/u=2282319388,3537390997&fm=253&fmt=auto&app=138&f=JPG?w=1500&h=500" alt="" />
        </a-card>
        <a-card title="部门分布" style="margin-top: 16px">
          <div id="radar" style="height: 340px"></div>
        </a-card>
      </a-col>
    </a-row>
    <div class="work-dynamic"></div>
  </div>
</template>
<script setup>
// import { onMounted, ref, nextTick } from 'vue';
// const count = 6;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
// const initLoading = ref(true);
// const loading = ref(false);
// const data = ref([]);
// const list = ref([]);
// onMounted(() => {
//   fetch(fakeDataUrl)
//     .then(res => res.json())
//     .then(res => {
//       initLoading.value = false;
//       data.value = res.results;
//       list.value = res.results;
//     });
// });

// const onLoadMore = () => {
//   loading.value = true;
//   list.value = data.value.concat(
//     [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
//   );
//   fetch(fakeDataUrl)
//     .then(res => res.json())
//     .then(res => {
//       const newData = data.value.concat(res.results);
//       loading.value = false;
//       data.value = newData;
//       list.value = newData;
//       nextTick(() => {
//         // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
//         // In real scene, you can using public method of react-virtualized:
//         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
//         window.dispatchEvent(new Event('resize'));
//       });
//     });
// };

import { list as dynamicInfoItems } from './data'
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import  useToken  from '@/stores/token.js';
const { userInfoStores } = useToken()


onMounted(() => {
  const radar = echarts.init(document.getElementById('radar'))
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '技术部' },
          { value: 735, name: '营销部' },
          { value: 580, name: '后勤部' },
          { value: 484, name: '总裁办' },
          { value: 300, name: '客服部' }
        ]
      }
    ]
  }
  radar.setOption(option)
})
</script>
<style lang="less" scoped>
.work-header {
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-top: 1px solid #e4e4e4;
  align-items: center;

  .center {
    flex: 1;
    padding-left: 20px;

    p {
      &:first-child {
        font-size: 20px;
      }

      &:last-child {
        color: #666;
      }
    }
  }

  .right {
    width: 80px;
    padding: 10px;
    text-align: right;

    p {
      &:first-child {
        color: #666;
      }

      &:last-child {
        font-size: 20px;
      }
    }
  }

  p {
    margin: 0;
  }
}
.imgbox{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  img{
    width: 100%;
  }
}

.work-dynamic {
  display: flex;
}
</style>