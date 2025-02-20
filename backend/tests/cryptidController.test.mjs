// モデル層が正しい結果を返すことを前提としてCryptidモデルをモック化し、
// コントローラーが正しい振る舞いをするかを確認する

import { getCryptidById, getCryptids } from "../controllers/cryptidController.mjs";
import { Cryptid } from "../models/cryptid.mjs";

// Cryptidモデルで使っているmongooseのメソッドをモック化
jest.mock("../models/cryptid.mjs", () => {
  return {
    Cryptid: {
      find: jest.fn().mockReturnValue({
        //sort: jest.fn().mockReturnThis(),  // sortメソッドもモック
        
      }),
      findById: jest.fn(),
      //toObject: jest.fn(),
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
    
    // mockDataのtoObjectメソッドが返す値をログ出力
  // console.log('mockData.toObject()の返り値:', mockData.toObject.mock.results[0].value);

  // // res.jsonが呼ばれた際の引数をログ出力
  // console.log('res.jsonが呼ばれた際の引数:', res.json.mock.calls[0][0]);

  // console.log('res.jsonが呼ばれた際の引数:', res.json.mock.calls[0][0]);

  // console.log('res.json:', res.json);
  // console.log('mock data:', mockData);

  // expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
  //   id: 1,
  //   name: "Bigfoot",
  //   size: "L",
  //   area: 1,
  //   related_uma: [],
  // }));

    //expect(res.json).toHaveBeenCalledWith(mockData);
    
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("nameクエリパラメータで絞り込み", async () => {
    const mockData = [{
      name: "人面犬",
      size: "S",
      area: 1
    }];

    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([mockData[0]]),
    });

    const req = mockReq({ name: "犬" });
    const res = mockRes();

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

    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([mockData[0]]),
    });

    const req = mockReq({ size: "L" });
    const res = mockRes();

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

    Cryptid.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([mockData[0]]),
    });

    const req = mockReq({ area: 3 });
    const res = mockRes();

    await getCryptids(req, res, mockNext);

    expect(Cryptid.find).toHaveBeenCalledWith({ area: 3 });
    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("クエリパラメータがない場合はnext()でエラーを渡す", async () => {
    // Cryptid.findByIdがnullを返すようにモック化
    Cryptid.findById.mockResolvedValue(null);
    
    const req = mockReq({});
    const res = mockRes();

    await getCryptids(req, res, mockNext);

    // nextにエラーが渡されることを検証
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    expect(mockNext.mock.calls[0][0].message).toBe("At least one query parameter (size, area, name) is required.");
  });

});