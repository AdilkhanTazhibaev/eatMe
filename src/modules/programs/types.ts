export type ProgramOption = {
  kcal: number
  meals: number
  exampleMeal: {
    title: string
    description: string
    image: string
  }
}

export type Program = {
  id: string
  name: string
  description: string
  kcalRange: [number, number]
  mealsPerDay: number
  options: ProgramOption[]
  priceHidden: boolean
}

export type ProgramCard = {
  id: string
  name: string
  description: string
  kcal: number
  mealsPerDay: number
  durationDays: number
  sets: number
  price: number
  currency: string
}
