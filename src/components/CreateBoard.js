import React, { Component } from 'react';
import NewBoard from './newBoard';

class CreateBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            boardTitle: '',
            boardId: 0,
            buttonStatus: false,
            tasks: [],
            newTask: '',
            taskId: 0,
            taskStatus: "pending"
        }
    }
    createNewBoard = (title) => {
        this.setState({boardId: this.state.boardId+1})
        let boardData = {
            boardId: this.state.boardId,
            boardTitle: title
        }
        this.setState({board: [...this.state.board, boardData]}, () => localStorage.setItem("boardData", JSON.stringify(this.state.board)))
    }
    onChangeBoard = (event) => {
        this.setState({boardTitle: event.target.value, buttonStatus: false})
    }
    componentDidMount() {
        let retBoard = localStorage.getItem("boardData")
        if(retBoard) {
            let parseBoard = JSON.parse(retBoard)
            this.setState({board: parseBoard, boardId: parseBoard.length+1})
        }
        let retTasks = localStorage.getItem("tasks")
        if(retTasks) {
            let parseTasks =  JSON.parse(retTasks)
            this.setState({tasks: parseTasks})
        }
    }
    addTaskChange = (event) => {
        this.setState({newTask: event.target.value})
    }
    addTask = (boardId) => {
        this.setState({taskId: this.state.taskId + 1})
        let task = this.state.newTask;
        let configTask = {
            taskName: task,
            taskId: this.state.taskId,
            boardId: boardId,
            status: this.state.taskStatus
        }
        let tasks = [...this.state.tasks, configTask]
        this.setState({newTask: '', tasks}, ()=> localStorage.setItem("tasks", JSON.stringify(this.state.tasks)))
    }
    // onChangeStatus = (e, id) => {
    //     console.log(id, this.state.boardId)
    //     this.state.tasks.map( ({boardId}) => {
    //         if(id === boardId) {
    //             this.setState({taskStatus: e.target.value})
    //         }
    //     })
        
        
    // }
    render() {
        return (
            <div style={{width: "80%", margin: "0 auto"}}>
                <div style={{textAlign: 'center', padding: 15}}>
                    <input name="boardTitle" onChange={(event)=>this.onChangeBoard(event)} value={this.state.boardTitle} type="text" placeholder="Board Name"></input>
                    <button disabled={this.state.boardTitle ? false : true} onClick={()=>this.createNewBoard(this.state.boardTitle)}>Create New Board</button>
                </div>
                <div style={{display: "flex", width: "100%", flexWrap: "wrap"}}> 
                    {
                        this.state.board && this.state.board.map( ({boardId, boardTitle}) => {
                           return (
                               <NewBoard 
                                    tasks={this.state.tasks} 
                                    addTask={this.addTask} 
                                    addTaskChange={this.addTaskChange} 
                                    boardId={boardId} 
                                    boardTitle={boardTitle}
                                    onChangeStatus={this.onChangeStatus}
                                    status={this.state.taskStatus}
                                />
                           )
                        })}                    
                </div>
            </div>
        )
    }
}
export default CreateBoard;