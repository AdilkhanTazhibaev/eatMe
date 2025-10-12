import { NutritionPricingScreen } from '@/modules/nutritionPricing/screens/NutritionPricingScreen.tsx'
import { type RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/nutrition-pricing',
    element: <NutritionPricingScreen />,
  },
]
