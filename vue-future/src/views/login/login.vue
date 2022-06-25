<template>
  <div class="login">
    <div class="login-container">
      <div class="logo">
        <img :src="getImageUrl('logo', 'gif')" />
        <span class="logo-name">小何音乐聊天室</span>
      </div>
      <div class="form">
        <a-form
          :model="formState"
          name="basic"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="email"
            :rules="[{ required: true, message: 'Please input your email!' }]"
          >
            <a-input
              v-model:value="formState.email"
              placeholder="请输入用户名"
            />
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="请输入密码"
            />
          </a-form-item>

          <div class="user-setting"><a>注册</a> <a>忘记密码</a></div>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLogin } from "./hooks/useLogin";

const getImageUrl = (name: string, suffix: string) => {
  return new URL(`../../assets/images/${name}.${suffix}`, import.meta.url).href;
};

const { formState, onFinish, onFinishFailed } = useLogin();
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background: url("../../assets/images/banner_login.gif");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;

  &-container {
    margin-top: 100px;
    .logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 100px;

      img {
        width: 80px;
        height: 80px;
        border-radius: 8px;
      }

      &-name {
        font-size: 14px;
        color: #fff;
        margin-top: 10px;
      }
    }

    .form {
      margin-top: 30px;

      .user-setting {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
