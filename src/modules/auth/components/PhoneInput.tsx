import { useMemo, useState } from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
  defaultCode?: string // '+7'
}

const COUNTRIES = [
  { code: '+7', label: 'KZ' },
  { code: '+998', label: 'UZ' },
  { code: '+996', label: 'KG' },
  { code: '+374', label: 'AM' },
]

function formatKz(v: string) {
  // 7000000000 -> 700 000 00 00
  const digits = v.replace(/\D/g, '').slice(0, 10)
  const parts = [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 8),
    digits.slice(8, 10),
  ].filter(Boolean)
  return parts.join(' ')
}

export default function PhoneInput({ value, onChange, defaultCode = '+7' }: Props) {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState(defaultCode)

  const placeholder = useMemo(() => (code === '+7' ? '700 000 00 00' : '___ ___ __ __'), [code])

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-11 min-w-[74px] items-center justify-center rounded-xl border px-3"
          onClick={() => setOpen((v) => !v)}
        >
          {code}
        </button>

        <input
          inputMode="tel"
          autoComplete="tel"
          className="h-11 flex-1 rounded-xl border px-3"
          placeholder={placeholder}
          value={code === '+7' ? formatKz(value) : value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {open && (
        <div className="mt-2 overflow-hidden rounded-xl border">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setCode(c.code)
                setOpen(false)
              }}
              className="h-11 w-full px-4 text-left hover:bg-black/5"
            >
              {c.label} {c.code}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
