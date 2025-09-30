import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'

interface InputProps {
  type?: 'text' | 'password' | 'email'
  placeholder?: string
  label?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  size?: '600-56px'
  disabled?: boolean
  error?: string
  mask?: string
  maxLength?: number
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  position: relative;
`

const InputWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #e7e7eb;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;
  height: 56px;

  &:focus-within {
    border-color: #00ab75;
    box-shadow: 0 0 0 3px rgba(210, 238, 229, 1);
  }

  &:hover {
    border-color: #00ab75;
  }

  ${({ hasError }) =>
    hasError &&
    `
    border-color: #FF3B30;
    background: #FFFFFF;
  `}
`

const StyledInput = styled.input<{ $hasValue: boolean; $hasLabel: boolean }>`
  flex: 1;
  border: none;
  background: transparent;
  font-family: 'Suisse Intl', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #1d1d1e;
  outline: none;
  padding: 0;
  height: 24px;
  z-index: 2;
  margin-top: ${({ $hasValue, $hasLabel }) => ($hasValue && $hasLabel ? '15px' : '0')};

  &::placeholder {
    color: transparent;
  }

  &:disabled {
    color: #a1a1a6;
    cursor: not-allowed;
  }
`

const FloatingLabel = styled.label.withConfig({
  shouldForwardProp: (prop) => !['active', 'error'].includes(prop),
})<{ active: boolean; error?: boolean }>`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Suisse Intl', sans-serif;
  font-size: 16px;
  color: ${({ error }) => (error ? '#FF3B30' : '#565658')};
  background: transparent;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;
  padding: 0 4px;

  ${({ active, error }) =>
    active &&
    css`
      left: 10px;
      top: 8px;
      font-size: 14px;
      color: ${error ? '#FF3B30' : '#565658'};
      transform: translateY(0);
    `}
`

const PasswordToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #565658;
  z-index: 2;

  &:hover {
    color: #1d1d1e;
  }
`

const ErrorText = styled.span`
  font-family: 'Suisse Intl', sans-serif;
  font-size: 14px;
  line-height: 1.4;
  color: #ff3b30;
`

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  label,
  value,
  onChange,
  onBlur,
  size = '600-56px',
  disabled = false,
  error,
  maxLength,
  mask,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value

    // Если есть маска (префикс), применяем ограничение только для цифр
    if (mask) {
      const prefix = mask
      if (newValue.startsWith(prefix)) {
        // Сохраняем префикс, убираем все не-цифры после него
        const afterPrefix = newValue.substring(prefix.length)
        const digitsOnly = afterPrefix.replace(/\D/g, '')
        newValue = prefix + digitsOnly
      } else {
        // Если не начинается с префикса, убираем все не-цифры
        newValue = newValue.replace(/\D/g, '')
      }
    }
    // Если маски нет, оставляем как есть (обычные инпуты)

    onChange(newValue)
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.() // Вызываем пользовательский onBlur если он передан
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputType = type === 'password' && showPassword ? 'text' : type
  const isActive = value?.length > 0 // Убираем isFocused из условия

  return (
    <InputContainer>
      <InputWrapper hasError={!!error}>
        {label && (
          <FloatingLabel htmlFor={label} active={isActive} error={!!error}>
            {label}
          </FloatingLabel>
        )}
        <StyledInput
          ref={inputRef}
          id={label}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          $hasValue={value?.length > 0}
          $hasLabel={!!label}
        />
        {type === 'password' && (
          <PasswordToggle
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.7917 11.2428C21.7318 9.43192 18.4763 5 12 5C5.52374 5 2.26819 9.43192 1.20827 11.2428C0.930577 11.7173 0.930577 12.2827 1.20827 12.7572C2.26819 14.5681 5.52374 19 12 19C18.4763 19 21.7318 14.5681 22.7917 12.7572C23.0694 12.2827 23.0694 11.7173 22.7917 11.2428ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                ></path>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            ) : (
              <svg
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.6961 18.3984L2.72555 1.42789L4.13974 0.0136719L7.82121 3.69515C8.8535 3.26622 9.9267 2.99977 11 2.99977C16.5013 2.99977 22 9.99977 22 9.99977C22 9.99977 20.394 12.0443 18.0495 13.9234L21.1103 16.9842L19.6961 18.3984ZM17.269 11.9748C17.0574 12.1543 16.8428 12.3297 16.6258 12.4997L14.921 10.7949C14.9728 10.5379 15 10.272 15 9.99977C15 7.79063 13.2091 5.99977 11 5.99977C10.7277 5.99977 10.4618 6.02697 10.2049 6.0788L9.3827 5.25663C9.93444 5.09116 10.4769 4.99977 11 4.99977C12.994 4.99977 15.269 6.3277 17.269 8.02474C18.0922 8.72332 18.8013 9.42612 19.3412 9.99977C18.8013 10.5734 18.0922 11.2762 17.269 11.9748Z"
                  fill="#3A3A3B"
                />
                <path
                  d="M14.5923 16.1231L13.0633 14.594C12.3581 14.8528 11.6635 14.9998 11 14.9998C9.00598 14.9998 6.73097 13.6718 4.73104 11.9748C3.90777 11.2762 3.19871 10.5734 2.6588 9.99977C3.19871 9.42612 3.90777 8.72332 4.73104 8.02474C5.05136 7.75293 5.37874 7.49059 5.71089 7.24166L4.28354 5.8143C1.75944 7.75997 0 9.99977 0 9.99977C0 9.99977 5.49873 16.9998 11 16.9998C12.2174 16.9998 13.4347 16.657 14.5923 16.1231Z"
                  fill="#3A3A3B"
                />
                <path
                  d="M7.20412 8.73488C7.0717 9.13243 7 9.55773 7 9.99977C7 12.2089 8.79086 13.9998 11 13.9998C11.442 13.9998 11.8673 13.9281 12.2649 13.7957L10.3666 11.8974C9.77154 11.6989 9.30089 11.2282 9.10236 10.6331L7.20412 8.73488Z"
                  fill="#3A3A3B"
                />
              </svg>
            )}
          </PasswordToggle>
        )}
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  )
}
