import webComponentAutoConfig from "../../.storybook/web_component_helpers.js";

import "./element.js";

const config = webComponentAutoConfig("<%= tagName %>");

export default {
  title: "Generated/<%= className %>",
  ...config,
  parameters: {
    // layout: "padded",
  },
};

export const ADemo = {
  args: {
    exampleProp: 'Hello',
  },
};
