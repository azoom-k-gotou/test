const { sanitizeEntity } = require('strapi-utils')
const camelcaseKeys = require('camelcase-keys')
const { snake } = require('to-case')

const underscore = obj => {
  return Object.entries(obj).reduce((o, [key, value]) => {
    o[snake(key)] = value
    return o
  }, {})
}

exports.camelizeColumns = collectionName => ({
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services[collectionName].search(ctx.query);
    } else {
      entities = await strapi.services[collectionName].find(ctx.query);
    }
    return camelcaseKeys(entities.map(entity => sanitizeEntity(entity, { model: strapi.models[collectionName] })), { deep: true })
  },
  async update(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services[collectionName].update({ id: ctx.params.id }, data, { files });
    } else {
      entity = await strapi.services[collectionName].update({ id: ctx.params.id }, underscore(ctx.request.body));
    }
    return camelcaseKeys(sanitizeEntity(entity, { model: strapi.models[collectionName] }), { deep: true })
  },
  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services[collectionName].create(data, { files });
    } else {
      entity = await strapi.services[collectionName].create(underscore(ctx.request.body));
    }
    return camelcaseKeys(sanitizeEntity(entity, { model: strapi.models[collectionName] }), { deep: true })
  },
  async delete(ctx) {
    const entity = await strapi.services[collectionName].delete({ id: ctx.params.id });
    return camelcaseKeys(sanitizeEntity(entity, { model: strapi.models[collectionName] }), { deep: true })
  }
})
