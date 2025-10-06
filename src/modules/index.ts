import { MainModule } from '@/modules/main'
import { ProgramsModule } from '@/modules/programs'
import { BootstrapService } from '../services/bootstrapService.ts'
import { AuthModule } from './auth'
import { OnboardingModule } from './onboarding'

export const bootstrapService = new BootstrapService()
bootstrapService.register(MainModule)
bootstrapService.register(OnboardingModule)
bootstrapService.register(AuthModule)
bootstrapService.register(ProgramsModule)
