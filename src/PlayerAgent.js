import { useState, useEffect } from 'react'
import Eve from 'evejs'

const PlayerAgent = ({ id })  => {
  const [agent, setAgent] = useState(new Eve.Agent(id))

  useEffect(() => {
    agent.connect('transport')
    const figures = [{active: false, done: false}, {active: false, done: false}]

    agent.rollDie = () => {
      const data = {}

      if (!figures[0].done || !figures[1].done) {

        if ((!figures[0].active && !figures[0].done) && (!figures[1].active && !figures[1].done)) {
          for (let i = 0; i < 3; i++) {
            if ((Math.floor(Math.random() * 6) + 1) === 6) {
              data.type = 'activate'
              data.figure = 0
              figures[0].active = true
              break
            }
          }
        }
        else {
          const moves = Math.floor(Math.random() * 6) + 1
          let figure = Math.floor(Math.random() * 2)

          if (figures[figure].done) figure = figure === 0 ? 1 : 0
          
          if (figures[figure].active) {
            if (!figures[figure].done)
            data.type = 'move'
            data.moves = moves
          } else {
            if (moves === 6) {
              data.type = 'activate'
              figures[figure].active = true
            } else {
              figure = figure === 0 ? 1 : 0
              data.type = 'move'
              data.moves = moves
            }
          }
          data.figure = figure
        }
      }
        
      agent.send('boardAgent', JSON.stringify(data))
    }

    agent.receive = (from, msg) => {
      const data = JSON.parse(msg)
      if (data.type === 'roll') {
        agent.rollDie()
      }

      if (data.type === 'reset') {
        data.figures.forEach(f => {
          figures[f].active = false
        })
      }

      if (data.type === 'done') {
        figures[data.number].done = true
      }
    }
  }, [])

  return agent
}

export default PlayerAgent