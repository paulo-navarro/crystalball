import { useEffect, useState, useCallback } from 'react'
import Thunder from '../Thunder/Thunder'

interface NegativeBackgroundPropsI {
  show: boolean
}

function NegativeBackground ({ show }: NegativeBackgroundPropsI) {
  const [showLeftThunder, setShowLeftThunder] = useState(false)
  const [showRightThunder, setShowRightThunder] = useState(false)

  // Função para gerar delay randômico entre 3 e 30 segundos
  const getRandomDelay = useCallback(() => {
    return Math.random() * 10000 // 3000ms a 30000ms
  }, [])

  // Função para executar um ciclo de raio
  const executeThunderCycle = useCallback((isLeft: boolean) => {
    const setThunder = isLeft ? setShowLeftThunder : setShowRightThunder
    
    // Mostra o raio
    setThunder(true)
    
    // Esconde o raio após 2 segundos
    setTimeout(() => {
      setThunder(false)
    }, 2000)
    
    // Agenda o próximo raio
    setTimeout(() => {
      executeThunderCycle(isLeft)
    }, getRandomDelay())
  }, [getRandomDelay])

  useEffect(() => {
    if (!show) return

    // Inicia os ciclos de raios com delays iniciais diferentes
    const leftThunderInitialTimeout = setTimeout(() => {
      executeThunderCycle(true)
    }, getRandomDelay())

    const rightThunderInitialTimeout = setTimeout(() => {
      executeThunderCycle(false)
    }, getRandomDelay())

    return () => {
      clearTimeout(leftThunderInitialTimeout)
      clearTimeout(rightThunderInitialTimeout)
    }
  }, [show, executeThunderCycle, getRandomDelay])

  if (!show) return null
    
  return (
    <>
      <Thunder show={showLeftThunder} reversed={true} />
      <Thunder show={showRightThunder} reversed={false} />
    </>
  )
}

export default NegativeBackground
