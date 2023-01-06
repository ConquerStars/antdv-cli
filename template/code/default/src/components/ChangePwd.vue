<script setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { getCaptcha, resetPasswordByCaptcha, CaptchaMode } from '@/api/account'
import { phoneRegexp, captchaRegexp } from '@/utils/regExp'

const emit = defineEmits(['done'])

const loading = ref(false)
const formRef = ref()
const formState = reactive({
  password: '',
  password_confirm: '',
  receiver: '',
  code: ''
})
const trigger = ['blur', 'change']
const formRules = {
  password: [
    {
      required: true,
      validator: (rule, value) => {
        if (value.length < 6) {
          return Promise.reject('请输入密码（6位及以上）')
        } else {
          return Promise.resolve()
        }
      },
      trigger
    }
  ],
  password_confirm: [
    {
      required: true,
      validator: (rule, value) => {
        if (!value) {
          return Promise.reject('请输入确认密码，与新密码一致')
        } else if (value != formState.password) {
          return Promise.reject('两次输入密码不一致')
        } else {
          return Promise.resolve()
        }
      },
      trigger
    }
  ],
  receiver: [
    {
      required: true,
      pattern: phoneRegexp,
      trigger,
      message: '请输入正确的手机号码'
    }
  ],
  code: [
    {
      required: true,
      pattern: captchaRegexp,
      trigger,
      message: '请输入6位验证码'
    }
  ]
}
const timer = reactive({
  id: undefined,
  text: '发送',
  countdown: 0,
  defaultCountdown: 60
})
const sendCaptcha = async () => {
  try {
    await formRef.value.validate('receiver')
    await getCaptcha({ receiver: formState.receiver, mode: CaptchaMode.RESET_PASSWORD })
    Object.assign(timer, {
      countdown: timer.defaultCountdown,
      text: `${timer.defaultCountdown}s`,
      id: setInterval(() => {
        if (timer.countdown > 1) {
          timer.text = `${--timer.countdown}s`
        } else {
          clearInterval(timer.id)
          timer.countdown = 0
          timer.text = '发送'
        }
      }, 1000)
    })
  } catch ({ msg }) {
    msg && message.error(msg)
  }
}
const submit = () => {
  loading.value = true
  resetPasswordByCaptcha(formState)
    .then(() => {
      formRef.value.resetFields()
      message.success('修改密码成功！')
      emit('done', formState)
    })
    .catch(({ msg }) => {
      message.error(msg)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <a-form :model="formState" :rules="formRules" @finish="submit" ref="formRef" class="forget-pwd">
    <a-form-item name="password">
      <a-input-password placeholder="新密码" v-model:value="formState.password" />
    </a-form-item>
    <a-form-item name="password_confirm">
      <a-input-password placeholder="确认密码" v-model:value="formState.password_confirm" />
    </a-form-item>
    <a-form-item name="receiver">
      <a-input placeholder="手机号码" v-model:value="formState.receiver" />
    </a-form-item>
    <a-form-item name="code">
      <a-input-group compact>
        <a-input placeholder="验证码" v-model:value="formState.code" />
        <a-button @click="sendCaptcha" :disabled="timer.countdown > 0">
          {{ timer.text }}
        </a-button>
      </a-input-group>
    </a-form-item>
    <a-form-item>
      <div class="actions">
        <a-button html-type="submit" type="primary" class="sub-btn" :loading="loading">更改密码</a-button>
        <slot> </slot>
      </div>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>
.forget-pwd {
  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-input-group {
    display: flex;
  }
}
</style>
