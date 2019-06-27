import React from "react";

const NewBoard = ({boardId, boardTitle, addTask, addTaskChange, tasks, onChangeStatus, status}) => {
    let currId = boardId
    return (
        <div style={{padding: 10}}>
            <div><span>{boardId}</span>. <span>{boardTitle}</span></div>
            <div style={{display: 'flex'}}>
                <input refs={boardId} onChange={(e)=>addTaskChange(e)} type="text" ></input>
                {/* <select value={status} onChange={(e)=>onChangeStatus(e, currId)}>
                    {["pending", "In-Process", "Done"].map( (option, index)  => {
                        return <option value={option} key={option} >{option}</option>
                    })}
                </select> */}
                <button onClick={()=>addTask(boardId)}>Add Task</button>
            </div>
            <div>

                {
                    tasks && tasks.map( ({taskName, boardId}) => {
                       return currId===boardId && <li>{taskName}</li>
                    })
                }
            </div>
        </div>
    )     
}

export default NewBoard