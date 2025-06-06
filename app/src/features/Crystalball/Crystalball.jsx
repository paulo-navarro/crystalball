import { useState } from "react"
import { useTranslation } from 'react-i18next'
import LightRays from "./components/LightRays/LightRays"
import RandomArt from "./components/RandomArt/RandomArt"
import ShineSphere from "./components/ShineSphere/ShineSphere"
import "./Crystalball.css"

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
        <div className={`wrapper ${decisionType}`}>
            <div className="header">
            <p>{t('instructions')}</p>
            </div>
            <div id="sphere" className="sphere" onClick={decide}>
                { decision !== '' && <>
                    <div className="color color1"></div>
                    <div className="rot90">
                        <div className="color color2"></div>
                        <div className="rot90">
                            <div className="color color3"></div>
                            <div className="rot90">
                                <div className="color color4"></div>
                            </div>
                        </div>
                    </div>
                </>}
                <div id="decision" className="decision">
                    <span className={decision !== "" ? 'decisionShow': ''}>{decision}
                    <br/> {`(${t(decisionType)})`}</span>
                </div>
                { decision === "" && <RandomArt duration={2000} /> }
                </div>
            { decisionType === 'positive' && <>
                <ShineSphere />
                <LightRays />
            </> }

            <button id="decisionButton" onClick={decide}>
                {t('resetButton')}
            </button>
        </div>
    </>
  )
}

export default Crystalball
