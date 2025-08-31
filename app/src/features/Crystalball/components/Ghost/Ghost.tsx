import { useState } from 'react'
import './Ghost.css'

type GhostProps = {
  left: number
  reversed?: boolean
}

const Ghost = ({ left, reversed = false }: GhostProps) => {
  const [delay] = useState(Math.random() * 15000)

  return <svg
    width="400"
    height="700"
    viewBox="0 0 105.83333 185.20833"
    id="ghost"
    style={{ left: `${left}%`, animationDelay: `${delay}ms` }}
    className={reversed ? 'reversed' : ''}
  >
    <defs id="defs2">
      <linearGradient id="linearGradient1701">
        <stop style={{ stopColor: '#ffffff', stopOpacity: 0.71249998 }} offset="0" id="stop1697"></stop>
        <stop style={{ stopColor: '#ffffff', stopOpacity: 0 }} offset="1" id="stop1699"></stop>
      </linearGradient>
      <radialGradient
        xlinkHref="#linearGradient1701"
        id="radialGradient1703"
        cx="81.468216"
        cy="84.290016"
        fx="81.468216"
        fy="84.290016"
        r="45.910381"
        gradientTransform="matrix(-1.3969656,0.01351814,-0.03835923,-3.9640456,198.26589,394.79057)"
        gradientUnits="userSpaceOnUse"
      >
      </radialGradient>
      <filter
        colorInterpolationFilters="sRGB"
        id="filter3305"
        x="-0.13027638"
        y="-0.068044901"
        width="1.2605528"
        height="1.1360898">
        <feGaussianBlur
          stdDeviation="5"
          result="fbSourceGraphic"
          id="feGaussianBlur3297" />
        <feGaussianBlur
          stdDeviation="0.01"
          in="SourceGraphic"
          result="result1"
          id="feGaussianBlur3299" />
        <feComposite
          in2="result1"
          operator="arithmetic"
          in="fbSourceGraphic"
          k2="0.5"
          k3="0.5"
          result="result2"
          id="feComposite3301" />
        <feBlend
          in2="fbSourceGraphic"
          mode="normal"
          result="result3"
          id="feBlend3303" />
      </filter>
    </defs>
    <g style={{
      filter: 'url(#filter3305)',
      transform: 'scale(0.9, 0.9) translate(-29.910145px,-12.165428px)'
    }}>
      <path
        id="ghost_body"
        d="m 82.930339,20.56567 c -23.703064,0.0161 -43.120405,18.831157 -43.88311,42.521952 h -0.05271 v 1.413867 c -1.176986,15.342936 -3.992437,27.970661 0,33.330194 4.018698,9.709497 2.444912,19.418987 0,29.128477 -3.011686,10.73503 -2.518954,20.83289 0,30.56235 3.608628,9.82599 2.380397,19.65197 0,29.47796 6.704798,1.72885 14.962942,2.02633 18.450597,5.93368 5.503709,6.16601 16.576576,1.65428 25.416684,3.09565 7.98648,1.30219 16.763474,1.94731 24.22535,-2.80846 5.79766,-3.69509 12.3934,-7.05121 19.77901,-6.22087 -1.62978,-8.90668 -2.9195,-17.99647 0,-29.35276 1.12954,-8.45219 3.57552,-14.83569 0,-30.68155 -0.49632,-9.35169 -3.96364,-16.79344 0,-29.012248 2.23739,-7.421824 2.03398,-18.911643 0,-33.452423 v -1.413867 h -0.0253 C 126.07779,39.386211 106.64403,20.566993 82.930339,20.56567 Z">
      </path>
      <ellipse
        id="ghost_mount"
        cx="82.826813"
        cy="105.10189"
        rx="12.018885"
        ry="15.223921"></ellipse>
      <path
        id="ghost_left_eye"
        style={{
          fill: '#000000',
          fillOpacity: 0.247664,
          strokeWidth: 0.246266,
          stroke: 'none'
        }}
        d="m 50.985809,66.052 c 5.243502,-1.964057 6.366282,0.227503 15.397892,-9.861134 3.64608,-3.603896 8.302412,-12.973122 10.938239,4.226137 0.800901,6.570286 -5.395774,12.291446 -4.474736,16.224256 1.00184,5.817412 -3.576047,8.441767 -7.633673,7.756456 0.627284,0.416977 -1.763697,-9.14978 -8.190741,-8.880092 -4.276943,6.676375 -11.700492,-5.68958 -6.036981,-9.465623 z"
      ></path>
      <path
        id="ghost_right_eye"
        style={{
          fill: '#000000',
          fillOpacity: 0.247664,
          strokeWidth: 0.280763,
          stroke: 'none'
        }}
        d="m 115.91244,59.519764 c -5.97799,-2.239177 -7.25805,0.259371 -17.554783,-11.242457 -4.156813,-4.108722 -9.465392,-14.790365 -12.47044,4.818123 -0.913089,7.490635 6.151601,14.013202 5.101546,18.496909 -1.142175,6.6323 4.07697,9.624268 8.702979,8.842962 -0.715153,0.475386 2.010748,-10.431459 9.338068,-10.123993 4.87605,7.611584 13.33947,-6.486563 6.88263,-10.791544 z"
      ></path>
    </g>
  </svg>
}

export default Ghost