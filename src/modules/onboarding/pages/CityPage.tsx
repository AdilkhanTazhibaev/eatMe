import { CityList } from '../components/CityList'

export default function CityPage() {
  const cities = [
    { id: 'almaty', name: 'Алматы' },
    { id: 'astana', name: 'Астана' },
    { id: 'shymkent', name: 'Шымкент' },
    { id: 'tashkent', name: 'Ташкент' },
    { id: 'dubai', name: 'Dubai' },
  ]

  return (
    <div>
      <CityList items={cities} />
    </div>
  )
}
