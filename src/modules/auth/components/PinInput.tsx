import { useEffect, useRef } from 'react'

type Props = {
  length?: number
  value: string
  onChange: (v: string) => void
  onComplete?: (v: string) => void
}

export default function PinInput({ length = 4, value, onChange, onComplete }: Props) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value.length === length && onComplete) onComplete(value)
  }, [length, onComplete, value])

  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className="flex h-14 select-none items-center justify-center rounded-full border text-xl"
            onClick={() => ref.current?.focus()}
          >
            {value[i] ?? ''}
          </div>
        ))}
      </div>

      <input
        ref={ref}
        className="pointer-events-none absolute inset-0 opacity-0"
        inputMode="numeric"
        maxLength={length}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
      />
    </div>
  )
}
