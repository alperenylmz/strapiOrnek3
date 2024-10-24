'use strict';

/**
 * token-allocation router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::token-allocation.token-allocation');
