import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import LightRays from './components/LightRays/LightRays'
import RandomArt from './components/RandomArt/RandomArt'
import ShineSphere from './components/ShineSphere/ShineSphere'
import './Crystalball.css'
import SpherePositiveEffect from './components/SpherePositiveEffect/SpherePositiveEffect'
import SphereNegativeEffect from './components/SphereNegativeEffect/SphereNegativeEffect'
import SphereNeutralEffect from './components/SphereNeutralEffect/SphereNeutralEffect'
import NegativeBackground from './components/NegativeBackground/NegativeBackground'
import { useShake } from '../../hooks/shakeTrigger'

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
  const { t, i18n } = useTranslation('crystalball')
  const { t: positiveMessagesT } = useTranslation('positive-messages')
  const { t: neutralMessagesT } = useTranslation('neutral-messages')
  const { t: negativeMessagesT } = useTranslation('negative-messages')

  const isPositive = useMemo(() => decisionType === 'positive', [decisionType])
  const isNeutral = useMemo(() => decisionType === 'neutral', [decisionType])
  const isNegative = useMemo(() => decisionType === 'negative', [decisionType])
  const isDecided = useMemo(() => !!decisionType, [decisionType])

  // Sorteia dentro do total real de mensagens carregadas: os arquivos de cada
  // idioma têm tamanhos diferentes e chaves ausentes fariam o i18next devolver
  // a própria chave como profecia.
  const getRandomMessage = useCallback((namespace: string, translate: TFunction) => {
    const language = i18n.languages?.find((lng) => !!i18n.getResourceBundle(lng, namespace))
    const bundle = language ? i18n.getResourceBundle(language, namespace) : null
    const total = bundle ? Object.keys(bundle).length : 0

    if (!total) return ''

    return translate(Math.floor(Math.random() * total).toString())
  }, [i18n])

  const decide = () => {
    if (decision !== '') {
      setDecision('')
      setDecisionType(null)
      return
    }

    const newDecisionType = getRandomMessageType()
    let newMessage = ''
    if (newDecisionType === 'positive') {
      newMessage = getRandomMessage('positive-messages', positiveMessagesT)
    }
    if (newDecisionType === 'neutral') {
      newMessage = getRandomMessage('neutral-messages', neutralMessagesT)
    }
    if (newDecisionType === 'negative') {
      newMessage = getRandomMessage('negative-messages', negativeMessagesT)
    }
    
    setDecisionType(newDecisionType)
    setDecision(newMessage)
  }

  useShake({
    onShake: decide
  })

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
