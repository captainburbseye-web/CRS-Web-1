/**
 * Physics-Driven Rotary Knob Component
 * Tactile, hardware-authentic control with torque, inertia, and real-time waveform sync
 * 
 * THE 209th LAW: "A knob is not a button. It has weight, it has memory, 
 *                 it has a relationship with the user's hand. If it spins 
 *                 without consequence, it is decoration. If it has torque 
 *                 and settles with purpose, it is an instrument."
 * 
 * Features:
 * - Physics simulation: torque, inertia, friction
 * - GSAP-driven smooth settling animation
 * - Dynamic glow tied to channel CSS variables
 * - Keyboard accessible (Arrow keys ±5, Shift+Arrow ±10)
 * - Touch and mouse support with velocity tracking
 * - Real-time onChange callback for waveform sync
 */

import { useEffect, useRef, useState } from 'hono/jsx'
import gsap from 'gsap'

interface RotaryKnobProps {
  label: string
  min?: number
  max?: number
  defaultValue?: number
  unit?: string
  glowColor?: string
  channel?: string
  onChange?: (value: number) => void
}

export const RotaryKnob = ({
  label,
  min = 0,
  max = 100,
  defaultValue = 50,
  unit = '',
  glowColor = 'var(--glow-cyan)',
  channel = '1',
  onChange
}: RotaryKnobProps) => {
  const [value, setValue] = useState(defaultValue)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const knobRef = useRef<HTMLDivElement>(null)
  const lastAngleRef = useRef(0)
  const velocityRef = useRef(0)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  // Map value (0-100) to rotation angle (-135° to +135°)
  const valueToRotation = (val: number) => {
    return ((val - min) / (max - min)) * 270 - 135
  }

  // Map rotation angle to value
  const rotationToValue = (rot: number) => {
    const normalized = (rot + 135) / 270
    return Math.round(min + normalized * (max - min))
  }

  // Initialize rotation from default value
  useEffect(() => {
    const initialRotation = valueToRotation(defaultValue)
    setRotation(initialRotation)
  }, [])

  // Mouse wheel handler with physics
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    
    // Delta rotation based on wheel speed (torque simulation)
    const delta = e.deltaY > 0 ? -2 : 2
    const newRotation = Math.max(-135, Math.min(135, rotation + delta))
    const newValue = rotationToValue(newRotation)
    
    // Cancel any existing animation
    if (animationRef.current) {
      animationRef.current.kill()
    }
    
    // Smooth GSAP animation with inertia
    animationRef.current = gsap.to(
      { rotation, value },
      {
        rotation: newRotation,
        value: newValue,
        duration: 0.3,
        ease: 'power2.out',
        onUpdate: function() {
          setRotation(this.targets()[0].rotation)
          const updatedValue = Math.round(this.targets()[0].value)
          setValue(updatedValue)
          onChange?.(updatedValue)
        }
      }
    )
  }

  // Keyboard handler for accessibility
  const handleKeyDown = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5
    let delta = 0

    switch(e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        delta = step
        break
      case 'ArrowDown':
      case 'ArrowLeft':
        delta = -step
        break
      default:
        return
    }

    e.preventDefault()
    const newValue = Math.max(min, Math.min(max, value + delta))
    const newRotation = valueToRotation(newValue)
    
    // Animate with GSAP
    gsap.to(
      { rotation, value },
      {
        rotation: newRotation,
        value: newValue,
        duration: 0.2,
        ease: 'power2.out',
        onUpdate: function() {
          setRotation(this.targets()[0].rotation)
          const updatedValue = Math.round(this.targets()[0].value)
          setValue(updatedValue)
          onChange?.(updatedValue)
        }
      }
    )
  }

  // Mouse/touch drag handler
  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging || !knobRef.current) return

    const rect = knobRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate angle from center
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
    let adjustedAngle = angle + 90 // Adjust for 12 o'clock start
    
    // Handle wrap-around
    if (adjustedAngle > 180) adjustedAngle -= 360
    
    // Calculate velocity for inertia
    velocityRef.current = adjustedAngle - lastAngleRef.current
    lastAngleRef.current = adjustedAngle
    
    // Clamp rotation
    const newRotation = Math.max(-135, Math.min(135, adjustedAngle))
    const newValue = rotationToValue(newRotation)
    
    setRotation(newRotation)
    setValue(newValue)
    onChange?.(newValue)
  }

  const handlePointerDown = (e: PointerEvent) => {
    e.preventDefault()
    setIsDragging(true)
    
    if (knobRef.current) {
      const rect = knobRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
      lastAngleRef.current = angle + 90
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    
    // Apply inertia with friction
    if (Math.abs(velocityRef.current) > 0.5) {
      const finalRotation = Math.max(-135, Math.min(135, rotation + velocityRef.current * 3))
      const finalValue = rotationToValue(finalRotation)
      
      gsap.to(
        { rotation, value },
        {
          rotation: finalRotation,
          value: finalValue,
          duration: 0.4,
          ease: 'power3.out',
          onUpdate: function() {
            setRotation(this.targets()[0].rotation)
            const updatedValue = Math.round(this.targets()[0].value)
            setValue(updatedValue)
            onChange?.(updatedValue)
          }
        }
      )
    }
    
    velocityRef.current = 0
  }

  // Event listeners setup
  useEffect(() => {
    const knob = knobRef.current
    if (!knob) return

    knob.addEventListener('wheel', handleWheel as any)
    knob.addEventListener('keydown', handleKeyDown as any)
    knob.addEventListener('pointerdown', handlePointerDown as any)
    window.addEventListener('pointermove', handlePointerMove as any)
    window.addEventListener('pointerup', handlePointerUp as any)

    return () => {
      knob.removeEventListener('wheel', handleWheel as any)
      knob.removeEventListener('keydown', handleKeyDown as any)
      knob.removeEventListener('pointerdown', handlePointerDown as any)
      window.removeEventListener('pointermove', handlePointerMove as any)
      window.removeEventListener('pointerup', handlePointerUp as any)
    }
  }, [rotation, value, isDragging])

  return (
    <div class="rotary-knob-container">
      <label class="knob-label">{label}</label>
      
      <div 
        ref={knobRef}
        class={`rotary-knob ${isDragging ? 'dragging' : ''}`}
        style={`--glow-color: ${glowColor}; transform: rotate(${rotation}deg);`}
        tabIndex={0}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}${unit}`}
        data-channel={channel}
      >
        {/* Knob body with conic gradient */}
        <div class="knob-body">
          {/* Center cap */}
          <div class="knob-cap"></div>
          
          {/* Indicator mark */}
          <div class="knob-indicator"></div>
          
          {/* Grip notches for tactile feel */}
          <div class="knob-notches">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                class="knob-notch"
                style={`transform: rotate(${i * 30}deg) translateY(-25px);`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <div class="knob-value" aria-live="polite">
        {value}{unit}
      </div>
    </div>
  )
}
