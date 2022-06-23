<script setup lang="ts">
import useConnectSocket from "../../hook/useConnectSocket";

const { inputValue, sendList, sendMessage } = useConnectSocket();

function getImageUrl(name: string, suffix: string) {
  console.log(import.meta.url);

  return new URL(`../../assets/images/${name}.${suffix}`, import.meta.url).href;
}
</script>

<template>
  <h2>
    <img :src="getImageUrl('logo', 'gif')" alt="" class="nice" />
    socket聊天
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
