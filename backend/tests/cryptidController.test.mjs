// モデル層が正しい結果を返すことを前提としてCryptidモデルをモック化し、
// コントローラーが正しい振る舞いをするかを確認する

import { getCryptidById, getCryptids } from "../controllers/cryptidController.mjs";
import { Cryptid } from "../models/cryptid.mjs";

// Cryptidモデルで使っているmongooseのメソッドをモック化
jest.mock("../models/cryptid.mjs", () => {
  return {
    Cryptid: {
      find: jest.fn(),
      findById: jest.fn(),
      paginate: jest.fn(),
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
    Cryptid.paginate.mockResolvedValue([]);

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

    // paginate のモックデータ
    const mockPaginateResult = {
      docs: mockData,
      totalDocs: 1,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };

    const req = mockReq({ name: "犬" });
    const res = mockRes();

    Cryptid.paginate.mockResolvedValue(mockPaginateResult);
    
    await getCryptids(req, res, mockNext);

    expect(Cryptid.paginate).toHaveBeenCalledWith(
      {
        $or: [
          { name: { $regex: "犬", $options: "i" } },
          { alias: { $regex: "犬", $options: "i" } }
        ]
      },
      {
        page: 1,
        limit: 10,
        sort: { createdAt: -1 }
      }
    );
    
    expect(res.json).toHaveBeenCalledWith({
      cryptids: mockData,
      pagination: {
        totalDocs: 1,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("sizeクエリパラメータで絞り込み", async () => {
    const mockData = [{
      name: "ネッシー",
      size: "L",
      area: 2
    }];

    // paginate のモックデータ
    const mockPaginateResult = {
      docs: mockData,
      totalDocs: 1,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };

    const req = mockReq({ size: "L" });
    const res = mockRes();

    Cryptid.paginate.mockResolvedValue(mockPaginateResult);
    
    await getCryptids(req, res, mockNext);

    expect(Cryptid.paginate).toHaveBeenCalledWith(
      {
        size: "L"
      },
      {
        page: 1,
        limit: 10,
        sort: { createdAt: -1 }
      }
    );

    expect(res.json).toHaveBeenCalledWith({
      cryptids: mockData,
      pagination: {
        totalDocs: 1,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("areaクエリパラメータで絞り込み", async () => {
    const mockData = [{
      name: "xxxx",
      size: "S",
      area: 3
    }];

    // paginate のモックデータ
    const mockPaginateResult = {
      docs: mockData,
      totalDocs: 1,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };

    const req = mockReq({ area: 3 });
    const res = mockRes();

    Cryptid.paginate.mockResolvedValue(mockPaginateResult);
    
    await getCryptids(req, res, mockNext);

    expect(Cryptid.paginate).toHaveBeenCalledWith(
      {
        area: 3
      },
      {
        page: 1,
        limit: 10,
        sort: { createdAt: -1 }
      }
    );

    expect(res.json).toHaveBeenCalledWith({
      cryptids: mockData,
      pagination: {
        totalDocs: 1,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
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

    const mockPaginateResult = {
      docs: mockData,
      totalDocs: 2,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };

    const req = mockReq({sort: ""});
    const res = mockRes();

    Cryptid.paginate.mockResolvedValue(mockPaginateResult);

    await getCryptids(req, res, mockNext);

    // 引数が正しいか確認
    expect(Cryptid.paginate).toHaveBeenCalledWith(
      {},
      {
        page: 1,
        limit: 10,
        sort: { updatedAt: -1 }, // updatedAtの降順（-1）が指定されているか確認
      }
    );

    // レスポンスが正しいか確認
    expect(res.json).toHaveBeenCalledWith({
      cryptids: mockData,
      pagination: {
        totalDocs: 2,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
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

    const mockPaginateResult = {
      docs: mockData,
      totalDocs: 2,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };

    const req = mockReq({sort: "-createdAt"});
    const res = mockRes();

    Cryptid.paginate.mockResolvedValue(mockPaginateResult);

    await getCryptids(req, res, mockNext);

    // 引数が正しいか確認
    expect(Cryptid.paginate).toHaveBeenCalledWith(
      {},
      {
        page: 1,
        limit: 10,
        sort: { createdAt: -1 }, // 降順（-1）が指定されているか確認
      }
    );
  
    // レスポンスが正しいか確認
    expect(res.json).toHaveBeenCalledWith({
      cryptids: mockData,
      pagination: {
        totalDocs: 2,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });

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

    const mockPaginateResult = {
      docs: mockData,
      totalDocs: 2,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };

    const req = mockReq({sort: "createdAt"});
    const res = mockRes();

    Cryptid.paginate.mockResolvedValue(mockPaginateResult);

    await getCryptids(req, res, mockNext);

    // 引数が正しいか確認
    expect(Cryptid.paginate).toHaveBeenCalledWith(
      {},
      {
        page: 1,
        limit: 10,
        sort: { createdAt: 1 }, // 昇順（1）が指定されているか確認
      }
    );
  
    // レスポンスが正しいか確認
    expect(res.json).toHaveBeenCalledWith({
      cryptids: mockData,
      pagination: {
        totalDocs: 2,
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });

    expect(mockNext).not.toHaveBeenCalled();
  });

  test("limit指定なしの場合、最大10件取得される", async () => {
    const mockData = {
      docs: new Array(10).fill({ name: "test" }), // 10件のダミーデータ
      totalDocs: 10,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };
  
    Cryptid.paginate = jest.fn().mockResolvedValue(mockData);

    const req = { query: {} }; // limit指定なし
    const res = { json: jest.fn() };
  
    await getCryptids(req, res);

    // paginate が limit: 10 で呼ばれたことを確認
    expect(Cryptid.paginate).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ limit: 10 }));

    // 正しいレスポンスが返っているか確認
    expect(res.json).toHaveBeenCalledWith({
      cryptids: mockData.docs,
      pagination: {
        totalDocs: mockData.totalDocs,
        totalPages: mockData.totalPages,
        currentPage: mockData.page,
        hasNextPage: mockData.hasNextPage,
        hasPrevPage: mockData.hasPrevPage,
      },
    });
  });
  
  test("limit=5 を指定した場合、5件取得される", async () => {
    const mockData = {
      docs: new Array(5).fill({ name: "test" }), // 5件のダミーデータ
      totalDocs: 5,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };
  
    Cryptid.paginate = jest.fn().mockResolvedValue(mockData);

    const req = { query: { limit: "5" } };
    const res = { json: jest.fn() };
  
    await getCryptids(req, res);
  
    // paginate が limit: 5 で呼ばれたことを確認
    expect(Cryptid.paginate).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ limit: 5 }));

    // 正しいレスポンスが返っているか確認
    expect(res.json).toHaveBeenCalledWith({
      cryptids: mockData.docs,
      pagination: {
        totalDocs: mockData.totalDocs,
        totalPages: mockData.totalPages,
        currentPage: mockData.page,
        hasNextPage: mockData.hasNextPage,
        hasPrevPage: mockData.hasPrevPage,
      },
    });

  });
  
  test("limit=21 を指定した場合、MAX値である最大20件取得される", async () => {
    const mockData = {
      docs: new Array(20).fill({ name: "test" }), // 20件のダミーデータ
      totalDocs: 20,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };

    Cryptid.paginate = jest.fn().mockResolvedValue(mockData);
  
    const req = { query: { limit: "21" } };
    const res = { json: jest.fn() };
  
    await getCryptids(req, res);

    // paginate が limit: 20 で呼ばれたことを確認
    expect(Cryptid.paginate).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ limit: 20 }));

    // 正しいレスポンスが返っているか確認
    expect(res.json).toHaveBeenCalledWith({
      cryptids: mockData.docs,
      pagination: {
        totalDocs: mockData.totalDocs,
        totalPages: mockData.totalPages,
        currentPage: mockData.page,
        hasNextPage: mockData.hasNextPage,
        hasPrevPage: mockData.hasPrevPage,
      },
    });

  });
  
});