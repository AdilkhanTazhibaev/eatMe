import { CardWrapper } from '@/components/snippets'
import type { Program } from '@/modules/programs/types.ts'
import { ProgramItem } from '@/modules/programs/views/ProgramItem.tsx'

interface Props {}

export function ProgramsList() {
  const mockPrograms: Program[] = [
    {
      id: 'standard',
      name: 'Стандарт',
      description: 'Полезное, сбалансированное питание на каждый день',
      kcalRange: [900, 2500],
      mealsPerDay: 5,
      options: [
        {
          kcal: 900,
          meals: 5,
          exampleMeal: {
            title: 'Завтрак (9:00–10:00)',
            description: 'Макароны по-флотски с нежным фаршем.',
            image: '/images/meals/makarony.png',
          },
        },
        {
          kcal: 1200,
          meals: 5,
          exampleMeal: {
            title: 'Обед (13:00–14:00)',
            description: 'Куриная грудка с рисом и овощами.',
            image: '/images/meals/chicken-rice.png',
          },
        },
        {
          kcal: 1500,
          meals: 5,
          exampleMeal: {
            title: 'Ужин (19:00–20:00)',
            description: 'Рыбное филе с овощным гарниром.',
            image: '/images/meals/fish.png',
          },
        },
      ],
      priceHidden: true,
    },
    {
      id: 'fitness',
      name: 'Фитнес',
      description: 'Лёгкое питание для снижения веса и поддержания формы',
      kcalRange: [800, 1800],
      mealsPerDay: 4,
      options: [
        {
          kcal: 1000,
          meals: 4,
          exampleMeal: {
            title: 'Завтрак',
            description: 'Овсянка с ягодами и орехами.',
            image: '/images/meals/oatmeal.png',
          },
        },
        {
          kcal: 1500,
          meals: 4,
          exampleMeal: {
            title: 'Ужин',
            description: 'Куриное филе гриль с овощами.',
            image: '/images/meals/chicken-grill.png',
          },
        },
      ],
      priceHidden: true,
    },
    {
      id: 'premium',
      name: 'Премиум',
      description: 'Разнообразное питание с блюдами ресторанного уровня',
      kcalRange: [1200, 3000],
      mealsPerDay: 6,
      options: [
        {
          kcal: 2000,
          meals: 6,
          exampleMeal: {
            title: 'Обед',
            description: 'Стейк из говядины с овощами гриль.',
            image: '/images/meals/steak.png',
          },
        },
        {
          kcal: 2500,
          meals: 6,
          exampleMeal: {
            title: 'Ужин',
            description: 'Филе лосося с киноа.',
            image: '/images/meals/salmon.png',
          },
        },
      ],
      priceHidden: true,
    },
    {
      id: 'vegan',
      name: 'Веган',
      description: 'Полностью растительное питание без продуктов животного происхождения',
      kcalRange: [1000, 2200],
      mealsPerDay: 5,
      options: [
        {
          kcal: 1200,
          meals: 5,
          exampleMeal: {
            title: 'Обед',
            description: 'Салат с нутом и киноа.',
            image: '/images/meals/quinoa-salad.png',
          },
        },
        {
          kcal: 1800,
          meals: 5,
          exampleMeal: {
            title: 'Ужин',
            description: 'Тофу стир-фрай с овощами.',
            image: '/images/meals/tofu.png',
          },
        },
      ],
      priceHidden: true,
    },
    {
      id: 'lowcarb',
      name: 'Низкоуглеводное',
      description: 'Питание с минимальным количеством углеводов для контроля сахара',
      kcalRange: [900, 2000],
      mealsPerDay: 4,
      options: [
        {
          kcal: 1200,
          meals: 4,
          exampleMeal: {
            title: 'Обед',
            description: 'Индейка с брокколи на пару.',
            image: '/images/meals/turkey.png',
          },
        },
        {
          kcal: 1600,
          meals: 4,
          exampleMeal: {
            title: 'Ужин',
            description: 'Яйца пашот с овощами.',
            image: '/images/meals/eggs.png',
          },
        },
      ],
      priceHidden: true,
    },
    {
      id: 'detox',
      name: 'Детокс',
      description: 'Лёгкое питание и смузи для очищения организма',
      kcalRange: [600, 1200],
      mealsPerDay: 3,
      options: [
        {
          kcal: 800,
          meals: 3,
          exampleMeal: {
            title: 'Завтрак',
            description: 'Смузи из шпината, яблока и банана.',
            image: '/images/meals/smoothie.png',
          },
        },
        {
          kcal: 1000,
          meals: 3,
          exampleMeal: {
            title: 'Ужин',
            description: 'Суп-пюре из тыквы.',
            image: '/images/meals/pumpkin-soup.png',
          },
        },
      ],
      priceHidden: true,
    },
    {
      id: 'kids',
      name: 'Детское',
      description: 'Здоровое питание для детей с учётом их потребностей',
      kcalRange: [1000, 1800],
      mealsPerDay: 4,
      options: [
        {
          kcal: 1200,
          meals: 4,
          exampleMeal: {
            title: 'Обед',
            description: 'Куриные котлеты с картофельным пюре.',
            image: '/images/meals/chicken-cutlets.png',
          },
        },
        {
          kcal: 1500,
          meals: 4,
          exampleMeal: {
            title: 'Ужин',
            description: 'Овощное рагу с индейкой.',
            image: '/images/meals/stew.png',
          },
        },
      ],
      priceHidden: true,
    },
  ]

  return (
    <>
      {mockPrograms.map((f, i) => (
        <CardWrapper style={{ marginBottom: 16 }} key={i} $color={0}>
          <ProgramItem {...f} />
        </CardWrapper>
      ))}
    </>
  )
}
