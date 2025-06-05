import { useState, useRef, useEffect } from "react"
import { useTranslation } from 'react-i18next';
import LightRays from "./components/LightRays/LightRays"
import "./crystalball.css"
import RandomArt from "./components/RandomArt/RandomArt"
import Shine from "./components/Shine/Shine"
import messages from "./answers"

const DECISION_DURATION = 10000

function Crystalball() {

   const [decision, setDecision] = useState('')
   const [decisionType, setDecisionType] = useState(null)
   const sphereRef = useRef(null)
   const shineModelRef = useRef(null)
    const { t } = useTranslation('crystalball')

    const decide = () => {
        if (decision !== '') {
            setDecision('')
            setDecisionType(null)
            return
        }
        const generateRand = Math.round(Math.floor(Math.random() * 301)) - 1
        let newDecisionType = 'positive'
    
        if (generateRand < 100) newDecisionType = 'positive'
        if (generateRand >= 100 && generateRand < 200) newDecisionType = 'neutral'
        if (generateRand >= 200) newDecisionType = 'negative'
    
        const messageRage = messages[newDecisionType]
        const messageRand = Math.floor(Math.random() * messageRage.length) - 1
    
        setDecisionType(newDecisionType)
        setDecision(messageRage[messageRand])
    }

    useEffect(() => {
        const sphere = sphereRef.current
        const shineModel = shineModelRef.current

        const addShine = () => {
            const newShine = shineModel.cloneNode(true)
            const percent1 = Math.floor(Math.random() * 101)
            const percent2 = Math.floor(Math.random() * 101)
            newShine.style.top = `${percent1}%`
            newShine.style.left = `${percent2}%`
            setTimeout(() => newShine.remove(), 1000)
            sphere.appendChild(newShine)
        }
        const intervalId = setInterval(() => {
            for(let i = 0; i < 8; i++) {
                addShine()
            }
        }, 300)

        return () => clearInterval(intervalId)

    }, [sphereRef, shineModelRef, decisionType])

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
                    <br/> {`(${decisionType})`}</span>
                </div>
                { decision === "" && <RandomArt duration={2000} /> }
                </div>
            { decisionType === 'positive' && <>
                <div id="shineSphere" ref={sphereRef}></div>
                <LightRays />
            </> }

            <Shine ref={shineModelRef} />
            <button id="decisionButton" onClick={decide}>
                Click here to know the answer!
            </button>
        </div>
    </>
  )
}

export default Crystalball
