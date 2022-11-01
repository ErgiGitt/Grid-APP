import "./App.css"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import Login from "./components/Login/Login"
import TablePage from "./components/TablePage/TablePage"
import ToDoModal from "./components/ToDoModal/ToDoModal"
import { message } from "antd"

const user = {
  username: "Ergi",
  password: "ergi123",
}

function App() {
  const [todos, setTodos] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [modalVisible, setModalVisible] = useState(false)
  const [toDoToEdit, setToDoToEdit] = useState()

  // console.log("username", username) -CL prove nese eshte aktiv-
  // console.log("isAuthenticated", isAuthenticated)
  // console.log("password", password)
  // console.log("todos", todos)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLoginChange = () => {
    if (username === user.username && password === user.password) {
      message.success("Logged in successfully")
      setIsAuthenticated(true)
    } else message.error("Wrong credentials")
  }

  const getApiData = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/"
    )
    setTodos(response.data)
  }

  const deleteTodos = async (idToDelete) => {
    await axios
      .delete("https://jsonplaceholder.typicode.com/todos/" + idToDelete)
      .then(() => {
        setTodos(todos.filter((element) => element.id !== idToDelete))
        console.log(`U Fshi(deleted)`)
      })
      .catch(() => {
        console.log(`Error Nuk U Fshi`)
      })
  }

  const handleSave = async (title, completed) => {
    if (toDoToEdit) {
      await axios
        .put("https://jsonplaceholder.typicode.com/todos/" + toDoToEdit.id, {
          title,
          completed,
        })
        .then((res) => {
          const updatedToDo = res.data
          setToDoToEdit()
          setTodos(
            todos.map((element) =>
              element.id == updatedToDo.id ? updatedToDo : element
            )
          )
        })
    } else
      await axios
        .post("https://jsonplaceholder.typicode.com/todos/", {
          title,
          completed,
        })
        .then((res) => {
          const newToDo = res.data
          setTodos([...todos, newToDo])
        })

    setModalVisible(false)
  }

  const handleEdit = (toDo) => {
    setToDoToEdit(toDo)
    setModalVisible(true)
  }

  useEffect(() => {
    getApiData()
  }, [])

  return (
    <div className="app">
      {isAuthenticated === true && (
        <TablePage
          todos={todos}
          deleteTodos={deleteTodos}
          setModalVisible={setModalVisible}
          handleEdit={handleEdit}
        />
      )}
      {isAuthenticated === false && (
        <Login
          username={username}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          handleLoginChange={handleLoginChange}
        />
      )}
      <ToDoModal
        visible={modalVisible}
        setVisible={setModalVisible}
        toDo={toDoToEdit}
        handleSave={handleSave}
      />
    </div>
  )
}

export default App
