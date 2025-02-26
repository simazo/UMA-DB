import { Cryptid } from "../models/cryptid.mjs";

export const getCryptids = async (req, res, next) => {
  const { size, area, name, limit = 10, page = 1 } = req.query;
  console.log('Request URL:', req.originalUrl);

  try {
    let query = {};

    if (name) {
      query.$or = [
        { name: { $regex: name, $options: "i" } },
        { alias: { $regex: name, $options: "i" } }
      ];
    }
    if (size) {
      query.size = size;
    }
    if (area) {
      query.area = Number(area);
    }

    const limitValue = Math.min(parseInt(limit) || 10, 20); // 上限20件まで 
    const skipValue = (parseInt(page) - 1) * limitValue;

    // sortがあれば指定、なければupdatedAtの降順
    const sortValue = req.query.sort ? { [req.query.sort.replace('-', '')]: req.query.sort.startsWith('-') ? -1 : 1 } : { updatedAt: -1 };

    const cryptids = await Cryptid.find(query)
    .sort(sortValue)
    .skip(skipValue)
    .limit(limitValue);
  
    res.json(cryptids);

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

  // 関連するUMAのデータを_idとnameだけ取得
  const relatedUMAs = await Cryptid.find(
    { id: { $in: cryptid.related_uma } }, 
    "_id name"
  ) || [];

  // console.log("--relatedUMAs--");
  // console.log(relatedUMAs);

  res.json({ ...cryptid.toObject(), related_uma: relatedUMAs });
};