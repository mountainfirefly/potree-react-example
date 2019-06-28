import React from "react";
import FilterTask from './FilterTasks';

const NewBoard = ({boardId, commentChange, comments, addComment, filterTasks, boardTitle, addTask, addTaskChange, tasks, onChangeStatus, status}) => {
    let currId = boardId
    return (
        <div style={{padding: 10, margin: 10, height: 200, overflow: "scroll", border: '1px solid #000'}}>
            <div><span>{boardTitle}</span></div>
            <div style={{display: 'flex'}}>
                <input placeholder="add task" onChange={(e)=>addTaskChange(e, currId)} type="text" ></input>
                <select value={status} name={"status"+currId} onChange={(e)=>onChangeStatus(e, currId)}>
                    {["pending", "inprocess", "done"].map( (option, index)  => {
                        return <option value={option} key={index} >{option}</option>
                    })}
                </select>
                <button onClick={()=>addTask(boardId)}>Add Task</button>
            </div>
            <div>
                <FilterTask comments={comments} filterTasks={filterTasks} commentChange={commentChange} addComment={addComment} tasks={tasks} boardId={currId}/>
                    
            </div>
        </div>
    )     
}

export default NewBoard