import { BootstrapService } from '../services/bootstrapService.ts'
import { OnboardingModule } from './onboarding'
import { AuthModule } from './auth'

export const bootstrapService = new BootstrapService()

bootstrapService.register(OnboardingModule)
bootstrapService.register(AuthModule)
