import { Cryptid } from "../models/cryptid.mjs";

export const getCryptids = async (req, res, next) => {
  const { size, area, name, limit = 10, page = 1, sort = '-createdAt' } = req.query;
  //console.log('Request URL:', req.originalUrl);

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

    const options = {
      page: parseInt(page) || 1,
      limit: Math.min(parseInt(limit) || 10, 20), // 最大20件まで
      sort: sort ? { [sort.replace("-", "")]: sort.startsWith("-") ? -1 : 1 } : { updatedAt: -1 },
    };

    // ページネーション付きでデータ取得
    const result = await Cryptid.paginate(query, options);

    // フロントで扱いやすい形にして返す
    res.json({
      cryptids: result.docs, // データ本体
      pagination: {
        totalDocs: result.totalDocs, // 総件数
        totalPages: result.totalPages, // 総ページ数
        currentPage: result.page, // 現在のページ
        hasNextPage: result.hasNextPage, // 次のページがあるか
        hasPrevPage: result.hasPrevPage, // 前のページがあるか
      },
    });

  } catch (error) {
    console.log(`Error occurred:${error}`);
    next(error);
  }
};

export const getCryptidById = async (req, res, next) => {
  try {
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
  } catch(error) {
    console.log(`Error occurred:${error}`);
    next(error);
  }
};

export const getCryptidCount = async (req, res, next) => {
  try {
    const count = await Cryptid.countDocuments();
    res.json({ count });
  } catch (error) {
    console.log(`Error occurred:${error}`);
    next(error);
  }
};