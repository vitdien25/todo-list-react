import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../store/authApi";
import { setCredentials } from "../store/authSlice";
import { Button, Card, Form, Input, message } from "antd";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // Store tokens with consistent keys
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      console.log("Login successful:", data);

      // Update Redux state
      dispatch(
        setCredentials({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        })
      );

      navigate("/home");
    },
    onError: (error) => {
      message.error("Login failed:" + (error as Error).message);
    },
  });

  return (
    <Card
      title={<div className="login-card-title">Login</div>}
      style={{ width: 350, margin: "100px auto" }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={mutate}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;
