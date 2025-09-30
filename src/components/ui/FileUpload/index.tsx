import React, { useRef, useState } from 'react'
import styled from 'styled-components'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number // в MB
  multiple?: boolean
}

const UploadArea = styled.div<{ $isDragOver: boolean; $hasFile: boolean }>`
  border: 1.4px dashed
    ${({ $isDragOver, $hasFile }) => ($hasFile ? '#00AB75' : $isDragOver ? '#00AB75' : '#d8d8dd')};
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  background: ${({ $isDragOver, $hasFile }) =>
    $hasFile ? '#F0F9F6' : $isDragOver ? '#F0F9F6' : '#ffffff'};
  margin-bottom: 24px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #00ab75;
    background: #f0f9f6;
  }
`

const UploadText = styled.div`
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #1d1d1e;
  margin-bottom: 4px;
`

const UploadButton = styled.button`
  background: #d2eee5;
  color: #00ab75;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.2s ease;

  &:hover {
    background: #b8e4d4;
  }
`

const UploadRequirements = styled.div`
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #737376;
  margin-top: 12px;
`

const HiddenInput = styled.input`
  display: none;
`

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '.pdf',
  maxSize = 50,
  multiple = false,
}) => {
  const { t } = {
    t: () => '',
  }
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    // Проверка размера файла
    if (file.size > maxSize * 1024 * 1024) {
      alert(`${t('fileTooLarge')} ${maxSize}${t('mb')}`)
      return
    }

    // Проверка типа файла
    if (accept && !file.name.toLowerCase().endsWith(accept.replace('.', ''))) {
      alert(`${t('unsupportedFileType')} ${accept}`)
      return
    }

    onFileSelect(file)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <UploadArea
      $isDragOver={isDragOver}
      $hasFile={false}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <UploadText>{t('dragFileHere')}</UploadText>
      <UploadText>{t('or')}</UploadText>
      <UploadButton
        onClick={(e) => {
          e.stopPropagation()
          handleButtonClick()
        }}
      >
        {t('selectFile')}
      </UploadButton>
      <UploadRequirements>
        {t('maxOneFile')} {maxSize} {t('mb')}
      </UploadRequirements>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
      />
    </UploadArea>
  )
}
