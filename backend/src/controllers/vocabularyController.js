const Vocab = require("../models/vocabulary");
const Language = require("../models/language");

// @desc    Add a new vocabulary word
// @route   POST /api/v1/vocab
// @access  Private
const addVocab = async (req, res) => {
  try {
    const { languageId, word, translation, example } = req.body;
    const userId = req.user.id;

    const vocab = await Vocab.create({
      userId,
      languageId,
      word,
      translation,
      example,
    });

    res.status(201).json({
      success: true,
      data: vocab,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get all vocabulary words for the authenticated user
// @route   GET /api/v1/vocab
// @access  Private
const getVocabs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { languageId } = req.query;

    const query = { userId };
    if (languageId) query.languageId = languageId;

    const vocabs = await Vocab.findAll({
      where: query,
      include: [{ model: Language }],
    });

    res.status(200).json({
      success: true,
      count: vocabs.length,
      data: vocabs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Update vocabulary word details or mastered status
// @route   PUT /api/v1/vocab/:id
// @access  Private
const updateVocab = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    let vocab = await Vocab.findOne({ where: { id, userId } });

    if (!vocab) {
      return res.status(404).json({
        success: false,
        message: "Vocabulary word not found",
      });
    }

    vocab = await vocab.update(req.body);

    res.status(200).json({
      success: true,
      data: vocab,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete a vocabulary word
// @route   DELETE /api/v1/vocab/:id
// @access  Private
const deleteVocab = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const vocab = await Vocab.findOne({ where: { id, userId } });

    if (!vocab) {
      return res.status(404).json({
        success: false,
        message: "Vocabulary word not found",
      });
    }

    await vocab.destroy();

    res.status(200).json({
      success: true,
      message: "Vocabulary word removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addVocab,
  getVocabs,
  updateVocab,
  deleteVocab,
};
