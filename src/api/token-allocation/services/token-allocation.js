'use strict';

/**
 * token-allocation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::token-allocation.token-allocation');
