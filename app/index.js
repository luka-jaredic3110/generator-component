const Generator = require("yeoman-generator");

function snakeToCapitalCase(snakeCaseWords) {
  const words = snakeCaseWords.split("-");
  for (let i = 0; i < words.length; i++) {
    const oldWord = words[i];
    const newWord = oldWord[0].toUpperCase() + oldWord.slice(1).toLowerCase();
    words[i] = newWord;
  }
  return words.join("");
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
  }

  // getters
  get folderName() {
    return this.options.name.replaceAll("-", "_");
  }

  get tagName() {
    return `${this.config.get("prefix")}-${this.options.name}`;
  }

  get className() {
    return snakeToCapitalCase(this.options.name);
  }

  get applicationElementSource() {
    return this.config.get("prefix") === "ef"
      ? "../application_element/element.js"
      : "@effectivastudio/lit-components";
  }

  get templateArgs() {
    return {
      tagName: this.tagName,
      className: this.className,
      folderName: this.folderName,
      applicationElementSource: this.applicationElementSource,
    };
  }

  get elementPath() {
    return `components/${this.folderName}/element.js`;
  }

  get storiesPath() {
    return `components/${this.folderName}/${this.folderName}.stories.js`;
  }

  get specPath() {
    return `components/${this.folderName}/spec.js`;
  }

  get stylePath() {
    return `components/${this.folderName}/style.lit.css`;
  }

  get translationsPath() {
    return `components/${this.folderName}/translations.js`;
  }

  // Generator
  initialization() {
    if (!this.config.get("prefix")) {
      throw new Error(
        "Prefix undefined, you most likely haven't created .yo-rc.json file in the project root."
      );
    }
  }

  writing() {
    // add element.js
    this.fs.copyTpl(
      this.templatePath("element.js"),
      this.destinationPath(this.elementPath),
      this.templateArgs
    );

    // add {element}.stories.js
    this.fs.copyTpl(
      this.templatePath("element.stories.js"),
      this.destinationPath(this.storiesPath),
      this.templateArgs
    );

    // add spec.js
    this.fs.copyTpl(
      this.templatePath("spec.js"),
      this.destinationPath(this.specPath),
      this.templateArgs
    );

    // add style.lit.css
    this.fs.copyTpl(
      this.templatePath("style.lit.css"),
      this.destinationPath(this.stylePath)
    );

    // add translations.js
    this.fs.copyTpl(
      this.templatePath("translations.js"),
      this.destinationPath(this.translationsPath)
    );
  }
};
