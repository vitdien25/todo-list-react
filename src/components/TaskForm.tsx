import { useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";
import type { Task } from "../types/task";

interface TaskFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Omit<Task, "id"> | Task) => void;
  initialValues?: Task;
  title: string;
}

function TaskForm({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  title,
}: TaskFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (initialValues) {
        onSubmit({ ...values, id: initialValues.id });
      } else {
        onSubmit(values);
      }
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      className="task-form"
      title={title}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {initialValues ? "Update" : "Add"} Task
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter task title!" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: "Please enter task content!" }]}
        >
          <Input.TextArea placeholder="Enter task content" rows={4} />
        </Form.Item>

        {initialValues && (
          <Form.Item name="completed" valuePropName="checked">
            <label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input type="checkbox" />
              <span>Mark as completed</span>
            </label>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default TaskForm;
