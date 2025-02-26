// モデル層が正しい結果を返すことを前提としてCryptidモデルをモック化し、
// コントローラーが正しい振る舞いをするかを確認する

import { getCryptidById, getCryptids } from "../controllers/cryptidController.mjs";
import { Cryptid } from "../models/cryptid.mjs";

// Cryptidモデルで使っているmongooseのメソッドをモック化
jest.mock("../models/cryptid.mjs", () => {
  return {
    Cryptid: {
      find: jest.fn().mockReturnValue(),
      findById: jest.fn(),
    },
  };
});

describe("getCryptidById", () => {
  const mockReq = (params) => ({ params });
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const mockNext = jest.fn();
  const mockData = {
    id: 1,
    name: "Bigfoot",
    size: "L",
    area: 1,
    toObject: jest.fn().mockReturnValue({
      id: 1,
      name: "Bigfoot",
      size: "L",
      area: 1,
      //related_uma: [], // 空の配列として定義
    }),
  };

  test("存在するIDの場合、cryptidを返す", async () => {
    // findByIdメソッドがmockDataを返すように設定
    Cryptid.findById.mockResolvedValue(mockData);

    // findメソッドが空の配列を返すように設定
    Cryptid.find.mockResolvedValue([]);

    const req = mockReq({ id: mockData.id });
    const res = mockRes();

    await getCryptidById(req, res, mockNext);
    
    expect(res.json).toHaveBeenCalledWith({
      ...mockData.toObject(),
      related_uma: []
    });

    expect(mockNext).not.toHaveBeenCalled();  // エラーが渡されていないことを確認
  });

  test("存在しないIDの場合、エラーをnextに渡す", async () => {
    // モックのfindByIdがnullを返すように設定（存在しないID）
    Cryptid.findById.mockResolvedValue(null);

    const req = mockReq({ id: 0 });
    const res = mockRes();

    await getCryptidById(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error("Cryptid Not Found"));
  });
});

describe("getCryptids", () => {
  const mockReq = (query) => ({ query });
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("nameクエリパラメータで絞り込み", async () => {
    const mockData = [{
      name: "人面犬",
      size: "S",
      area: 1
    }];

    const req = mockReq({ name: "犬" });
    const res = mockRes();

    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockData),
    });

    await getCryptids(req, res, mockNext);

    expect(Cryptid.find).toHaveBeenCalledWith({
      $or: [
        { name: { $regex: "犬", $options: "i" } },
        { alias: { $regex: "犬", $options: "i" } }
      ]
    });
    
    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("sizeクエリパラメータで絞り込み", async () => {
    const mockData = [{
      name: "ネッシー",
      size: "L",
      area: 2
    }];

    const req = mockReq({ size: "L" });
    const res = mockRes();

    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockData),
    });

    await getCryptids(req, res, mockNext);

    expect(Cryptid.find).toHaveBeenCalledWith({ size: "L" });
    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("areaクエリパラメータで絞り込み", async () => {
    const mockData = [{
      name: "xxxx",
      size: "S",
      area: 3
    }];

    const req = mockReq({ area: 3 });
    const res = mockRes();

    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockData),
    });

    await getCryptids(req, res, mockNext);

    expect(Cryptid.find).toHaveBeenCalledWith({ area: 3 });
    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("sortが指定されていない場合、updatedAtの降順にソートされる", async () => {
    const mockData = [
      {
        name: "Bigfoot",
        size: "L",
        area: 1,
        createdAt: "2024-02-23T00:00:00.000Z"
      },
      {
        name: "Nessie",
        size: "XL",
        area: 2,
        createdAt: "2024-02-22T00:00:00.000Z"
      }
    ];

    const req = mockReq({});
    const res = mockRes();

    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockData),
    });

    await getCryptids(req, res, mockNext);

    // Cryptid.findの呼び出しで、updatedAtの降順（-1）でソートされているかを確認
    expect(Cryptid.find().sort).toHaveBeenCalledWith({ updatedAt: -1 });  // 降順確認

    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(mockNext).not.toHaveBeenCalled();
  });

  /*
  sortの使い方
  ?sort=-name → name の降順 (Z → A)
  ?sort=name → name の昇順 (A → Z)
  */

  test("sortが降順で指定されている場合、降順でソートされる", async () => {
    const mockData = [
      {
        name: "Bigfoot",
        size: "L",
        area: 1,
        createdAt: "2024-02-23T00:00:00.000Z"
      },
      {
        name: "Nessie",
        size: "XL",
        area: 2,
        createdAt: "2024-02-22T00:00:00.000Z"
      }
    ];

    const req = mockReq({sort: "-createdAt"});
    const res = mockRes();

    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockData),
    });

    await getCryptids(req, res, mockNext);

    // Cryptid.findの呼び出しで、降順（-1）でソートされているかを確認
    expect(Cryptid.find().sort).toHaveBeenCalledWith({ createdAt: -1 });
  
    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("sortが昇順で指定されている場合、昇順でソートされる", async () => {
    const mockData = [
      {
        name: "Bigfoot",
        size: "L",
        area: 1,
        createdAt: "2024-02-23T00:00:00.000Z"
      },
      {
        name: "Nessie",
        size: "XL",
        area: 2,
        createdAt: "2024-02-22T00:00:00.000Z"
      }
    ];

    const req = mockReq({sort: "createdAt"});
    const res = mockRes();

    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockData),
    });

    await getCryptids(req, res, mockNext);

    // Cryptid.findの呼び出しで、昇順（1）でソートされているかを確認
    expect(Cryptid.find().sort).toHaveBeenCalledWith({ createdAt: 1 });
  
    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("limit指定なしの場合、最大10件取得される", async () => {
    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(new Array(10)), // 10件のデータを返す
    });
  
    const req = { query: {} }; // limit指定なし
    const res = { json: jest.fn() };
  
    await getCryptids(req, res);
  
    expect(Cryptid.find().limit).toHaveBeenCalledWith(10);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    expect(res.json.mock.calls[0][0]).toHaveLength(10);
  });
  
  test("limit=5 を指定した場合、5件取得される", async () => {
    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(new Array(5)), // 5件のデータを返す
    });
  
    const req = { query: { limit: "5" } };
    const res = { json: jest.fn() };
  
    await getCryptids(req, res);
  
    expect(Cryptid.find().limit).toHaveBeenCalledWith(5);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    expect(res.json.mock.calls[0][0]).toHaveLength(5);
  });
  
  test("limit=21 を指定した場合、MAX値である最大20件取得される", async () => {
    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(new Array(20)), // 20件のデータを返す
    });
  
    const req = { query: { limit: "21" } };
    const res = { json: jest.fn() };
  
    await getCryptids(req, res);
  
    expect(Cryptid.find().limit).toHaveBeenCalledWith(20);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    expect(res.json.mock.calls[0][0]).toHaveLength(20);
  });
  
});