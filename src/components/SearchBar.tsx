import { Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setSearchTerm } from "../store/taskSlice";

function SearchBar() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.tasks.searchTerm);

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <Input
      className="task-list__search"
      placeholder="Search tasks by title or content..."
      prefix={<FiSearch />}
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      size="large"
      allowClear
    />
  );
}

export default SearchBar;
