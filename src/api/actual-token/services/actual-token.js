'use strict';

/**
 * actual-token service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::actual-token.actual-token');
