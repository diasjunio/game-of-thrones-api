const request = require("supertest");
const app = require("../game-of-thrones-api/server");

describe("GET /characters", () => {
  it("should return all characters", async () => {
    const response = await request(app).get("/characters");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /characters/:id", () => {
  it("should return a specific character", async () => {
    const response = await request(app).get("/characters/1");
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it("should return 404 if character not found", async () => {
    const response = await request(app).get("/characters/999");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Invalid character ID. Must be between 0 and 52.",
    );
  });

  it("should return 404 if character not found", async () => {
    const response = await request(app).get("/characters/999");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Invalid character ID. Must be between 0 and 52.",
    );
  });
});
