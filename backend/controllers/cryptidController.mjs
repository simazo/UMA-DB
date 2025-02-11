import { Cryptid } from "../models/cryptid.mjs";

export const getCryptids = async (req, res, next) => {
  const { size, area, name } = req.query;

  try {
    // クエリパラメータが少なくとも1つは存在するかチェック
    if (!size && !area && !name) {
      const error = new Error("At least one query parameter (size, area, name) is required.");
      error.status = 400;
      return next(error);
    }

    // 名前で絞り込み
    if (name) {
      const filteredByName = await Cryptid.find({ name: { $regex: name, $options: "i" } }).sort({ updatedAt: -1 });
      return res.json(filteredByName);
    }

    // サイズで絞り込み
    if(size) {
      const filteredBySize = await Cryptid.find({ size: size }).sort({ updatedAt: -1 });
      return res.json(filteredBySize);
    }

    // 地域で絞り込み
    if(area) {
      const filteredByArea = await Cryptid.find({ area: Number(area) }).sort({ updatedAt: -1 });
      return res.json(filteredByArea); 
    }
  } catch (error) {
    console.log(`Error occurred:${error}`);
    next(error);
  }
};

export const getCryptidById = async (req, res, next) => {
  const cryptid = await Cryptid.findById(req.params.id);
  
  if (cryptid === null) {
    const error = new Error("Cryptid Not Found");
    error.status = 404;
    return next(error);
  }

  res.json(cryptid);
};