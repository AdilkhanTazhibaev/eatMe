import Arrow from '@/assets/icons/arrow.svg?react'
import { TopBar } from '@ui/Topbar'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface BackTopBarProps {
  title?: string
  caption?: string
  right?: React.ReactNode
}

export function BackTopBar({ title, caption, right }: BackTopBarProps) {
  const navigate = useNavigate()

  return (
    <TopBar
      size={48}
      noWrap={false}
      left={<Arrow onClick={() => navigate(-1)} />}
      title={title}
      caption={caption}
      right={right}
    />
  )
}
