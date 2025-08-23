import { useMemo, useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import LightRays from './components/LightRays/LightRays'
import RandomArt from './components/RandomArt/RandomArt'
import ShineSphere from './components/ShineSphere/ShineSphere'
import './Crystalball.css'
import SpherePositiveEffect from './components/SpherePositiveEffect/SpherePositiveEffect'
import SphereNegativeEffect from './components/SphereNegativeEffect/SphereNegativeEffect'
import SphereNeutralEffect from './components/SphereNeutralEffect/SphereNeutralEffect'
import NegativeBackground from './components/NegativeBackground/NegativeBackground'

type decisionTypeT = 'positive' | 'neutral' | 'negative' | null

const getUrlParam = (paramName: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(paramName)
}

const getRandomMessageType = () => {
  const predestinated = getUrlParam('x')
  console.log('x', predestinated)
  
  if (predestinated === '0') return 'negative'
  if (predestinated === '1') return 'neutral'
  if (predestinated === '2') return 'positive'

  const generateRand = Math.round(Math.floor(Math.random() * 301)) - 1

  if (generateRand < 100) return 'positive'
  if (generateRand >= 100 && generateRand < 200) return 'neutral'

  return 'negative'
}

function Crystalball () {
  const [decision, setDecision] = useState('')
  const [decisionType, setDecisionType] = useState<decisionTypeT>(null)
  const { t } = useTranslation('crystalball')
  const { t: positiveMessagesT } = useTranslation('positive-messages')
  const { t: neutralMessagesT } = useTranslation('neutral-messages')
  const { t: negativeMessagesT } = useTranslation('negative-messages')

  const lastShakeTime = useRef(0)
  const shakeThreshold = 5
  const shakeTimeThreshold = 500

  const isPositive = useMemo(() => decisionType === 'positive', [decisionType])
  const isNeutral = useMemo(() => decisionType === 'neutral', [decisionType])
  const isNegative = useMemo(() => decisionType === 'negative', [decisionType])
  const isDecided = useMemo(() => !!decisionType, [decisionType])

  const decide = () => {
    if (decision !== '') {
      setDecision('')
      setDecisionType(null)
      return
    }

    const newDecisionType = getRandomMessageType()
    let newMessage = ''
    if (newDecisionType === 'positive') {
      newMessage = positiveMessagesT(Math.floor(Math.random() * 201).toString())
    }
    if (newDecisionType === 'neutral') {
      newMessage = neutralMessagesT(Math.floor(Math.random() * 101).toString())
    }
    if (newDecisionType === 'negative') {
      newMessage = negativeMessagesT(Math.floor(Math.random() * 101).toString())
    }
    
    setDecisionType(newDecisionType)
    setDecision(newMessage)
  }

  useEffect(() => {
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity
      if (!acceleration) return

      const { x, y, z } = acceleration
      const magnitude = Math.sqrt(x! * x! + y! * y! + z! * z!)
      
      const currentTime = Date.now()
      
      if (magnitude > shakeThreshold && 
          currentTime - lastShakeTime.current > shakeTimeThreshold) {
        lastShakeTime.current = currentTime
        decide()
      }
    }

    const requestPermission = async () => {
      const DeviceMotionEventAny = DeviceMotionEvent as any
      
      if (typeof DeviceMotionEventAny.requestPermission === 'function') {
        try {
          const permissionState = await DeviceMotionEventAny.requestPermission()
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion)
          }
        } catch (error) {
          console.error('Error requesting device motion permission:', error)
        }
      } else {
        // For non-iOS devices or older iOS versions
        window.addEventListener('devicemotion', handleDeviceMotion)
      }
    }

    requestPermission()

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion)
    }
  }, [])

  return (
    <>
      <div className={`wrapper ${decisionType ? decisionType : ''}`}>
        <ShineSphere show={isPositive}/>
        <LightRays show={isPositive} />

        <NegativeBackground show={isNegative} />

        <div
          id="sphere"
          className={`sphere ${decisionType ? decisionType : ''}`}
          onClick={decide}
        >
          { !isDecided && <RandomArt duration={2000} /> }
          <SpherePositiveEffect show={isPositive} />
          <SphereNegativeEffect show={isNegative} />
          <SphereNeutralEffect show={isNeutral} />

          <div id="decision" className="decision">
            <span className={isDecided ? 'decisionShow': ''}>{decision}</span>
            <span className={isDecided ? 'decisionTypeShow': ''}>{`(${t(decisionType || '')})`}</span>
          </div>
        </div>

        <button id="decisionButton" className={ isDecided ? 'show' : ''} onClick={decide}>
          {t('resetButton')}
        </button>
      </div>
    </>
  )
}

export default Crystalball
