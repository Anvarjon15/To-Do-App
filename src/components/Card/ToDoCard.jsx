import React, { Component } from 'react'
import { Alert, Button } from 'react-bootstrap'

export class ToDoCard extends Component {
  render() {
    const colors={
      high:"warning",
      middle:"secondary",
      low:"danger",
    }
    const {date, name , importance,done,misDone,id ,deletTodos,editTodos} = this.props
    return (
      <Alert variant={colors[importance]} className='d-flex justify-content-between align-items-center'>
       <div>
        <time>{date}</time> <span>{name}</span> 
       </div>
       <div> 
         <Button className='me-3' onClick={() => editTodos(id)} variant='primary'>Edit</Button>
        {
        done ?(
          <Button className='me-3' onClick={() => deletTodos(id)} variant='danger'>Delete</Button>
          ):(
            <Button onClick={() => misDone(id)} className='me-3' variant='success'>Done</Button>
        )
        }
       </div> 
      </Alert>
    )
  }
}

export default ToDoCard
