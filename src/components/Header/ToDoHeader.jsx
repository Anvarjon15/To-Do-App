import React, { Component,   } from 'react'
import { Form, InputGroup } from 'react-bootstrap'

export class ToDoHeader extends Component {
  constructor(props) {
    super(props)
    // this.searchRef=createRef( )
    this.state = {
    }
  }
  
  render() { 
    const {handleSearch,searchRef,handleImportancy,importance} = this.props
    return (
      <InputGroup className="my-3">
        <Form.Control onChange={handleSearch} ref={searchRef}
          placeholder="Search"
        />
        <InputGroup.Text id="basic-addon2">
        <Form.Select onChange={handleImportancy} value={importance} >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="middle">Middle</option>
            <option value="low">Low</option>
          </Form.Select>
        </InputGroup.Text>
      </InputGroup>
    )
  }
}

export default ToDoHeader
