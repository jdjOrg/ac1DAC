const mongoose = require("mongoose");

const editoraSchema = new mongoose.Schema({
  localDeOrigem: {
    type: String,
    required: true,
  },
  nomeFantasia: {
    type: String,
    required: true,
  },
});

const EditoraModel = mongoose.model("editora", editoraSchema);

module.exports = EditoraModel;
