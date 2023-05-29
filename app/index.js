const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
  }

  // Helpers
  _getFolderName() {
    return this.options.name.replaceAll("-", "_");
  }

  _getTagName() {
    return `${this.config.get("prefix")}-${this.options.name}`;
  }

  _getClassName() {
    const wordsOfName = this.options.name.split("-");

    for (let i = 0; i < wordsOfName.length; i++) {
      const oldWord = wordsOfName[i];
      const newWord = oldWord[0].toUpperCase() + oldWord.slice(1).toLowerCase();
      wordsOfName[i] = newWord;
    }

    return wordsOfName.join("");
  }

  _getApplicationElementSource() {
    return this.config.get("prefix") === "ef"
      ? "../application_element/element.js"
      : "@effectivastudio/lit-components";
  }

  // Generator
  writing() {
    // add element.js
    this.fs.copyTpl(
      this.templatePath("element.js"), // from
      this.destinationPath(`components/${this._getFolderName()}/element.js`), // to
      {
        className: this._getClassName(),
        tagName: this._getTagName(),
        applicationElementSource: this._getApplicationElementSource(),
      } // args
    );

    // add {element}.stories.js
    this.fs.copyTpl(
      this.templatePath("element.stories.js"), // from
      this.destinationPath(
        `components/${this._getFolderName()}/${this._getFolderName()}.stories.js`
      ), // to
      { className: this._getClassName(), tagName: this._getTagName() } // args
    );

    // add spec.js
    this.fs.copyTpl(
      this.templatePath("spec.js"), // from
      this.destinationPath(`components/${this._getFolderName()}/spec.js`), // to
      { className: this._getClassName(), tagName: this._getTagName() } // args
    );

    // add style.lit.css
    this.fs.copyTpl(
      this.templatePath("style.lit.css"), // from
      this.destinationPath(`components/${this._getFolderName()}/style.lit.css`) // to
    );

    // add translations.js
    this.fs.copyTpl(
      this.templatePath("translations.js"), // from
      this.destinationPath(
        `components/${this._getFolderName()}/translations.js`
      ) // to
    );
  }
};
