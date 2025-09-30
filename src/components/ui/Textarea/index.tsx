import React from 'react'
import styled from 'styled-components'

interface TextAreaProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  maxLength?: number
  placeholder?: string
  label?: string
  characterCountText?: string
}

const TextAreaContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`

const TextAreaWrapper = styled.div<{ $hasValue: boolean }>`
  position: relative;
  width: 100%;
`

const FloatingLabel = styled.label<{ $active: boolean }>`
  position: absolute;
  left: 13px;
  top: ${({ $active }) => ($active ? '10px' : '16px')};
  font-family: 'Suisse Intl', sans-serif;
  font-size: ${({ $active }) => ($active ? '14px' : '16px')};
  color: #565658;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;
  padding: 0 4px;
`

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  padding-top: ${({ value }) => (value ? '22px' : '16px')};
  border: 2px solid #e7e7eb;
  border-radius: 12px;
  font-family: 'Suisse Intl', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #1d1d1e;
  background: #e7e7eb;
  resize: vertical;
  min-height: 156px;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &::placeholder {
    color: #565658;
  }

  &:hover {
    border-color: #00ab75;
  }

  &:focus {
    outline: none;
    border-color: #00ab75;
    box-shadow: 0 0 0 3px rgba(210, 238, 229, 1);
  }
`

const CaptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CaptionText = styled.span`
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: #3a3a3b;
`

const Counter = styled.span<{ $isNearLimit: boolean; $isAtLimit: boolean }>`
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: ${({ $isNearLimit, $isAtLimit }) =>
    $isAtLimit ? '#FF3B30' : $isNearLimit ? '#FF9500' : '#3a3a3b'};
  transition: color 0.2s ease;
`

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  maxLength,
  placeholder,
  label,
  characterCountText = 'Доступно символов',
}) => {
  return (
    <TextAreaContainer>
      <TextAreaWrapper $hasValue={!!value}>
        {label && <FloatingLabel $active={!!value}>{label}</FloatingLabel>}
        <StyledTextArea
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      </TextAreaWrapper>

      {maxLength && (
        <CaptionRow>
          <CaptionText>{characterCountText}</CaptionText>
          <Counter
            $isNearLimit={value.length >= maxLength * 0.83}
            $isAtLimit={value.length >= maxLength}
          >
            {value.length} из {maxLength}
          </Counter>
        </CaptionRow>
      )}
    </TextAreaContainer>
  )
}
