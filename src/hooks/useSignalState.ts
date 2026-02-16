/**
 * Global Signal State Hook
 * Manages the real-time signal flow between knobs and waveforms
 * 
 * THE 210th LAW: "A closed circuit between touch and sight is the only 
 *                 way to prove the rack is real."
 */

import { useState, useCallback } from 'hono/jsx'

export interface ChannelSignal {
  inputGain: number      // 0-100 dB
  monitorMix: number     // 0-100 %
  signalLevel: number    // 0-100 dB
  amplitude: number      // Computed: signalLevel / 100
  frequency: number      // Computed: inputGain / 50
}

export interface SignalState {
  channels: Record<string, ChannelSignal>
  updateChannel: (channel: string, param: keyof ChannelSignal, value: number) => void
  getChannel: (channel: string) => ChannelSignal
}

const DEFAULT_SIGNAL: ChannelSignal = {
  inputGain: 75,
  monitorMix: 60,
  signalLevel: 85,
  amplitude: 0.85,
  frequency: 1.5
}

export const useSignalState = (): SignalState => {
  const [channels, setChannels] = useState<Record<string, ChannelSignal>>({
    '1': { ...DEFAULT_SIGNAL },
    '2': { ...DEFAULT_SIGNAL },
    '3': { ...DEFAULT_SIGNAL },
    '4': { ...DEFAULT_SIGNAL },
    '5': { ...DEFAULT_SIGNAL },
    '6': { ...DEFAULT_SIGNAL },
    '7': { ...DEFAULT_SIGNAL }
  })

  const updateChannel = useCallback((channel: string, param: keyof ChannelSignal, value: number) => {
    setChannels(prev => {
      const ch = prev[channel] || { ...DEFAULT_SIGNAL }
      
      // Update the parameter
      const updated = { ...ch, [param]: value }
      
      // Compute derived values
      if (param === 'signalLevel') {
        updated.amplitude = value / 100
      }
      if (param === 'inputGain') {
        updated.frequency = value / 50
      }
      
      return {
        ...prev,
        [channel]: updated
      }
    })
  }, [])

  const getChannel = useCallback((channel: string): ChannelSignal => {
    return channels[channel] || { ...DEFAULT_SIGNAL }
  }, [channels])

  return {
    channels,
    updateChannel,
    getChannel
  }
}
