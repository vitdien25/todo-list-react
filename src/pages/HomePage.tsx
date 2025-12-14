import { useState } from "react";
import { Button, Space, Typography, Card } from "antd";
import { FiPlus } from "react-icons/fi";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import SearchBar from "../components/SearchBar";
import { useAppDispatch } from "../hooks/redux";
import { addTask } from "../store/taskSlice";
import type { Task } from "../types/task";

const { Title } = Typography;

function HomePage() {
  const dispatch = useAppDispatch();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    dispatch(addTask({ ...newTask, completed: false }));
    setIsAddModalVisible(false);
  };

  return (
    <div className="p-4">
      <Card className="task-list__container">
        <div className="task-list__header">
          <Title level={1} className="title">
            Todo List
          </Title>
          <p className="subtitle">Get back to work nikka!</p>
        </div>

        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div className="task-list__actions">
            <div className="search-container">
              <SearchBar />
            </div>
            <Button
              type="primary"
              icon={<FiPlus />}
              onClick={() => setIsAddModalVisible(true)}
              className="add-task-btn add-button"
              size="large"
            >
              Add New Task
            </Button>
          </div>

          <TaskList />
        </Space>

        <TaskForm
          visible={isAddModalVisible}
          onCancel={() => setIsAddModalVisible(false)}
          onSubmit={handleAddTask}
          title="Add New Task"
        />
      </Card>
    </div>
  );
}

export default HomePage;
