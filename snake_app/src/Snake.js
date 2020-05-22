import React from 'react';
import './App.css';

function Snake(props) {
    let snakeBody = props.snakePos.map((pos, i) => {

        return(
            <div className="snake" key={i} style={{'left':`${pos[0]}%`, 'top':`${pos[1]}%`}}></div>           
        )
    });

    return snakeBody

}
//   return snakeBody

export default Snake;
