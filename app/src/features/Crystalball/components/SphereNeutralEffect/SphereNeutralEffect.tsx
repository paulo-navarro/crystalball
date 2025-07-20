import './SphereNeutralEffect.css'

type SphereNeutralEffectProps = {
  show: boolean
}

const SphereNeutralEffect = ({ show }: SphereNeutralEffectProps) => (
  <div className={`SphereNeutralEffect ${show ? 'show' : ''}`}></div>
)

export default SphereNeutralEffect
