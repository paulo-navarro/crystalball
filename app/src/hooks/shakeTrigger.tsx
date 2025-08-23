import { useEffect, useRef } from 'react'

type UseShakeOptions = {
  onShake: () => void
  magnitudeThreshold?: number
  timeThresholdMs?: number
  peakWindowMs?: number
  peaksRequired?: number
  alpha?: number
  enabled?: boolean
}

export function useShake ({
  onShake,
  magnitudeThreshold = 12,
  timeThresholdMs = 1000,
  peakWindowMs = 500,
  peaksRequired = 3,
  alpha = 0.8,
  enabled = true
}: UseShakeOptions) {
  const lastShakeTime = useRef(0)
  const gravity = useRef({ x: 0, y: 0, z: 0 })
  const peaks = useRef<number[]>([])
  const onShakeRef = useRef(onShake)

  useEffect(() => {
    onShakeRef.current = onShake
  }, [onShake])

  useEffect(() => {
    if (!enabled) return

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const hasLinear = !!event.acceleration && (
        event.acceleration!.x !== null ||
        event.acceleration!.y !== null ||
        event.acceleration!.z !== null
      )

      let x = 0, y = 0, z = 0

      if (hasLinear) {
        x = event.acceleration!.x ?? 0
        y = event.acceleration!.y ?? 0
        z = event.acceleration!.z ?? 0
      } else if (event.accelerationIncludingGravity) {
        const ax = event.accelerationIncludingGravity.x ?? 0
        const ay = event.accelerationIncludingGravity.y ?? 0
        const az = event.accelerationIncludingGravity.z ?? 0

        gravity.current.x = alpha * gravity.current.x + (1 - alpha) * ax
        gravity.current.y = alpha * gravity.current.y + (1 - alpha) * ay
        gravity.current.z = alpha * gravity.current.z + (1 - alpha) * az

        x = ax - gravity.current.x
        y = ay - gravity.current.y
        z = az - gravity.current.z
      } else {
        return
      }

      const magnitude = Math.sqrt(x * x + y * y + z * z)
      const now = Date.now()

      if (magnitude > magnitudeThreshold) {
        peaks.current.push(now)
        const cutoff = now - peakWindowMs
        while (peaks.current.length && peaks.current[0] < cutoff) {
          peaks.current.shift()
        }
        if (peaks.current.length >= peaksRequired && now - lastShakeTime.current > timeThresholdMs) {
          lastShakeTime.current = now
          peaks.current = []
          onShakeRef.current()
        }
      } else {
        const cutoff = now - peakWindowMs
        while (peaks.current.length && peaks.current[0] < cutoff) {
          peaks.current.shift()
        }
      }
    }

    const addListener = () => window.addEventListener('devicemotion', handleDeviceMotion, { passive: true })
    const removeListener = () => window.removeEventListener('devicemotion', handleDeviceMotion)

    const requestPermission = async () => {
      const dme = DeviceMotionEvent as unknown as { requestPermission?: () => Promise<'granted' | 'denied' | 'prompt'> }
      if (typeof dme?.requestPermission === 'function') {
        try {
          const permissionState = await dme.requestPermission()
          if (permissionState === 'granted') addListener()
        } catch (error) {
          console.error('Error requesting device motion permission:', error)
        }
      } else {
        addListener()
      }
    }

    requestPermission()
    return removeListener
  }, [enabled, magnitudeThreshold, timeThresholdMs, peakWindowMs, peaksRequired, alpha])
}
