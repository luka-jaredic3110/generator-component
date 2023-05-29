import { fixture, assert, html } from "@open-wc/testing";

import <%= className %> from "./element.js";

describe("<%= tagName %>", () => {
  it("initialize", async () => {
    const element = await fixture(html`<<%= tagName %>></<%= tagName %>>`);

    assert.instanceOf(element, <%= className %>);
  });

  it("default render", async () => {
    const element = await fixture(html`<<%= tagName %>></<%= tagName %>>`);

    assert.shadowDom.equal(
      element,
      `
        Hello from <%= tagName %> component!
      `
    );
  });
});
