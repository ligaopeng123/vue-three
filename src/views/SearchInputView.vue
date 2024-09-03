<template>
  <a-select
    class="container"
    v-model:value="state.value"
    allow-clear
    mode="multiple"
    placeholder="清输入查询内容"
    style="width: 100%; height: 32px"
    :filter-option="false"
    :not-found-content="state.fetching ? undefined : null"
    :options="state.data"
    @search="getData"
    @change="onChange"
    :field-names="{ label: 'login', value: 'id' }"
  >
    <template v-if="state.fetching" #notFoundContent>
      <a-spin size="small" />
    </template>
  </a-select>
</template>
<script lang="ts" setup>
import { reactive, watchEffect } from 'vue'
import { get } from '@gaopeng123/fetch'
import { debounce } from '@gaopeng123/utils'

const state = reactive({
  data: [],
  value: [],
  fetching: false
})

let abortController = null

const getData = debounce((value: string) => {
  if (abortController) {
    try {
      abortController.abort('有新的请求，取消上一个请求')
    } catch (error) {
      console.log(error)
    }
  }
  abortController = new AbortController()
  state.data = []
  state.fetching = true
  get(`https://api.github.com/search/users`, {
    params: { q: value },
    abortController: abortController
  })
    .then((d) => {
      state.data = d.items
      state.fetching = false
    })
    .catch((e) => {
      state.fetching = false
      console.log(e)
    })
})

const onChange = (v) => {}

watchEffect(() => {
  // 执行相应的操作
  if (state.value.length <= 0) {
    state.data = []
    state.fetching = false
  }
})
</script>

<style scoped>
.container {
  padding: 16px;
}
</style>
