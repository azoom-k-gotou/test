const { sanitizeEntity } = require('strapi-utils')
const camelaize = require('camelcase-keys')
const snake = require('snakecase-keys')

exports.camelizeColumns = collectionName => ({
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services[collectionName].search(ctx.query)
    } else {
      entities = await strapi.services[collectionName].find(ctx.query)
    }
    return camelaize(entities.map(entity => sanitizeEntity(entity, { model: strapi.models[collectionName] })), { deep: true })
  },
  async update(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      entity = await strapi.services[collectionName].update({ id: ctx.params.id }, snake(data, {deep: true}), { files })
    } else {
      entity = await strapi.services[collectionName].update({ id: ctx.params.id }, snake(ctx.request.body, { deep: true }))
    }
    return camelaize(sanitizeEntity(entity, { model: strapi.models[collectionName] }), { deep: true })
  },
  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx)
      entity = await strapi.services[collectionName].create(snake(data, { deep: true }), { files })
    } else {
      entity = await strapi.services[collectionName].create(snake(ctx.request.body, { deep: true }))
    }
    return camelaize(sanitizeEntity(entity, { model: strapi.models[collectionName] }), { deep: true })
  },
  async delete(ctx) {
    const entity = await strapi.services[collectionName].delete({ id: ctx.params.id })
    return camelaize(sanitizeEntity(entity, { model: strapi.models[collectionName] }), { deep: true })
  }
})
