const supertest = require("supertest");
const createApp = require("../app.js");
const mongoose = require("mongoose");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const app = createApp();
let token;
const userPayload = {
  name: "Pulkit",
  password: "Password",
  email: "pulkit0729@gmail.com",
};

const blogPayload = {
  title: "New Blog",
  description: "A new blog is created using an    existing blog",
};

describe("Blog", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/slosh");
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(userPayload.password, salt);
    const user = await User.findOne({ email: userPayload.email });
    if (!user) {
      await User.create({
        name: userPayload.name,
        email: userPayload.email,
        password: hashedPass,
      });
    }
    res = await supertest(app)
      .post("/api/login")
      .send(userPayload)
      .set("Accept", "application/json");
    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("If User logged in", () => {
    let blogId;
    it("post a  blog post", async () => {
      const res = await supertest(app)
        .post("/api/blog")
        .send({ blog: blogPayload, token: token })
        .set("Accept", "application/json")
        .expect(200);
      blogId = res.body._id;
    });
    it("get blog post", async () => {
      await supertest(app).get(`/api/blog/${blogId}`).expect(200);
    });

    it("update a blog post", async () => {
      await supertest(app)
        .put(`/api/blog/${blogId}`)
        .send({
          blog: { title: "CHANGED TITLE", description: "New" },
          token: token,
        })
        .expect(200);
    });
  });

  describe("If User Not Logged in", () => {
    it("post a  blog post", async () => {
      const res = await supertest(app)
        .post("/api/blog")
        .send({ blog: blogPayload })
        .set("Accept", "application/json")
        .expect(401);
    });
    it("get blog post", async () => {
      await supertest(app).get(`/api/blog/123123213`).expect(500);
    });

    it("update a blog post", async () => {
      await supertest(app)
        .put(`/api/blog/123123123`)
        .send({blxog:{ title: "CHANGED TITLE", description: "New" }})
        .expect(401);
    });
  });
});
