import React, { Component, createRef } from "react";
import { Container, Tab, Tabs} from "react-bootstrap";
import { ToDoForm } from "./../../components/Form/ToDoForm";
import { ToDoHeader } from "./../../components/Header/ToDoHeader";
import { ToDoCard } from "./../../components/Card/ToDoCard";
import { Footer } from "./../../components/Footer/Footer";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.searchRef = createRef();
    this.state = {
      activeTab: "all",
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      todo: {
        name: "",
        date: new Date().toISOString().split("T")[0],
        importance: "high",
        done: false,
      },
      selected: null,
      search: "",
      importance:"all",
      validated: false
    };
  }
  render() {
    const { activeTab, todos, todo, selected, search, importance,validated } = this.state;
    const handleSearch = () => {
      this.setState({
        search: this.searchRef.current.value.trim().toLowerCase(),
      });
    };

    const changeTab = (key) => {
      this.setState({ activeTab: key });
    };

    const handleTodo = (e) => {
      this.setState({ todo: { ...todo, [e.target.id]: e.target.value } });
    };

    const submit = (e) => {
      e.preventDefault();
      if(e.target.checkValidity()) {
        let newTodos;
        let NewTodo = { ...todo, id: v4() };
        if (selected === null) {
          newTodos = [...todos, NewTodo];
          toast.success('Added successfully' ,{autoClose:1000})
        } else {
          newTodos = todos.map((todo) => {
            if (todo.id === selected) {
              return NewTodo;
            }
            return todo;
          });
          toast.info('Edited succefully',{autoClose:1000})
        }
        localStorage.setItem("todos", JSON.stringify(newTodos));
        this.setState({
          todos: newTodos,
          todo: {
            name: "",
            date: new Date().toISOString().split("T")[0],
            importance: "high",
            done: false,
          },
          selected: null,
          validated: false
        });
      } else{
        this.setState({validated:true});
      }
    };

    const editTodos = (id) => {
      const todo = todos.find((todo) => todo.id === id);
      this.setState({ todo, selected: id });
    };

    const deletTodos = (id) => {
      let newTodos = todos.filter((todo) => todo.id !== id);
      this.setState({ todos: newTodos });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const misDone = (id) => {
      let newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.done = true;
        }
        return todo;
      });
      this.setState({ todos: newTodos });
      localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const handleImportancy = (e) => {
      this.setState({importance: e.target.value });
    };

    let allTodos = todos.filter((todo) =>
      todo.name.toLowerCase().includes(search)
    );

    if (importance !== "all") {
      allTodos = allTodos.filter((todo) => todo.importance === importance);
    }

    console.log(importance);

    const doneTodo = allTodos.filter((todo) => todo.done);
    const undoneTodo = allTodos.filter((todo) => !todo.done);
    return (
      <Container>
        <ToastContainer/>
        <ToDoForm
        validated={validated}
          selected={selected}
          todo={todo}
          handleTodo={handleTodo}
          submit={submit}
        />
        <ToDoHeader
          importance={importance}
          handleImportancy={handleImportancy}
          searchRef={this.searchRef}
          handleSearch={handleSearch}
        />
        <Tabs
          activeKey={activeTab}
          onSelect={changeTab}
          className="mb-3"
          variant="pills"
          fill
        >
          <Tab eventKey="all" title="All">
            {allTodos.map((todo, i) => (
              <ToDoCard
                deletTodos={deletTodos}
                misDone={misDone}
                editTodos={editTodos}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
          <Tab eventKey="done" title="Done">
            {doneTodo.map((todo, i) => (
              <ToDoCard
                deletTodos={deletTodos}
                editTodos={editTodos}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
          <Tab eventKey="undone" title="Undone">
            {undoneTodo.map((todo, i) => (
              <ToDoCard
                misDone={misDone}
                editTodos={editTodos}
                key={i}
                {...todo}
              />
            ))}
          </Tab>
        </Tabs>
        <Footer />
      </Container>
    );
  }
}

export default HomePage;
