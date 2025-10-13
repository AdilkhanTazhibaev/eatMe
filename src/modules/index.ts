import { AddressModule } from '@/modules/address'
import { CheckoutModule } from '@/modules/checkout'
import { CheckoutAllergensModule } from '@/modules/checkoutAllergens'
import { CheckoutInvoiceModule } from '@/modules/checkoutInvoice'
import { MainModule } from '@/modules/main'
import { NutritionPricingModule } from '@/modules/nutritionPricing'
import { ProgramsModule } from '@/modules/programs'
import { CartsModule } from '@/modules/сarts'
import { BootstrapService } from '../services/bootstrapService.ts'
import { AuthModule } from './auth'
import { OnboardingModule } from './onboarding'
import { DeliveryModule } from '@/modules/comments'

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
bootstrapService.register(DeliveryModule)
