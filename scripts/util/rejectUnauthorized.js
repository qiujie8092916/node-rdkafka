var pkg = require('../../package.json');

/**
 * Get the value of a CLI argument
 *
 * @param {String} name
 * @param {Array} args
 * @api private
 */
function getArgument(name, args) {
  var flags = args || process.argv.slice(2),
    index = flags.lastIndexOf(name);

  if (index === -1 || index + 1 >= flags.length) {
    return null;
  }

  return flags[index + 1];
}

/**
 * Get the value of reject-unauthorized
 * If environment variable RDKAFKA_REJECT_UNAUTHORIZED is non-zero,
 * .npmrc variable rdkafka_reject_unauthorized or
 * process argument --rdkafka-reject_unauthorized is provided,
 * set rejectUnauthorized to true
 * Else set to false by default
 *
 * @return {Boolean} The value of rejectUnauthorized
 * @api private
 */
module.exports = function() {
  var rejectUnauthorized = false;

  if (getArgument('--rdkafka-reject-unauthorized')) {
    rejectUnauthorized = getArgument('--rdkafka-reject-unauthorized');
  } else if (process.env.RDKAFKA_REJECT_UNAUTHORIZED !== '0') {
    rejectUnauthorized = true;
  } else if (process.env.npm_config_rdkafka_reject_unauthorized) {
    rejectUnauthorized = process.env.npm_config_rdkafka_reject_unauthorized;
  } else if (pkg.nodeRdkafkaConfig && pkg.nodeRdkafkaConfig.rejectUnauthorized) {
    rejectUnauthorized = pkg.nodeRdkafkaConfig.rejectUnauthorized;
  }

  return rejectUnauthorized;
};
