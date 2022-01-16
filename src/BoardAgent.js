import { useState, useEffect } from 'react'
import Eve from 'evejs'

const BoardAgent = ({ id }) => {
  const [agent, setAgent] = useState(new Eve.Agent(id))
  const [board, setBoard] = useState({
    tiles: {
      field: Array(16),
      special: Array(4).fill(false)
    },
    player1: {
      figures: [{}, {}]
    },
    player2: {
      figures: [{}, {}]
    },
    done: false
  })
  const order = ['player1', 'player2']

  const resetBoard = () => {
    const initialBoard = {...board}
    for (let i = 0; i < 16; i++) {
      initialBoard.tiles.field[i] = new Array()
    }
    setBoard(initialBoard)
  }

  useEffect(() => {
    resetBoard()
    agent.connect('transport')

    let activePlayer = 0

    agent.receive = (from, msg) => {
      const player = from
      const data = JSON.parse(msg)
      if (data.type) {

        const figure = data.figure
        const figures = [...board[player].figures]
        const fields = [...board.tiles.field]
        console.log(fields)
        if (data.type === 'activate') {
          const index = player === 'player1' ? 1 : 9
          figures[figure].active = true
          figures[figure].position = index
          fields[index].push(player === 'player1' ? `p1_${figure}` : `p2_${figure}`)
        } else if (data.type === 'move') {
          if (!figures[figure].done) {

            const figureName = player === 'player1' ? `p1_${figure}` : `p2_${figure}`
            const opponentName = player === 'player1' ? 'p2' : 'p1'
            let index = 0
            fields.forEach((f, i) => {
              const ind = f.indexOf(figureName);
              if (ind > -1) {
                index = i
                f.splice(ind, 1);
              }
            })
            
            for (let i = 0; i < data.moves; i++) {
              index = (index + 1) % board.tiles.field.length
              
              if (player === 'player1' && index === 1) {
                if (!board.tiles.special[0]) board.tiles.special[0] = true
                else board.tiles.special[1] = true
                figures[figure].done = true
                
                agent.send(player, JSON.stringify({ type: 'done', number: figure }))
                
                break
              }
              
              if (player === 'player2' && index === 9) {
                if (!board.tiles.special[2]) board.tiles.special[2] = true
                else board.tiles.special[3] = true
                figures[figure].done = true
                
                agent.send(player, JSON.stringify({ type: 'done', number: figure }))
                
                break
              }
            }
            
            const opponentFigures = fields[index]?.filter(v => v.startsWith(opponentName))
            
            if (opponentFigures?.length > 0) {
              const opponent = player === 'player1' ? 'player2' : 'player1'
              
              agent.send(opponent, JSON.stringify({ type: 'reset', figures: opponentFigures.map(f => Number(f.split('_')[1])) }))
            }
            
            
            fields[index] = fields[index]?.filter(v => !v.startsWith(opponentName))
            
            figures[figure].position = index
            if (!figures[figure].done) {
              fields[index].push(figureName)
            }
          }
        }        
        const newBoard = {...board}
        newBoard.tiles.field = fields
        newBoard[player].figures = figures
        
        if (newBoard['player1'].figures[0].done && newBoard['player1'].figures[1].done ||
        newBoard['player2'].figures[0].done && newBoard['player2'].figures[1].done) {
          newBoard.done = true
        }
        setBoard(newBoard)
        if (newBoard.done) {
          return
        }
      }
      setTimeout(() => {
        agent.startGame()
      }, 1500)
    }

    agent.startGame = () => {
      const player = order[activePlayer]
      agent.send(player, JSON.stringify({type: 'roll'}))
      console.log(activePlayer)

      if (activePlayer === 0) {
        activePlayer = 1
      } else {
        activePlayer = 0
      }
    }
  }, [])

  return { agent, board }
}

export default BoardAgent