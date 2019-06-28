import React from "react";

const FilterTasks = ({tasks, comments, addComment, boardId, filterTasks, commentChange}) => {
    let currId = boardId

    return (
        <div>
            <ul style={{display: "flex", justifyContent: 'space-around'}}>
                {
                    ["all", "pending", "inprocess", "done"].map( (title, index) =>{
                        
                        return (
                            <div key={title}>
                                <li style={{listStyle: 'none'}}  key={title} onClick={()=>filterTasks(boardId, title)}>{title}</li>
                            </div>
                        )
                    } )
                }
            </ul>
            {
                tasks && tasks.map( ({taskName, boardId, taskId}) => {
                   let bid = boardId
                   let tid = taskId
                   return currId===boardId && <li style={{listStyle: 'none'}}>
                        <p>{taskName}</p>
                        <h5 style={{margin: 0, padding: 5}}>Comments</h5>
                        { comments && comments.map( ({commentName, time, taskId, boardId}) => 
                            { 
                                return bid === boardId && tid === taskId &&  <div>
                                
                                <p style={{fontSize: 10, padding: 10, margin: 0}}>
                                {commentName} { ' ' } {time}
                            </p></div>})}
                        <input onChange={commentChange} placeholder="add comment" type="text"></input>
                        <button onClick={()=> addComment(taskId, boardId)}>comment</button>
                    </li>
                })
            }
        </div>
    )
}

export default FilterTasks;