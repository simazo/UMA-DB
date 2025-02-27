import request from "supertest";
import app from "../app.mjs";
import { getCryptidById, getCryptids } from "../controllers/cryptidController.mjs";

// モックコントローラー
jest.mock("../controllers/cryptidController.mjs", () => ({
  getCryptidById: jest.fn(),
  getCryptids: jest.fn(),
}));


describe("Cryptid Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /cryptids/:id でCryptidを取得 (成功ケース)", async () => {
    // モックデータの設定
    const mocData = { id: 1, name: "Bigfoot" };

    // モックレスポンスの設定
    getCryptidById.mockImplementationOnce((req, res) => {
      res.status(200).json(mocData); 
    });

    const response = await request(app).get("/cryptids/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mocData);
  });

  test("GET /cryptids/:id でエラー返す（存在しないID）", async () => {

    // モックエラーの設定
    getCryptidById.mockImplementationOnce((req, res) => {
      res.status(404).json({ message: "Cryptid Not Found" });
    });

    const response = await request(app).get("/cryptids/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Cryptid Not Found" });
  });

  test("GET /cryptids?size でCryptidを取得 (成功ケース)", async () => {
    // モックデータの設定
    const mockData = [
      { id: 1, name: "Cryptid A", size: "M", area: 1 },
      { id: 2, name: "Cryptid B", size: "M", area: 2 },
    ];

    getCryptids.mockImplementationOnce((req, res) => {
      res.status(200).json(mockData); // モックレスポンスを返す
    })

    const response = await request(app).get("/cryptids?size=M");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  // test("GET /cryptids でエラーを返す (クエリパラメータなし)", async () => {
  //   // モックエラーの設定
  //   getCryptids.mockImplementationOnce((req, res, next) => {
  //     const error = new Error("At least one query parameter (size, area, name) is required.");
  //     error.status = 400;
  //     next(error); // エラーを次に渡す
  //   });
  
  //   const response = await request(app).get("/cryptids");
  
  //   expect(response.status).toBe(400);
  //   expect(response.body).toEqual({
  //     message: "At least one query parameter (size, area, name) is required.",
  //   });
  // });

  test("GET /cryptids でエラーを返す (サーバーエラー)", async () => {
    // モックエラーの設定
    getCryptids.mockImplementationOnce((req, res, next) => {
      const error = new Error("Internal Server Error");
      error.status = 500;
      next(error); // エラーを次に渡す
    });
  
    const response = await request(app).get("/cryptids?size=XXL");
  
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Internal Server Error",
    });
  });
});