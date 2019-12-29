var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

logger.debug("Some debug messages");
logger.info('Cheese is Comté.');
logger.warn('Cheese is quite smelly.');
logger.error("Error");