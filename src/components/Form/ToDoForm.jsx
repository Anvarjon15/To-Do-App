import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

export class ToDoForm extends Component {
  render() {
    const {todo,handleTodo,submit,selected,validated} = this.props;
    return (
      <Form validated={validated} noValidate className="w-50 m-auto" onSubmit={submit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>To Do Name</Form.Label>
          <Form.Control value={todo.name} required type="text" placeholder="Name"  onChange={handleTodo}/>
          <Form.Control.Feedback type="invalid">Please fill !</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="date" className="mb-3">
          <Form.Label>To Do Date</Form.Label>
          <Form.Control value={todo.date} required type="date"  onChange={handleTodo}/>
        </Form.Group>

        <Form.Group controlId="importance" className="mb-3" >
          <Form.Label>To Do Label</Form.Label>
          <Form.Select value={todo.importance} onChange={handleTodo}>
            <option value="high">High</option>
            <option value="middle">Middle</option>
            <option value="low">Low</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" className="w-100"> {selected === null ? "ADD" : "SAVE"}</Button>
      </Form>
    );
  }
}

export default ToDoForm;
