import type { CSSProperties } from 'react'
import './SphereGradient.css'

interface SphereGradientPropsI {
  show: boolean
  colors: [string, string, string, string]
  baseColor: string
  reverse?: boolean
  opacity?: number
}

const SphereGradient = ({
  show,
  colors,
  baseColor,
  reverse = false,
  opacity = 0.5
}: SphereGradientPropsI) => {
  const style = {
    '--sphereGradientBase': baseColor,
    '--sphereGradientOpacity': opacity,
    '--sphereGradientColor1': colors[0],
    '--sphereGradientColor2': colors[1],
    '--sphereGradientColor3': colors[2],
    '--sphereGradientColor4': colors[3]
  } as CSSProperties

  return (
    <div
      className={`SphereGradient ${show ? 'show' : ''} ${reverse ? 'reverse' : ''}`}
      style={style}
    >
      <div className="sphereGradientColor colorCycle1"></div>
      <div className="sphereGradientRot90">
        <div className="sphereGradientColor colorCycle2"></div>
        <div className="sphereGradientRot90">
          <div className="sphereGradientColor colorCycle3"></div>
          <div className="sphereGradientRot90">
            <div className="sphereGradientColor colorCycle4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SphereGradient
