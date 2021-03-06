const _ = require("lodash");
const fs = require("fs");

const config = {
  title: "MAS-RAD | CAS-DAR | Developpement Frontend Avancé",
  version: "2020",
  repoUrl: "https://github.com/MediaComem/comem-masrad-dfa",
  remark: {
    highlightLines: true,
    highlightSpans: true,
    countIncrementalSlides: false,
    navigation: {
      click: false,
      scroll: false,
      touch: true
    }
  },
  publish: {
    gitUrl: "git@github.com:MediaComem/comem-masrad-dfa.git",
    baseUrl: "https://mediacomem.github.io/comem-masrad-dfa",
    branch: "gh-pages",
    version: "2020"
  },
  subjectScripts: ["https://embed.runkit.com"]
};

// Load `config.local.js` if it exists
if (fs.existsSync("./config.local.js")) {
  _.merge(config, require("./config.local"));
}

module.exports = config;
