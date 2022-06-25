import { message, notification } from "ant-design-vue";
import { useRouter } from "vue-router";
import service from "../../../api/request";
import { FormState, loginUser } from "../types/loginForm";

export function useLogin() {
  const router = useRouter();

  const formState = reactive<FormState>({
    email: "",
    password: "",
    code: "",
  });

  const onFinish = async (values: any) => {
    try {
      const {
        code,
        data: { token },
      } = (await service.post("/auth/login", {
        email: formState.email,
        password: formState.password,
      })) as loginUser;

      if (code === "200") {
        notification.success({
          message: "登录成功",
          description: "欢迎回来",
        });
        // 将token存入本地
        localStorage.setItem("token", token);
        // 跳转到聊天主页
        router.replace("/chatUser");
      } else {
        message.error("用户名或者密码错误");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("请根据提示正确输入", errorInfo);
  };

  return { formState, onFinish, onFinishFailed };
}
