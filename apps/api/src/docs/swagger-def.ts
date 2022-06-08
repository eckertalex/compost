import {version} from '../../package.json'
import {config} from '../config/config'

export const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Compost API documentation',
    description: 'API spec documentation for compost',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/eckertalex/compost/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Dev server',
    },
  ],
}
