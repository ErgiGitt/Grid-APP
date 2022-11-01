import { Checkbox, Input, Modal } from "antd"
import { useEffect, useState } from "react"

const ToDoModal = ({ visible, setVisible, toDo, handleSave }) => {
  const [title, setTitle] = useState("")
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    setTitle(toDo?.title)
  }, [toDo])

  useEffect(() => {
    setTitle(toDo?.title || "")
    setCompleted(toDo?.checked || "")
  }, [visible])

  return (
    <Modal
      title={`${toDo ? "Edit" : "Add"} ToDo`}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={() => handleSave(title, completed)}
      okText="Save"
    >
      <div>Title</div>
      <Input
        value={title}
        placeholder="Title"
        onChange={(event) => setTitle(event.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Checkbox
        checked={completed}
        onChange={(event) => setCompleted(event.target.checked)}
      >
        Completed
      </Checkbox>
    </Modal>
  )
}

export default ToDoModal
