const { ERRORS } = require("./constants.cjs");

function adapterKey(event) {
  return `${event.subject.repository}#${event.subject.gateId}`;
}

function resolveWitnessAdapter(event, registry) {
  const key = adapterKey(event);
  const adapter = registry.get(key);
  if (!adapter) {
    const error = new Error(`No witness adapter registered for ${key}`);
    error.code = ERRORS.TARGET_UNKNOWN;
    error.target = key;
    throw error;
  }
  return adapter;
}

module.exports = { adapterKey, resolveWitnessAdapter };
