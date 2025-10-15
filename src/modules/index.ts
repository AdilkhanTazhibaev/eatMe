import { AddressModule } from '@/modules/address'
import { CheckoutModule } from '@/modules/checkout'
import { CheckoutAllergensModule } from '@/modules/checkoutAllergens'
import { CheckoutInvoiceModule } from '@/modules/checkoutInvoice'
import { CommentModule } from '@/modules/comments'
import { DeliveryModule } from '@/modules/delivery'
import { MainModule } from '@/modules/main'
import { NutritionPricingModule } from '@/modules/nutritionPricing'
import { ProgramsModule } from '@/modules/programs'
import { PromocodeModule } from '@/modules/promocodes'
import { CartsModule } from '@/modules/сarts'
import { BootstrapService } from '../services/bootstrapService.ts'
import { AuthModule } from './auth'
import { OnboardingModule } from './onboarding'

export const bootstrapService = new BootstrapService()
bootstrapService.register(MainModule)
bootstrapService.register(OnboardingModule)
bootstrapService.register(AuthModule)
bootstrapService.register(ProgramsModule)
bootstrapService.register(CartsModule)
bootstrapService.register(NutritionPricingModule)
bootstrapService.register(CheckoutModule)
bootstrapService.register(CheckoutAllergensModule)
bootstrapService.register(CheckoutInvoiceModule)
bootstrapService.register(AddressModule)
bootstrapService.register(CommentModule)
bootstrapService.register(PromocodeModule)
bootstrapService.register(DeliveryModule)
