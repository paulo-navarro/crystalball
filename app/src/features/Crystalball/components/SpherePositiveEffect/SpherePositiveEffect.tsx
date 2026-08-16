import SphereGradient from '../SphereGradient/SphereGradient'

interface SpherePositiveEffectProps {
  show: boolean
}

const POSITIVE_COLORS: [string, string, string, string] = [
  '#ff00ea',
  '#0008ff',
  '#ff0000',
  '#5401fc'
]

const SpherePositiveEffect = ({ show }: SpherePositiveEffectProps) => (
  <SphereGradient
    show={show}
    baseColor="#fff"
    colors={POSITIVE_COLORS}
  />
)

export default SpherePositiveEffect
