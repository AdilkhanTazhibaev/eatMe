import React, { useRef, useState } from 'react'
import styled from 'styled-components'

interface ImageUploadProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
  uploadText?: string
  icon?: React.ReactNode
  selectedImage?: File | null
  selectedImageUrl?: string
}

const ImageUploadContainer = styled.div<{ $hasImage: boolean }>`
  width: 200px;
  height: 200px;
  border: 1px dashed #e7e7eb;
  border-radius: 16px;
  background: ${({ $hasImage }) => ($hasImage ? 'transparent' : '#f5f5fa')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #00ab75;
    background: ${({ $hasImage }) => ($hasImage ? 'transparent' : '#f0f9f6')};
  }
`

const UploadIcon = styled.div<{ $hasImage: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d1d1e;
  opacity: ${({ $hasImage }) => ($hasImage ? 0 : 1)};
  transition: opacity 0.2s ease;
`

const UploadText = styled.p<{ $hasImage: boolean }>`
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #1d1d1e;
  text-align: center;
  margin: 0;
  opacity: ${({ $hasImage }) => ($hasImage ? 0 : 1)};
  transition: opacity 0.2s ease;
`

const HiddenInput = styled.input`
  display: none;
`

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`

const ReplaceOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 16px;

  ${ImageUploadContainer}:hover & {
    opacity: 1;
  }
`

const ReplaceText = styled.span`
  color: white;
  font-family: 'Suisse Intl', sans-serif;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
`

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onFileSelect,
  accept = 'image/*',
  uploadText = 'Upload Photo',
  icon,
  selectedImage,
  selectedImageUrl,
}) => {
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const defaultIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  // Создаем локальный URL для отображения изображения
  React.useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage)
      setLocalImageUrl(url)

      // Очищаем URL при размонтировании
      return () => URL.revokeObjectURL(url)
    } else {
      setLocalImageUrl(null)
    }
  }, [selectedImage])

  // Используем переданный URL или локальный
  const displayImageUrl = selectedImageUrl || localImageUrl
  const hasImage = !!displayImageUrl

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        id="image-upload"
        accept={accept}
        onChange={onFileSelect}
      />
      <ImageUploadContainer $hasImage={hasImage} onClick={handleClick}>
        {hasImage ? (
          <>
            <ImagePreview src={displayImageUrl} alt="Uploaded image" />
            <ReplaceOverlay>
              <ReplaceText>Заменить фото</ReplaceText>
            </ReplaceOverlay>
          </>
        ) : (
          <>
            <UploadIcon $hasImage={hasImage}>{icon || defaultIcon}</UploadIcon>
            <UploadText $hasImage={hasImage}>{uploadText}</UploadText>
          </>
        )}
      </ImageUploadContainer>
    </>
  )
}
