const request = require("supertest");
const { connect } = require("./database");
const UserModel = require("../models/user.model");
const app = require("../app");

describe("Auth: Signup", () => {
    let conn;

    beforeAll(async () => {
        conn = await connect();
    });

    afterEach(async () => {
        await conn.cleanup();
    });

    afterAll(async () => {
        await conn.disconnect();
    });

    it("should signup a user", async () => {
        const response = await request(app)
            .post("/signup")
            .set("content-type", "application/json")
            .send({
                username: "ekenefidel",
                password: "Password123",
                firstName: "ekene",
                lastName: "fidel",
                email: "ekene@mail.com",
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toHaveProperty("userName", "ekenefidel");
        expect(response.body.user).toHaveProperty("firstName", "ekene");
        expect(response.body.user).toHaveProperty("lastName", "fidel");
        expect(response.body.user).toHaveProperty("email", "ekene@mail.com");
    });

    it("should login a user", async () => {
        // create user in out db
        const user = await UserModel.create({
            userName: "ekenefidel",
            password: "123456",
            email: "ekene@mail.com",
            firstName: "Ekene",
            lastName: "Fidel",
        });

        // login user
        const response = await request(app)
            .post("/login")
            .set("content-type", "application/json")
            .send({
                username: "ekene@mail.com",
                password: "123456",
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });
});
