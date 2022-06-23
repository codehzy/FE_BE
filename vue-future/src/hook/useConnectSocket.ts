import useInitSocket from "./useInitSocket";

export default function useConnectSocket() {
  // 初始化socket
  const { socket } = useInitSocket();

  const inputValue = ref("1");
  const sendList = ref<string[]>([]);

  const sendMessage = () => {
    socket.emit("message", { data: inputValue.value });
  };

  socket.on("message", ({ data }) => {
    console.log(`后端响应值`, data);
    sendList.value.push(data);
  });

  socket.open();

  return { inputValue, sendList, sendMessage };
}
