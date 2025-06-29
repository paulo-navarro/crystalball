import { useRef, useEffect, useState } from "react"
import Shine from "../Shine/Shine"
import "./ShineSphere.css"

function ShineSphere({show}) {

    const sphereRef = useRef(null)
    const shineModelRef = useRef(null)

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
                if (show) addShine()
            }
        }, 300)

        return () => clearInterval(intervalId)

    }, [sphereRef, shineModelRef, show])

    return (
        <>
            <div id="shineSphere" className={show ? 'show' : ''} ref={sphereRef}></div>
            <Shine ref={shineModelRef} />
        </>
    )
}

export default ShineSphere
