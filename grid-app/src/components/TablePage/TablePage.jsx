import { Button, Table } from "antd"
import "./TablePage.css"

const TablePage = ({ todos, deleteTodos, setModalVisible, handleEdit }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (_, element) =>
        element.completed === true ? "Completed" : "Not Completed",
    },
    {
      title: "Action",
      key: "action",
      render: (_, element) => (
        <div>
          <Button
            onClick={() => handleEdit(element)}
            style={{ marginRight: 10 }}
          >
            Edit
          </Button>
          <Button danger onClick={() => deleteTodos(element.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="table-page">
      <Button
        className="addBtn"
        type="primary"
        onClick={() => setModalVisible(true)}
      >
        Add
      </Button>
      <Table columns={columns} dataSource={todos}></Table>
    </div>
  )
}

export default TablePage
