const EditoraModel = require("../models/editoraModel");

// Renderiza a página principal
const buscarEditoras = async (req, res) => {
  try {
    const editoras = await EditoraModel.find();
    
    res.json(editoras);
    /*
    if (editoras === null) {
      res.status(404).render("home", { editoras });    // trocar pela página contendo todas as editoras
    } else {
      res.status(200).render("home", { editoras });    // trocar pela página contendo todas as editoras
    }
    */
  } catch (error) {
    res.status(404).send(error);
  }
};

// Renderiza a página de adicionar editora
const novaEditora = async (req, res) => {
  try {
    res.status(200).render("adicionaEditora");      // trocar pela página de adicionar editora
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Renderiza a página para atualizar e deletar a editora
const inspecionaEditora = async (req, res) => {
  try {
    const editora = await EditoraModel.findById(req.params.id);
    res.status(200).render("update", { editora });    // trocar pela página de atualizar e deletar editora
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Adiciona uma editora
const adicionarEditora = async (req, res) => {
  try {
    const editora = await EditoraModel.create(req.body);
    //res.status(302).redirect("/");                      // trocar pela rota da página com listagem de editoras
    res.json(editora);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Atualiza os dados da editora
const atualizarEditora = async (req, res) => {
  try {
    const editora = await EditoraModel.findByIdAndUpdate(req.params.id, req.body);
    res.json(editora);
    //res.status(200).redirect("/");                     // trocar pela rota da página com listagem de editoras
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Deleta uma editora
const deletarEditora = async (req, res) => {
  try {
    const editora = await EditoraModel.findByIdAndRemove(req.params.id);
    res.json(editora);
    //res.status(302).redirect("/");                     // trocar pela rota da página com listagem de editoras
  } catch (error) {
    res.status(500).send(error.message);
  }
};



/* 
 * Aqui ele vai buscar as editoras utilizando a operação regular regex
 * que vai trazer as editoras que tiverem a parte buscado compondo a String localDeOrigem.
*/
const buscaPLocal = async (req, res) => {
    try {
      const editoras = await EditoraModel.find({ localDeOrigem: { $regex: req.body.buscaLocal, $options : 'i' }});
      res.status(200).render("editora", { editoras });            //trocar "home" pela página de busca da editora.
      // res.json(editoras);
    } catch (error) {
      res.status(500).send(error.message);
    }
};
  
module.exports = {
    buscaPLocal,
    buscarEditoras,
    novaEditora,
    inspecionaEditora,
    adicionarEditora,
    atualizarEditora,
    deletarEditora,
};