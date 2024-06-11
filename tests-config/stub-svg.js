const path = require("path");

module.exports = {
  process(src, filename) {
    return {
      code: `
        const React = require("react");
        module.exports = () => React.createElement("svg", {
          children: ${JSON.stringify(path.basename(filename))}
        });
      `,
    };
  },

  getCacheKey(src, filename) {
    return path.basename(filename);
  },
};
