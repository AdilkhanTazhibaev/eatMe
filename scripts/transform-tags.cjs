// CommonJS модуль — так проще подключить в orval.config.js
/** @typedef {import('openapi3-ts').OpenAPIObject} OpenAPIObject */

/** Твой словарь "русский тег" -> "английский slug" (дополняй по мере надобности) */
const MAP = {
  'сервис-логистики': 'logistics-service',
  'сервис-программ-питания': 'nutrition-program-service',
  'сервис-расчета-калорий': 'calorie-calculation-service',
  'сервис-авторизации-клиенты': 'auth-clients-service',
  'сервис-авторизации-сотрудники': 'auth-staff-service',
  'сервис-сотрудников': 'employees-service',
  'сервис-бизнес-юнитов': 'business-units-service',
  'сервис-планирования-питания': 'meal-planning-service',
  'сервис-ролей': 'roles-service',
  'сервис-справочника-блюд': 'dishes-catalog-service',
  'сервис-промокодов': 'promocodes-service',
}

/** Примитивная транслитерация ru->en на случай неизвестных тегов */
function translit(str = '') {
  const map = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  }
  return str.toLowerCase().replace(/[а-яё]/g, (ch) => map[ch] ?? ch)
}

/** Слаг для имени папки */
function slugify(str = '') {
  return str
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')
}

/** Преобразуем имя тега */
function toEnTag(name) {
  if (!name) return name
  if (MAP[name]) return MAP[name]
  return slugify(translit(name))
}

/** @param {OpenAPIObject} schema */
module.exports = function transform(schema) {
  // 1) Переименовать список тегов в корне
  if (Array.isArray(schema.tags)) {
    schema.tags = schema.tags.map((t) => ({ ...t, name: toEnTag(t.name) }))
  }

  // 2) Переименовать теги у каждой операции
  if (schema.paths) {
    for (const p of Object.keys(schema.paths)) {
      const pathItem = schema.paths[p]
      for (const m of ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace']) {
        const op = pathItem?.[m]
        if (op?.tags?.length) op.tags = op.tags.map((t) => toEnTag(String(t)))
      }
    }
  }

  return schema
}
