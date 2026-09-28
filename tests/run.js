import assert from "node:assert";
import { gapOf, readyToPromote, promotedInto } from "../learner.js";
import { step, close } from "../learnrun.js";
import { render } from "../app.js";

const base = {
  budget: 1, lag: 1,
  state: { lead: [], members: [], promotes: [], ledger: [], applied: [] },
  events: [{ id: 1, kind: "lead", item: "a" }],
  bad_item_code: "E_BAD_ITEM", bad_node_code: "E_BAD_NODE",
  bad_kind_code: "E_BAD_KIND", bad_upto_code: "E_BAD_UPTO",
  over_code: "E_OVER", back_code: "E_BACK",
  no_node_code: "E_NO_NODE", not_learner_code: "E_NOT_LEARNER",
  lag_code: "E_LAG", event_error_code: "E_BAD_EVENT"
};

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("gapOf returns a number", () => {
  assert.strictEqual(typeof gapOf(["a"], 0), "number");
});

check("readyToPromote returns a boolean", () => {
  assert.strictEqual(typeof readyToPromote(1, 1), "boolean");
});

check("promotedInto returns a list", () => {
  assert.ok(Array.isArray(promotedInto([["n1", "学习", 1]], "n1")));
});

check("step returns a state", () => {
  assert.strictEqual(typeof step(base).state, "object");
});

check("render counts events", () => {
  assert.strictEqual(typeof render(base).count_events, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
