import SphereGradient from '../SphereGradient/SphereGradient'

interface SphereNegativeEffectProps {
  show: boolean
}

const NEGATIVE_COLORS: [string, string, string, string] = [
  '#024629',
  '#064e01',
  '#5b6b00',
  '#036947'
]

const SphereNegativeEffect = ({ show }: SphereNegativeEffectProps) => (
  <SphereGradient
    show={show}
    baseColor="#00150c"
    colors={NEGATIVE_COLORS}
    opacity={0.6}
    reverse
  />
)

export default SphereNegativeEffect
