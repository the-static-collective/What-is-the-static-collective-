const { validateHumanWitnessEventV0 } = require("./validate.cjs");
const { humanWitnessEventId } = require("./event-id.cjs");
const { adapterKey, resolveWitnessAdapter } = require("./route.cjs");
const {
  TOASTER_REPOSITORY,
  TOASTER_SPECIMENS,
  renderToasterEvidencePacket,
} = require("./adapters/toaster.cjs");
const {
  VAULT_REPOSITORY,
  VAULT_GATE_ID,
  renderVaultEvidencePacket,
} = require("./adapters/vault.cjs");

const defaultRegistry = new Map();
for (const specimen of TOASTER_SPECIMENS) {
  const key = `${TOASTER_REPOSITORY}#elastic-topology-response-v1-field-witness/${specimen}`;
  defaultRegistry.set(key, {
    render(event, { eventId }) {
      return renderToasterEvidencePacket(event, { eventId });
    },
  });
}
defaultRegistry.set(`${VAULT_REPOSITORY}#${VAULT_GATE_ID}`, {
  render(event, { eventId }) {
    return renderVaultEvidencePacket(event, { eventId });
  },
});

function invalidEventError(errors) {
  const error = new Error("Human witness event is invalid");
  error.code = errors[0]?.code ?? "WITNESS_EVENT_INVALID";
  error.errors = errors;
  return error;
}

function validateWitnessEvent(input) {
  const result = validateHumanWitnessEventV0(input);
  if (!result.ok) throw invalidEventError(result.errors);
  return result.event;
}

function prepareWitnessRoutingPacket(input, registry = defaultRegistry) {
  const event = validateWitnessEvent(input);
  const eventId = humanWitnessEventId(event);
  const key = adapterKey(event);
  const adapter = resolveWitnessAdapter(event, registry);
  return {
    eventId,
    event,
    adapterKey: key,
    projectDisposition: "pending-project-admission",
    routing: adapter.render(event, { eventId }),
  };
}

function prepareValidateOnlyPacket(input) {
  const event = validateWitnessEvent(input);
  return {
    eventId: humanWitnessEventId(event),
    event,
    projectDisposition: "pending-project-admission",
  };
}

module.exports = {
  defaultRegistry,
  prepareValidateOnlyPacket,
  prepareWitnessRoutingPacket,
  validateWitnessEvent,
};
