// src/modules/auth/stores/auth.store.ts
import { create } from 'zustand'

// import { devtools, persist } from 'zustand/middleware' // опционально

export enum AuthMode {
  Login = 'login',
  Register = 'register',
  Restore = 'restore',
}

/** Шаги по режимам */
export enum RegisterStep {
  EnterPhone = 'EnterPhone',
  EnterName = 'EnterName',
  EnterSendCode = 'EnterSendCode',
  EnterOtpCode = 'EnterOtpCode',
}

export enum LoginStep {
  SelectCity = 'SelectCity',
  SelectLanguage = 'SelectLanguage',
  EnterPhone = 'EnterPhone',
  EnterPinCode = 'EnterPinCode',
}

export enum RestoreStep {
  WelcomeRestore = 'WelcomeRestore',
  EnterSendCode = 'EnterSendCode',
  EnterPinCode = 'EnterPinCode',
}

/** Флоу (последовательность) для каждого режима */
export const registerFlow: RegisterStep[] = [
  RegisterStep.EnterPhone,
  RegisterStep.EnterName,
  RegisterStep.EnterSendCode,
  RegisterStep.EnterOtpCode,
]

export const loginFlow: LoginStep[] = [
  LoginStep.SelectCity,
  LoginStep.SelectLanguage,
  LoginStep.EnterPhone,
  LoginStep.EnterPinCode,
]

export const restoreFlow: RestoreStep[] = [
  RestoreStep.WelcomeRestore,
  RestoreStep.EnterSendCode,
  RestoreStep.EnterPinCode,
]

const flowsByMode = {
  [AuthMode.Register]: registerFlow,
  [AuthMode.Login]: loginFlow,
  [AuthMode.Restore]: restoreFlow,
} as const

/** Объединённый тип шага (удобно для goToStep) */
export type AnyStep = RegisterStep | LoginStep | RestoreStep

type State = {
  // текущий режим
  mode: AuthMode

  // данные
  city?: string
  language?: 'ru' | 'kk' | 'en'
  name?: string
  phone: string
  pin?: string

  // шаги
  registerStep: RegisterStep
  loginStep: LoginStep
  restoreStep: RestoreStep

  // селекторы/геттеры
  currentStep(): AnyStep
  canNext(): boolean
  canPrev(): boolean
  isFirst(): boolean
  isLast(): boolean

  // экшены
  setMode(mode: AuthMode): void // смена режима (без сброса данных)
  toStart(mode?: AuthMode): void // перейти к первому шагу режима
  goToStep(step: AnyStep): void // перейти к конкретному шагу (в текущем режиме)
  next(): void
  prev(): void
  patch(
    data: Partial<
      Omit<
        State,
        | 'currentStep'
        | 'canNext'
        | 'canPrev'
        | 'isFirst'
        | 'isLast'
        | 'setMode'
        | 'toStart'
        | 'goToStep'
        | 'next'
        | 'prev'
        | 'patch'
        | 'reset'
      >
    >,
  ): void
  reset(): void // полный сброс
}

// фабрики индексов
const indexOfStep = (mode: AuthMode, step: AnyStep) => {
  const flow = flowsByMode[mode] as readonly AnyStep[]
  return flow.indexOf(step)
}

export const useAuthStore = create<State>((set, get) => ({
  /** --- initial --- */
  mode: AuthMode.Register,
  phone: '',

  registerStep: RegisterStep.EnterPhone,
  loginStep: LoginStep.SelectCity,
  restoreStep: RestoreStep.WelcomeRestore,

  /** --- selectors --- */
  currentStep: () => {
    const { mode, registerStep, loginStep, restoreStep } = get()
    return mode === AuthMode.Register
      ? registerStep
      : mode === AuthMode.Login
        ? loginStep
        : restoreStep
  },

  canNext: () => {
    const mode = get().mode
    const step = get().currentStep()
    const flow = flowsByMode[mode] as readonly AnyStep[]
    const i = flow.indexOf(step)
    return i >= 0 && i < flow.length - 1
  },

  canPrev: () => {
    const mode = get().mode
    const step = get().currentStep()
    const flow = flowsByMode[mode] as readonly AnyStep[]
    const i = flow.indexOf(step)
    return i > 0
  },

  isFirst: () => {
    const mode = get().mode
    const step = get().currentStep()
    const flow = flowsByMode[mode] as readonly AnyStep[]
    return flow[0] === step
  },

  isLast: () => {
    const mode = get().mode
    const step = get().currentStep()
    const flow = flowsByMode[mode] as readonly AnyStep[]
    return flow[flow.length - 1] === step
  },

  /** --- actions --- */
  setMode: (mode) => set({ mode }),

  toStart: (mode) =>
    set((state) => {
      const m = mode ?? state.mode
      if (m === AuthMode.Register) return { mode: m, registerStep: registerFlow[0] }
      if (m === AuthMode.Login) return { mode: m, loginStep: loginFlow[0] }
      return { mode: m, restoreStep: restoreFlow[0] }
    }),

  goToStep: (step) =>
    set((state) => {
      const { mode } = state
      const flow = flowsByMode[mode] as readonly AnyStep[]
      if (!flow.includes(step)) return {} // игнор, если шаг не из текущего режима
      if (mode === AuthMode.Register) return { registerStep: step as RegisterStep }
      if (mode === AuthMode.Login) return { loginStep: step as LoginStep }
      return { restoreStep: step as RestoreStep }
    }),

  next: () => {
    const { mode } = get()
    const flow = flowsByMode[mode] as readonly AnyStep[]
    const cur = get().currentStep()
    const i = flow.indexOf(cur)
    if (i >= 0 && i < flow.length - 1) {
      const next = flow[i + 1]
      set(
        mode === AuthMode.Register
          ? { registerStep: next as RegisterStep }
          : mode === AuthMode.Login
            ? { loginStep: next as LoginStep }
            : { restoreStep: next as RestoreStep },
      )
    }
  },

  prev: () => {
    const { mode } = get()
    const flow = flowsByMode[mode] as readonly AnyStep[]
    const cur = get().currentStep()
    const i = flow.indexOf(cur)
    if (i > 0) {
      const prev = flow[i - 1]
      set(
        mode === AuthMode.Register
          ? { registerStep: prev as RegisterStep }
          : mode === AuthMode.Login
            ? { loginStep: prev as LoginStep }
            : { restoreStep: prev as RestoreStep },
      )
    }
  },

  patch: (data) => {
    // защита: не позволяем перетирать служебные поля через patch
    const {
      mode,
      registerStep,
      loginStep,
      restoreStep,
      currentStep,
      canNext,
      canPrev,
      isFirst,
      isLast,
      setMode,
      toStart,
      goToStep,
      next,
      prev,
      patch,
      reset,
      ...safe
    } = { ...(data as any) }
    set(safe as Partial<State>)
  },

  reset: () =>
    set({
      mode: AuthMode.Register,
      phone: '',
      city: undefined,
      language: undefined,
      name: undefined,
      pin: undefined,
      registerStep: RegisterStep.EnterPhone,
      loginStep: LoginStep.SelectCity,
      restoreStep: RestoreStep.WelcomeRestore,
    }),
}))

/** useAuth(mode => mode.canNext()) — чтобы не пересоздавать объекты */
export const useAuth = <T>(selector: (s: State) => T) => useAuthStore(selector)
