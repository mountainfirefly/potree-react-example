import React, { Component } from "react";

class NewBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            tasks: [],
            boardId: 0,
            buttonStatus: true
        }
    }
    onChangeInput =  (event) => {
        this.setState({value: event.target.value, buttonStatus: false})
    }
    addTask = () => {
        let task = this.state.value;
        let tasks = [...this.state.tasks, task]
        this.setState({value: '', tasks, buttonStatus: true})
    }

    render() {
        console.log(this.props)
        return (
            <div style={{padding: 10}}>
                <div>{this.props.title}</div>
               <div style={{display: 'flex'}}>
                    <input type="text" value={this.state.value} onChange={this.onChangeInput}></input>
                    <button disabled={this.state.task ? this.state.buttonStatus : this.state.buttonStatus} onClick={()=>this.addTask()}>Add Task</button>
               </div>
               <div>
                   {
                       this.state.tasks && this.state.tasks.map(value => {
                           return <li>{value}</li>
                       })
                   }
               </div>
            </div>
        )
    }
}

export default NewBoard