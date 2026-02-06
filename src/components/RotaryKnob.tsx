import { useRef, useEffect, useState } from 'hono/jsx'
import gsap from 'gsap'

interface RotaryKnobProps {
  label: string
  min?: number
  max?: number
  defaultValue?: number
  onChange?: (value: number) => void
  channel?: string
  unit?: string
}

export const RotaryKnob = ({ 
  label, 
  min = 0, 
  max = 100, 
  defaultValue = 50,
  onChange,
  channel = 'default',
  unit = ''
}: RotaryKnobProps) => {
  const [value, setValue] = useState(defaultValue)
  const [rotation, setRotation] = useState(((defaultValue - min) / (max - min)) * 270 - 135)
  const knobRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startY = useRef(0)
  const startRotation = useRef(0)

  // Wheel event handler with torque physics
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    
    // Simulate torque with subtle latency
    const delta = e.deltaY > 0 ? -2 : 2
    const newRotation = Math.max(-135, Math.min(135, rotation + delta))
    const normalizedValue = ((newRotation + 135) / 270) * (max - min) + min
    const clampedValue = Math.round(Math.max(min, Math.min(max, normalizedValue)))
    
    setRotation(newRotation)
    setValue(clampedValue)
    onChange?.(clampedValue)
    
    // GSAP animation for settling physics
    if (knobRef.current) {
      gsap.to(knobRef.current, {
        rotation: newRotation,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  // Mouse drag start
  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true
    startY.current = e.clientY
    startRotation.current = rotation
    document.body.style.cursor = 'grabbing'
    e.preventDefault()
  }

  // Mouse drag move
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return
    
    const deltaY = startY.current - e.clientY
    const rotationDelta = deltaY * 0.5 // Sensitivity
    const newRotation = Math.max(-135, Math.min(135, startRotation.current + rotationDelta))
    const normalizedValue = ((newRotation + 135) / 270) * (max - min) + min
    const clampedValue = Math.round(Math.max(min, Math.min(max, normalizedValue)))
    
    setRotation(newRotation)
    setValue(clampedValue)
    onChange?.(clampedValue)
    
    if (knobRef.current) {
      gsap.to(knobRef.current, {
        rotation: newRotation,
        duration: 0.1,
        ease: 'power1.out'
      })
    }
  }

  // Mouse drag end
  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false
      document.body.style.cursor = 'default'
    }
  }

  // Touch drag start
  const handleTouchStart = (e: TouchEvent) => {
    isDragging.current = true
    startY.current = e.touches[0].clientY
    startRotation.current = rotation
    e.preventDefault()
  }

  // Touch drag move
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return
    
    const deltaY = startY.current - e.touches[0].clientY
    const rotationDelta = deltaY * 0.5
    const newRotation = Math.max(-135, Math.min(135, startRotation.current + rotationDelta))
    const normalizedValue = ((newRotation + 135) / 270) * (max - min) + min
    const clampedValue = Math.round(Math.max(min, Math.min(max, normalizedValue)))
    
    setRotation(newRotation)
    setValue(clampedValue)
    onChange?.(clampedValue)
    
    if (knobRef.current) {
      gsap.to(knobRef.current, {
        rotation: newRotation,
        duration: 0.1,
        ease: 'power1.out'
      })
    }
  }

  // Touch drag end
  const handleTouchEnd = () => {
    isDragging.current = false
  }

  // Keyboard accessibility
  const handleKeyDown = (e: KeyboardEvent) => {
    let newValue = value
    
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      newValue = Math.min(max, value + 1)
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      newValue = Math.max(min, value - 1)
    } else if (e.key === 'Home') {
      newValue = min
    } else if (e.key === 'End') {
      newValue = max
    } else {
      return
    }
    
    const newRotation = ((newValue - min) / (max - min)) * 270 - 135
    setRotation(newRotation)
    setValue(newValue)
    onChange?.(newValue)
    
    if (knobRef.current) {
      gsap.to(knobRef.current, {
        rotation: newRotation,
        duration: 0.2,
        ease: 'power2.out'
      })
    }
    
    e.preventDefault()
  }

  // Attach/detach event listeners
  useEffect(() => {
    const knob = knobRef.current
    if (!knob) return

    knob.addEventListener('wheel', handleWheel as any)
    knob.addEventListener('mousedown', handleMouseDown as any)
    knob.addEventListener('touchstart', handleTouchStart as any)
    knob.addEventListener('keydown', handleKeyDown as any)
    
    document.addEventListener('mousemove', handleMouseMove as any)
    document.addEventListener('mouseup', handleMouseUp as any)
    document.addEventListener('touchmove', handleTouchMove as any)
    document.addEventListener('touchend', handleTouchEnd as any)

    return () => {
      knob.removeEventListener('wheel', handleWheel as any)
      knob.removeEventListener('mousedown', handleMouseDown as any)
      knob.removeEventListener('touchstart', handleTouchStart as any)
      knob.removeEventListener('keydown', handleKeyDown as any)
      
      document.removeEventListener('mousemove', handleMouseMove as any)
      document.removeEventListener('mouseup', handleMouseUp as any)
      document.removeEventListener('touchmove', handleTouchMove as any)
      document.removeEventListener('touchend', handleTouchEnd as any)
    }
  }, [rotation, value])

  return (
    <div class="rotary-knob-container">
      <label class="knob-label">{label}</label>
      <div 
        ref={knobRef}
        class={`rotary-knob channel-${channel}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        tabIndex={0}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={`${label} control`}
        title={`${label}: ${value}${unit} (scroll/drag/arrow keys to adjust)`}
      >
        <div class="knob-indicator" />
        <div class="knob-center" />
      </div>
      <div class="knob-value">{value}{unit}</div>
    </div>
  )
}
