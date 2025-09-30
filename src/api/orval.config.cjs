const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const swaggerUrl = process.env.VITE_SWAGGER_URL
if (!swaggerUrl) throw new Error('❌ VITE_SWAGGER_URL is not defined in .env')

module.exports = {
  api: {
    input: {
      target: swaggerUrl,
      override: {
        transformer: path.resolve(__dirname, '../../scripts/transform-tags.cjs'),
      },
    },
    output: {
      target: './generated/api.ts',
      schemas: './generated/model',
      client: 'vue-query',
      mode: 'tags-split',
      clean: true,
      override: {
        mutator: { path: './custom-axios.ts', name: 'customAxios' },
        useQuery: true,
        useMutation: true,
      },
    },
    hooks: { enabled: true },
  },
}
