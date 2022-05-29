import Joi from 'joi'

export const getTodos = {
  query: Joi.object().keys({
    id: Joi.string().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    title: Joi.string().required(),
    description: Joi.string(),
  }),
}
