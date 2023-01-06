<script setup lang="ts">
import { reactive, ref } from 'vue'
import { doLogin } from '@/api/account'
import { usernameRegexp } from '@/utils/regExp'
import { account } from '@/stores'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import ChangePwd from '@/components/ChangePwd.vue'

const router = useRouter()
const accountStore = account()

const changePwdVisible = ref(false)

const formState = reactive({
  username: '',
  password: ''
})
const formRules = {
  username: [
    {
      required: true,
      pattern: usernameRegexp,
      trigger: ['change', 'blur'],
      message: '请输入字母、数字、_的组合（6位及以上）'
    }
  ],
  password: [
    {
      required: true,
      min: 6,
      trigger: ['change', 'blur'],
      message: '请输入密码（6位及以上）'
    }
  ]
}

const loading = ref(false)
const submit = () => {
  loading.value = true
  doLogin(formState)
    .then(({ data }) => {
      router.push('/home')
      accountStore.setUserInfo(data)
      Object.assign(formState, {
        username: '',
        password: ''
      })
    })
    .catch(({ msg }) => {
      message.error(msg)
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 3000)
    })
}
// function execError() {
//   throw { msg: 'test error' }
// }
</script>

<template>
  <div class="title">
    <img class="logo" src="@/assets/img/logo.png" alt="logo" />
  </div>
  <a-form :model="formState" :rules="formRules" @finish="submit" v-show="!changePwdVisible">
    <a-form-item name="username">
      <a-input placeholder="用户名/手机号" v-model:value="formState.username" />
    </a-form-item>
    <a-form-item name="password">
      <a-input-password placeholder="密码" v-model:value="formState.password" />
    </a-form-item>
    <a-form-item class="forget-pwd-btn">
      <a @click="changePwdVisible = true">忘记密码？</a>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit" type="primary" class="sub-btn" :loading="loading"> 登录 </a-button>
    </a-form-item>
    <!-- <a-form-item>
      <a-button type="danger" @click="execError"> error </a-button>
    </a-form-item> -->
  </a-form>
  <ChangePwd v-show="changePwdVisible" @done="changePwdVisible = false">
    <a @click="changePwdVisible = false">返回登录</a>
  </ChangePwd>
</template>

<style lang="less" scoped>
.title {
  text-align: center;
  padding: 5% 0;
}
.ant-form {
  width: 300px;
  margin: 0 auto;
}
</style>
