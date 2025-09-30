import React from 'react'
import styled from 'styled-components'

interface SearchInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  icon?: React.ReactNode
}

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
`

const SearchInputField = styled.input`
  width: 100%;
  height: 56px;
  padding: 16px 16px 16px 48px;
  border: 2px solid #e7e7eb;
  border-radius: 12px;
  background: #e7e7eb;
  font-family: 'Suisse Intl', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #1d1d1e;
  box-sizing: border-box;
  transition: all 0.2s linear;

  &:focus {
    outline: none;
    border-color: #00ab75;
  }

  &:hover {
    border-color: #00ab75;
  }

  &::placeholder {
    color: #565658;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3a3a3b;
`

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder, icon }) => {
  return (
    <SearchInputContainer>
      {icon && <SearchIcon>{icon}</SearchIcon>}
      <SearchInputField type="text" value={value} onChange={onChange} placeholder={placeholder} />
    </SearchInputContainer>
  )
}
