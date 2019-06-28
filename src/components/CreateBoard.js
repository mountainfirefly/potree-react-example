import React, { Component } from 'react';
import NewBoard from './newBoard';

class CreateBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            boardTitle: '',
            boardId: 1,
            buttonStatus: false,
            tasks: [],
            newTask: '',
            taskId: 1,
            taskStatus: "pending",
            selectedId: null,
            comments: [],
            newComment: '',
            commentId: 1
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
        this.setState({boardTitle: event.target.value})
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
        let retComments = JSON.parse(localStorage.getItem("comments"))
            this.setState({comments: retComments})
    }
    addTaskChange = (event, id) => {
        this.setState({newTask: event.target.value, selectedId: id})
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
    onChangeStatus = (e, id) => {
        const value =  e.target.value    
        const name = e.target.name
        if(name) {
            this.setState({ taskStatus: value})
        }    
    }

    filterTasks = (id, title) => {
        let tasksAll = JSON.parse(localStorage.getItem("tasks"));         
        if(id  && title) {
            if(title === "all") {
                let all = tasksAll.filter( data => {
                    return  title === "all" &&  id===data.boardId && data
                })
                this.setState({tasks: all})
            }
            else if(title === "pending") {
                let pending = tasksAll.filter( data => {
                    return title === "pending" && id===data.boardId && data.status === "pending"
                })
                this.setState({tasks: pending})
            }
            else if(title === "inprocess") {
                let inprocess = tasksAll.filter( data => {
                    return title === "inprocess" && id===data.boardId && data.status === "inprocess"
                })
                this.setState({tasks: inprocess})
            }
            else if(title === "done") {
                let done = tasksAll.filter( data => {
                    return title === "done" && id===data.boardId && data.status === "done"
                })
                this.setState({tasks: done})
            }
            else {
                this.setState({tasks: [...this.state.tasks, tasksAll]})
            }
        }
    }
    commentChange = (e) => {
        this.setState({newComment: e.target.value})
    }
    addComment = (taskId, boardId) => {
        const newComment = this.state.newComment
        let commentData = {
            commentId: this.state.commentId + 1,
            commentName: newComment,
            taskId: taskId,
            boardId: boardId,
            time: new Date().toLocaleString()
        }
        // console.log(commentData)
        if(taskId) {
            this.setState({comments: [...this.state.comments, commentData]}, localStorage.setItem("comments", JSON.stringify(this.state.comments)))
        }
    } 
    render() {
        // console.log(this.state.comments)
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
                               <div key={boardId}>
                                <NewBoard 
                                    tasks={this.state.tasks} 
                                    addTask={this.addTask} 
                                    addTaskChange={this.addTaskChange} 
                                    boardId={boardId} 
                                    boardTitle={boardTitle}
                                    onChangeStatus={this.onChangeStatus}
                                    status={this.state.status}
                                    filterTasks={this.filterTasks}
                                    commentChange={this.commentChange}
                                    addComment={this.addComment}
                                    comments={this.state.comments}
                                />
                               </div>
                           )
                        })}                    
                </div>
            </div>
        )
    }
}
export default CreateBoard;