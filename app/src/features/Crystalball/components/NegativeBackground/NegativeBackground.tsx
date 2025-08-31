import { useEffect, useState, useCallback } from 'react'
import Thunder from '../Thunder/Thunder'
import Ghost from '../Ghost/Ghost'

interface NegativeBackgroundPropsI {
  show: boolean
}

function NegativeBackground ({ show }: NegativeBackgroundPropsI) {
  const [showLeftThunder, setShowLeftThunder] = useState(false)
  const [showRightThunder, setShowRightThunder] = useState(false)
  const [pageWidth, setPageWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )
  const [ghostsNumber, setGhostsNumber] = useState<number>(
    typeof window !== 'undefined' ? pageWidth / 20 : 0
  )

  const getRandomDelay = useCallback((max = 10000) => {
    return Math.random() * max
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

  useEffect(() => {
    const onResize = () => {
      setPageWidth(window.innerWidth)
      setGhostsNumber(window.innerWidth / 20)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!show) return null
    
  return (
    <>
      {Array.from({ length: ghostsNumber }).map((_, index) => (
        <Ghost key={index} left={pageWidth / 100 * index} reversed={index % 2 === 0} />
      ))}
      <Thunder show={showLeftThunder} reversed={true} />
      <Thunder show={showRightThunder} reversed={false} />
    </>
  )
}

export default NegativeBackground
