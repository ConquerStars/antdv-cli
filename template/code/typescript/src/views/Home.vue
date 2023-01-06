<script setup lang="ts">
import { reactive, ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { defaultDateFormat } from '@/utils/config'
import type { Goods } from '@/api/goods'
import { Pagination } from '@/utils/config'
import { FetchGoodsList } from '@/api/goods'
import { message } from 'ant-design-vue'

const dateFormat = ref(defaultDateFormat)
const formState = reactive({
  title: '',
  date: [Dayjs, Dayjs]
})
const ranges = {
  最近一周: [dayjs().subtract(7, 'day'), dayjs()],
  最近一月: [dayjs().subtract(1, 'month'), dayjs()],
  最近三月: [dayjs().subtract(3, 'month'), dayjs()],
  最近一年: [dayjs().subtract(1, 'year'), dayjs()]
}

const search = () => {
  pagination.current = 1
  getList()
}

const pagination = reactive(new Pagination({ pageSize: 50 }))
const loading = ref(false)
const columns = [
  {
    key: 'index',
    width: 50,
    align: 'center'
  },
  {
    title: '主题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true
  },
  {
    title: '状态',
    width: 100,
    dataIndex: 'status',
    key: 'status',
    align: 'center'
  },
  {
    title: '发起人',
    width: 100,
    dataIndex: 'user',
    key: 'user',
    ellipsis: true,
    align: 'center'
  },
  {
    title: '总数',
    width: 90,
    dataIndex: 'count',
    key: 'count',
    align: 'center'
  },
  {
    title: '时间',
    width: 180,
    dataIndex: 'startTime',
    key: 'startTime',
    align: 'center'
  },
  {
    title: '操作',
    width: 100,
    key: 'operate',
    align: 'center'
  }
]
const dataSource = ref<Goods[]>([])
const getList = (pg?: Pagination) => {
  if (loading.value) return
  loading.value = true
  pg && Object.assign(pagination, pg)
  const startDate = formState.date?.[0]?.valueOf()
  const endDate = formState.date?.[1]?.valueOf()
  FetchGoodsList({
    queryType: 0,
    queryValue: formState.title,
    startDate: startDate ? dayjs(Number(startDate)).startOf('day').valueOf() : '',
    endDate: endDate ? dayjs(Number(endDate)).endOf('day').valueOf() : '',
    page: pagination.current,
    size: pagination.pageSize
  })
    .then(({ data }) => {
      const result = data.data ?? {}
      dataSource.value = result.result ?? []
      pagination.total = result.total ?? 0
    })
    .catch(({ msg }) => {
      message.error(msg)
    })
    .finally(() => {
      loading.value = false
    })
}
search()
</script>

<template>
  <DefaultLayout class="home">
    <a-form layout="inline" :model="formState" @finish="search">
      <a-form-item>
        <a-input v-model:value="formState.title" placeholder="主题" @keydown.enter="search" allowClear />
      </a-form-item>
      <a-form-item label="时间">
        <a-range-picker v-model:value="formState.date" :ranges="ranges" @change="search" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-item>
      <a-form-item>
        <a-button @click="getList()">刷新</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      :loading="loading"
      :scroll="{ y: 'calc(100vh - 261px)' }"
      size="small"
      @change="getList"
    >
      <template #bodyCell="{ column, record, index }">
        <span v-if="column.key === 'index'">
          {{ ((pagination.current ?? 1) - 1) * pagination.pageSize + index + 1 }}
        </span>

        <template v-if="column.key === 'status'">
          <a-tag v-if="record.status === 1" color="blue"> 执行中 </a-tag>
          <a-tag type="info" v-else>已结束</a-tag>
        </template>
        <template v-if="column.key === 'user'">
          {{ record?.user?.realName }}
        <span v-if="column.key === 'startTime'">
          {{ record.startTime && dayjs(record.startTime).format(dateFormat) }}
        </span>
        <a-button shape="round" size="small" v-if="column.key === 'operate'"> 详情 </a-button>
      </template>
    </a-table>
  </DefaultLayout>
</template>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  .ant-table-wrapper {
    flex: 1;
    margin-top: 14px;
    :deep(.ant-table-body) {
      height: calc(100vh - 261px);
      overflow-y: auto;
    }
  }
}
</style>
