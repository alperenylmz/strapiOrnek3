'use strict';

/**
 * patch-note service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::patch-note.patch-note');
