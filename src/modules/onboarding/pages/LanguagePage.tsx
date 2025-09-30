import { LanguageList } from '../components/LanguageList.tsx'

export default function LanguagePage() {
  const languages = [
    { id: 'kk', name: 'Қазақ тілі' },
    { id: 'ru', name: 'Русский язык' },
  ]

  return (
    <div>
      <LanguageList items={languages} />
    </div>
  )
}
