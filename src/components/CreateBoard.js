import React, { Component } from 'react';
import NewBoard from './newBoard';

class CreateBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            children: [],
            boardTitle: '',
            buttonStatus: false
        }
    }
    createNewBoard = () => {
        this.setState({
            boardTitle: '',
            children: [
                ...this.state.children,
                <NewBoard title={this.state.boardTitle && this.state.boardTitle} />
            ]
        });
    }
    onChangeBoard = (event) => {
        this.setState({boardTitle: event.target.value, buttonStatus: false})
    }
    render() {
        console.log(this.state)
        return (
            <div style={{width: "80%", margin: "0 auto"}}>
                <div style={{textAlign: 'center', padding: 15}}>
                    <input onChange={(event)=>this.onChangeBoard(event)} value={this.state.boardTitle} type="text" placeholder="Board Name"></input>
                    <button disabled={this.state.boardTitle ? this.state.buttonStatus : true} onClick={()=>this.createNewBoard()}>Create New Board</button>
                </div>
                <div style={{display: "flex", width: "100%", flexWrap: "wrap"}}> 
                    {this.state.children.map((child, index) => 
                            <div style={{flex: "0 0 33%",margin: 10, border: "1px solid #000"}}>
                        {child}
                    </div>)}
                </div>
            </div>
        )
    }
}
export default CreateBoard;