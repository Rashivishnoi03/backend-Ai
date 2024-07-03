const History = require("../Models/HistoryModel");

const createHistory = async (req, res, next) => {
  try {
    const { query } = req.body;
    const history = await History.create({
      userId: req.user.id,
      query,
    });
    res.status(201).json({
      success: "true",
      history,
    });
  } catch (error) {
    res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id });
    res.status(200).json({
      success: "true",
      history,
    });
  } catch (error) {
    res.status(200).json({
      success: "false",
      message: error.message,
    });
  }
};

module.exports = { createHistory, getHistory };
