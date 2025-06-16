import React from "react"
import './SpherePositiveEffect.css'

function SpherePositiveEffect({show}) {
    return (
        <div className={`SpherePositiveEffect ${show ? 'show' : ''}`}>
            <div className={`color color1 ${show ? 'show' : ''}`}></div>
            <div className="rot90">
                <div className="color color2"></div>
                <div className="rot90">
                    <div className="color color3"></div>
                    <div className="rot90">
                        <div className="color color4"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpherePositiveEffect
