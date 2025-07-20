import { useEffect, useState } from 'react'
import Thunder from '../Thunder/Thunder'

interface NegativeBackgroundPropsI {
  show: boolean
}

function NegativeBackground ({ show }: NegativeBackgroundPropsI) {
  if (!show) return null
  const [showLeftThunder, setShowLeftThunder] = useState(false)
  const [showRightThunder, setShowRightThunder] = useState(false)
  const [counter, setCounter] = useState(0)

  useEffect(() => {

    const leftThunderTimeout = setTimeout(() => {
      setShowLeftThunder(true)
    }, 1500)

    const rightThunderTimeout = setTimeout(() => {
      setShowRightThunder(true)
    }, 2000)

    const stopTheRainTimeout = setTimeout(() => {
      setShowLeftThunder(false)
      setShowRightThunder(false)
    }, 4000)

    const counterTimeout = setTimeout(() => {
      setCounter(prevCounter => prevCounter + 1)
    }, 6000)

    return () => {
      clearTimeout(leftThunderTimeout)
      clearTimeout(rightThunderTimeout)
      clearTimeout(stopTheRainTimeout)
      clearTimeout(counterTimeout)
    }
  }, [counter])
    
  return (
    <>
      <Thunder show={showLeftThunder} reversed={true} />
      <Thunder show={showRightThunder} reversed={false} />
    </>
  )
}

export default NegativeBackground
