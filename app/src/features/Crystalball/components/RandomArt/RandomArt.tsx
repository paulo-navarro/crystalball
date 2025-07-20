import { useState, useEffect } from 'react'
import ElementalArt from '../ElementalArt/ElementalArt'
import EyeArt from '../EyeArt/EyeArt'
import './RandomArt.css'

interface RandomArtPropsI {
  duration: number
}

type artType = 'eye' | 'earth' | 'fire' | 'water' | 'air' | null

function RandomArt ({ duration }: RandomArtPropsI) {
  const [ art, setArt ] = useState<artType>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const generateRand = Math.round(Math.floor(Math.random() * 6))

      if (generateRand === 0) { 
        setArt('eye')
      } else if (generateRand === 1) {
        setArt('earth')
      } else if (generateRand === 2) {
        setArt('fire')
      } else if (generateRand === 3) {
        setArt('water')
      } else if (generateRand === 4) {
        setArt('air')
      }
    }, duration)

    return () => clearInterval(interval)
  }, [duration])

  return (
    <>
      {art}
      {art === 'eye' && (<EyeArt />)}
      {art !== 'eye' && (<ElementalArt element={art} />)}
    </>
  )
}

export default RandomArt