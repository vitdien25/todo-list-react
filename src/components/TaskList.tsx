import { useState } from "react";
import { Table, Tag, Button, Space, Popconfirm } from "antd";
import type { TableProps } from "antd";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import type { Task } from "../types/task";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { deleteTask, toggleTaskComplete, updateTask } from "../store/taskSlice";
import TaskForm from "./TaskForm";

function TaskList() {
  const dispatch = useAppDispatch();
  const { filteredTasks } = useAppSelector((state) => state.tasks);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleTaskComplete(id));
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = (values: Task | Omit<Task, "id">) => {
    const updatedTask =
      "id" in values ? values : { ...values, id: editingTask!.id };
    dispatch(updateTask(updatedTask));
    setIsEditModalVisible(false);
    setEditingTask(undefined);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingTask(undefined);
  };

  const columns: TableProps<Task>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Task) => (
        <span
          style={{
            textDecoration: record.completed ? "line-through" : "none",
            color: record.completed ? "#999" : "inherit",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (text: string, record: Task) => (
        <span
          style={{
            textDecoration: record.completed ? "line-through" : "none",
            color: record.completed ? "#999" : "inherit",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) =>
        completed ? (
          <Tag
            color="green"
            icon={<FiCheck />}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            Completed
          </Tag>
        ) : (
          <Tag
            color="orange"
            icon={<FiX />}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            Pending
          </Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Task) => (
        <Space size="small" className="task-actions">
          <Button
            type={record.completed ? "default" : "primary"}
            size="small"
            icon={record.completed ? <FiX /> : <FiCheck />}
            onClick={() => handleToggleComplete(record.id)}
            title={record.completed ? "Mark as pending" : "Mark as done"}
          >
            {record.completed ? "Pending" : "Done"}
          </Button>
          <Button
            type="default"
            size="small"
            icon={<FiEdit />}
            onClick={() => handleEdit(record)}
            title="Edit task"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="default"
              danger
              size="small"
              icon={<FiTrash2 />}
              title="Delete task"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        className="task-table"
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} tasks`,
        }}
        rowClassName={(record) =>
          record.completed ? "task-row--completed" : ""
        }
      />

      <TaskForm
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        onSubmit={handleEditSubmit}
        initialValues={editingTask}
        title="Edit Task"
      />
    </div>
  );
}

export default TaskList;
