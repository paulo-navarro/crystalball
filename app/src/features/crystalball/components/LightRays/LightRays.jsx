import "./LightRays.css"

function LightRays() {
    return (
        <svg id="lightRays" viewBox="0 0 132.29166 132.29167" xmlnsXlink="http://www.w3.org/1999/xlink">
            <linearGradient
                inkscape:collect="always"
                id="linearGradient825">
                <stop
                style={{"stopColor": "#ffffff", "stopOpacity": "0.05"}}
                offset="0"
                id="stop821" />
                <stop
                style={{"stopColor": "#ffffff", "stopOpacity": "0"}}
                offset="1"
                id="stop823" />
            </linearGradient>
            <radialGradient
                inkscape:collect="always"
                xlinkHref="#linearGradient825"
                id="radialGradient827"
                cx="396.85059"
                cy="561.26074"
                fx="396.85059"
                fy="561.26074"
                r="432.86035"
                gradientTransform="translate(0,3.8898971e-6)"
                gradientUnits="userSpaceOnUse" />
            <g transform="translate(0,-164.70831)">
                <path
                style={{"fill": "url(#radialGradient827)"}}
                d="M 223.36328,128.40039 C 275.36633,266.86065 327.3682,405.32096 379.37109,543.78125 240.91083,491.77831 102.4505,439.77648 -36.009766,387.77344 V 561.25977 734.74805 C 102.45052,682.74499 240.9108,630.74137 379.37109,578.73828 327.36794,717.19912 275.36654,855.66026 223.36328,994.12109 H 396.84961 570.33789 C 518.33462,855.66024 466.33143,717.19914 414.32812,578.73828 552.789,630.74155 691.25008,682.74479 829.71094,734.74805 V 561.25977 387.77344 C 691.25068,439.77649 552.79037,491.77836 414.33008,543.78125 466.33305,405.32116 518.33493,266.86046 570.33789,128.40039 H 396.84961 Z"
                transform="matrix(0.15281102,0,0,0.15281102,5.5026903,145.08732)"/>
            </g>
        </svg>
  )
}

export default LightRays
