import Joi from 'joi'

export const getTasks = {
  query: Joi.object().keys({
    skip: Joi.string(),
    take: Joi.string(),
  }),
}

export const getTask = {
  params: Joi.object().keys({
    uuid: Joi.string().required(),
  }),
}
