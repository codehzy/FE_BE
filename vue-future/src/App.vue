<script setup lang="ts">
import useConnectSocket from "./hook/useConnectSocket";

const { inputValue, sendList, sendMessage } = useConnectSocket();
</script>

<template>
  <input type="text" v-model="inputValue" />
  <button @click="sendMessage">发送</button>
  <ul v-for="(message, index) in sendList" :key="index">
    <li>{{ message }}</li>
  </ul>
</template>

<style></style>
