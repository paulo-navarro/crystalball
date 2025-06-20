import { useMemo, useState } from "react"
import { useTranslation } from 'react-i18next'
import LightRays from "./components/LightRays/LightRays"
import RandomArt from "./components/RandomArt/RandomArt"
import ShineSphere from "./components/ShineSphere/ShineSphere"
import "./Crystalball.css"
import SpherePositiveEffect from "./components/SpherePositiveEffect/SpherePositiveEffect"
import SphereNegativeEffect from "./components/SphereNegativeEffect/SphereNegativeEffect"
import SphereNeutralEffect from "./components/SphereNeutralEffect/SphereNeutralEffect"
import Thunder from "./components/Thunder/Thunder"

const getRandomMessageType = () => {
    const generateRand = Math.round(Math.floor(Math.random() * 301)) - 1

    if (generateRand < 100) return 'positive'
    if (generateRand >= 100 && generateRand < 200) return 'neutral'

    return 'negative'
}

function Crystalball() {

    const [decision, setDecision] = useState('')
    const [decisionType, setDecisionType] = useState(null)
    const { t } = useTranslation('crystalball')
    const { t: positiveMessagesT } = useTranslation('positive-messages')
    const { t: neutralMessagesT } = useTranslation('neutral-messages')
    const { t: negativeMessagesT } = useTranslation('negative-messages')

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

    return (
    <>
        <div className={`wrapper ${decisionType ? decisionType : ""}`}>
            <div className="header">
                <p className={ !isDecided ? 'show' : ''}>{t('instructions')}</p>
            </div>

            <ShineSphere show={isPositive}/>
            <LightRays show={isPositive} />

            <div
                id="sphere"
                className={`sphere ${decisionType ? decisionType : ""}`}
                onClick={decide}
            >
                { !isDecided && <RandomArt duration={2000} /> }
                <SpherePositiveEffect show={isPositive} />
                <SphereNegativeEffect show={isNegative} />
                <SphereNeutralEffect show={isNeutral} />

                <div id="decision" className="decision">
                    <span className={isDecided ? 'decisionShow': ''}>{decision}</span>
                    <span className={isDecided ? 'decisionTypeShow': ''}>{`(${t(decisionType)})`}</span>
                </div>
            </div>
            <Thunder show={isNegative} />

            <button id="decisionButton" className={ isDecided ? 'show' : ''} onClick={decide}>
                {t('resetButton')}
            </button>
        </div>
    </>
  )
}

export default Crystalball
