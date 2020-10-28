const Label = require("../models/label");

exports.getLabels = async (req, res) => {
  try {
    const labels = await Label.findAll();
    return res.status(200).json({ labels });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "라벨 불러오기 성공" });
  }
};
