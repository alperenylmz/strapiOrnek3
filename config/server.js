module.exports = ({ env }) => ({
  host: env('HOST', 'strapi-ornek3.vercel.app'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
