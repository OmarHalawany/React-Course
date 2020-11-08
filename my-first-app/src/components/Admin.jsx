import React, { Component } from "react";
class Admin extends Component {
  handleAdd = () => {
    this.props.history.push("/productform/new");
  };
  handleEdit = (id) => {
    this.props.history.push("/productform/edit/" + String(id));
  };
  render() {
    return (
      <React.Fragment>
        <h1>Admin</h1>
        <button onClick={this.handleAdd} className="btn btn-primary">
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <i
                    onClick={() => this.handleEdit(p.id)}
                    className="fas fa-edit"
                  ></i>
                </td>
                <td>
                  <i
                    onClick={() => this.props.onDelete(p)}
                    className="fas fa-trash"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Admin;
