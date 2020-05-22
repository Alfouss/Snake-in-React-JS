export const handlePress = (e, snakePos)=> {
  console.log(e)
  let head = snakePos[snakePos.length - 1];
  let side = "";
  switch(e.keyCode){
    case 37:
      head = [head[0] - 2, head[1]]
      side = "LEFT"
    break;
    case 38:
      head = [head[0], head[1] - 2]
      side = "UP"
    break;
    case 39:
      head = [head[0] + 2, head[1]]
      side = "RIGHT"
    break;
    case 40:
      head = [head[0], head[1] + 2]
      side = "DOWN"
    break;
    default:
      return {head: head, side: side}
  }

  return {head: head, side: side}
}
