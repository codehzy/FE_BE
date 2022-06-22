<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import io from "socket.io-client";
import { ref } from "vue";

// console.log(navigator.mediaDevices.getUserMedia);

// const handleMedia = () => {
//         navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       })
// }

const inputValue = ref("1");
const sendList = ref<string[]>([])

const url = "http://localhost:3002";
const socket = io(url, {
  transports: ["websocket"],
  path: "/chat",
  reconnection: true,
  reconnectionAttempts: Infinity,
  autoConnect: false,
});

const sendMessage = () => {
  socket.emit("message", { data: inputValue.value });
};

socket.on("message", ({data}) => {
  console.log(`后端响应值`,data);
  sendList.value.push(data)
});

socket.open();

</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <button @click="handleMedia">handleMedia</button> -->
  <input type="text" v-model="inputValue" />
  <button @click="sendMessage">发送</button>
  <ul v-for="(message,index) in sendList" :key="index">
    <li>{{message}}</li>
  </ul>
</template>

<style></style>
