import React from 'react';
import Snake from './Snake';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      arrayPos: [[0,0],[2,0], [4,0]],
      head:[],
      food: [0,0],
      direction:'RIGHT',
      speed: 100,
      score: 0
      
    }
    
    this.handlePress = this.handlePress.bind(this)
    this.direction = this.direction.bind(this)

  }

  componentDidMount(){
    document.onkeydown = this.handlePress // Ready to call handlpress when he's press
    // setInterval(this.direction, this.state.speed) // Start/restart each n time direction
    this.food()// Init foo

  }

   getRandom = (min, max) => {
    return Math.floor(Math.random() * Math.ceil((max - min)));
  }

  food = () =>{

    //Random position left and top
    let left = this.getRandom(0, 50) ;
    let top = this.getRandom(0, 50) ;

    //Put in pair number if of this one impair
    if(left%2 !== 0){left = left + 1}
    if(top%2 !== 0){top = top + 1}

    this.setState({food: [left, top]})
}

    // Apply by key press
    handlePress(e){ 
      switch(e.keyCode){
        case 37:
          this.direction("LEFT")
          this.setState({direction: 'LEFT'})
        break;
        case 38:
          this.direction("UP")
          this.setState({direction: 'UP'})
        break;
        case 39:
          this.direction("RIGHT")
          this.setState({direction: 'RIGHT'})
        break;
        case 40:
          this.direction("DOWN")
          this.setState({direction: 'DOWN'})
        break;
      }
    }

    direction(sens){
      
      let snakePos = this.state.arrayPos // Array of positions of body 
      let snakeHead = snakePos[snakePos.length - 1]; // Take the last value in array who is the head

      switch(sens || this.state.direction){   
        case 'LEFT':
          snakeHead = [snakeHead[0] - 2, snakeHead[1]]
        break;
        case 'UP':
          snakeHead = [snakeHead[0], snakeHead[1] - 2]
        break;
        case 'RIGHT':
          snakeHead = [snakeHead[0] + 2, snakeHead[1]]
        break;
        case 'DOWN':
          snakeHead = [snakeHead[0], snakeHead[1] + 2]
        break;
      }
      
      snakePos.push(snakeHead);// Push the new head and head push the current head in second place.
      snakePos.shift();// Remove the first element of array
      
       this.collision(snakePos);

    }

    collision(snakePos){

      let snakeHead = snakePos[snakePos.length - 1];

      //eat food
      if(this.state.food[0] === snakeHead[0] && this.state.food[1] === snakeHead[1]){ // Check if the position od the head is equal to foo
        
        this.food(); // Call this food for change place
        snakePos.unshift(snakePos[0]); // Push the last current value of array (tails of snake) in first element of array for grow the snake
        this.setState({speed: this.state.speed - 3, score: this.state.score + 3})

      }

      //Collsision Bordergame
      if(snakeHead[0] === - 2 || snakeHead[0] - 2 === 98 || snakeHead[1] === - 2 || snakeHead[1] === 100){
        alert("Game over")
        window.location.reload()

      } 

      //Collsision himself
      snakePos.forEach( (back, i) => {
        if(i < snakePos.length - 2){
          if(snakeHead[0] === back[0] && snakeHead[1] === back[1]){
            alert("Game over");
            window.location.reload()

            } 
        }
      });

      this.setState({arrayPos: snakePos})

    }


render(){
  return (
    <div>
      <div className="game-border" >
        <p>Score : {this.state.score}</p>
        <Snake snakePos={this.state.arrayPos}/>
        <div className="food" style={{'left':`${this.state.food[0]}%`, 'top':`${this.state.food[1]}%`}}></div>
      </div>
    </div>
  );

}
    
}

export default App;
