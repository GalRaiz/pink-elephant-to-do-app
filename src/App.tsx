import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PinkELogo from "./assets/pinkeE-horizontal.svg";
import { IUser, ITodo, IPost } from "../src/store/types.ts";
import Card from "./components/Card.tsx";
import Modal from "./components/Modal.tsx";
import PinkElephantLoader from "./components/Loader.tsx";
import SearchBar from "./components/SearchBar.tsx";
import Button from "./components/Button.tsx";
import EmptyState from "./components/EmptyState.tsx";
import ThemeToggle from "./components/ThemeToggle";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersResponse, todosResponse, postsResponse] = await Promise.all(
          [
            axios.get<IUser[]>(USERS_URL),
            axios.get<ITodo[]>(TODOS_URL),
            axios.get<IPost[]>(POSTS_URL),
          ]
        );
        setUsers(usersResponse.data);
        setTodos(todosResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch data only once when the component mounts

  const handleUserCardClick = (user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <div className="App-logo-container">
        <img src={PinkELogo} className="App-logo" alt="Pink Elephant Logo" />
        <ThemeToggle />
      </div>

      {loading ? (
        <PinkElephantLoader />
      ) : (
        <>
          <header className="App-header">
            <h1>Users List</h1>
          </header>
          <div className="App-search-bar">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <Button
              type="primary"
              btnText="Add New User"
              onClick={() =>
                alert("Add New User functionality not implemented")
              }
            />
          </div>
          <div className="user-list-container">
            <div className="user-list">
              {filteredUsers.length ? (
                filteredUsers.map((user) => {
                  const isAllTasksCompleted = todos
                    .filter((todo) => todo.userId === user.id)
                    .every((todo) => todo.completed);
                  return (
                    <Card
                      key={user.id}
                      type="user"
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      clickHandler={() => handleUserCardClick(user)}
                      isAllTasksCompleted={isAllTasksCompleted}
                    />
                  );
                })
              ) : (
                <EmptyState />
              )}
            </div>
          </div>

          {selectedUser && isModalOpen && (
            <Modal
              onClose={closeModal}
              title={`Todos & Posts for ${selectedUser.name}`}
              todosData={todos.filter(
                (todo) => todo.userId === selectedUser.id
              )}
              postsData={posts.filter(
                (post) => post.userId === selectedUser.id
              )}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
