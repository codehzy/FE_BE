<script setup lang="ts">
import useConnectSocket from "../../hook/useConnectSocket";
import { useRouter } from "vue-router";
import { message, notification } from "ant-design-vue";
const router = useRouter();

function getImageUrl(name: string, suffix: string) {
  return new URL(`../../assets/images/${name}.${suffix}`, import.meta.url).href;
}

const { inputValue, sendList, sendMessage } = useConnectSocket();

const logout = () => {
  localStorage.removeItem("token");
  router.replace("/");
  notification.success({
    message: "注销成功",
    description: "欢迎离开",
  });
};
</script>

<template>
  <h2>
    <img :src="getImageUrl('logo', 'gif')" alt="" class="nice" />
    socket聊天
    <a-button type="primary" @click="logout">退出登录</a-button>
  </h2>
  <input type="text" v-model="inputValue" />
  <button @click="sendMessage">发送</button>
  <ul v-for="(message, index) in sendList" :key="index">
    <li>{{ message }}</li>
  </ul>
</template>

<style lang="scss">
.nice {
  display: inline-block;
  width: 30px;
  height: 30px;
}
</style>
