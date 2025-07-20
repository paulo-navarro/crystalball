import './SphereNegativeEffect.css'

interface SphereNegativeEffectProps {
  show: boolean
}

const SphereNegativeEffect = ({ show }: SphereNegativeEffectProps) => (
  <div className={`SphereNegativeEffect ${show ? 'show' : ''}`}></div>
)

export default SphereNegativeEffect
