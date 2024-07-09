const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../app");

chai.use(chaiHttp);

let token, movieId;

describe("/api/movies tests", () => {
  before((done) => {
    chai
      .request(server)
      .post("/login")
      .send({ username: "KaranDanisment", password: "123456" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  describe("/GET movies", () => {
    it("it should GET all the movies", (done) => {
      chai
        .request(server)
        .get("/api/movies")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe("/POST movie", () => {
    it("it should POST a movie", (done) => {
      let movie = {
        title: "test",
        director_id: "6686b3097961b5581a1d0ea8",
        category: "test",
        country: "test",
        year: 1111,
        imdb_score: 1,
      };
      chai
        .request(server)
        .post("/api/movies")
        .send(movie)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("Object");
          res.body.should.have.property("title");
          res.body.should.have.property("director_id");
          res.body.should.have.property("category");
          res.body.should.have.property("country");
          res.body.should.have.property("year");
          res.body.should.have.property("imdb_score");
          movieId = res.body._id;
          done();
        });
    });
  });
  describe("/GET/movie_id movie", () => {
    it("it should get a movie", (done) => {
      chai
        .request(server)
        .put("/api/movies/" + movieId)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.be.a("Object");
          res.body.should.have.property("title");
          res.body.should.have.property("director_id");
          res.body.should.have.property("category");
          res.body.should.have.property("country");
          res.body.should.have.property("year");
          res.body.should.have.property("imdb_score");
          res.body.should.have.property("_id").eql(movieId);
          done();
        });
    });
  });
  describe("/PUT/movie_id movie", () => {
    it("it should update a movie", (done) => {
      let movie = {
        title: "test2",
        director_id: "6686b3097961b5581a1d0ea8",
        category: "test2",
        country: "test2",
        year: 2222,
        imdb_score: 2,
      };
      chai
        .request(server)
        .put("/api/movies/" + movieId)
        .send(movie)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("title").eql(movie.title);
          res.body.should.have.property("director_id").eql(movie.director_id);
          res.body.should.have.property("category").eql(movie.category);
          res.body.should.have.property("country").eql(movie.country);
          res.body.should.have.property("year").eql(movie.year);
          res.body.should.have.property("imdb_score").eql(movie.imdb_score);
          done();
        });
    });
  });
  describe("/DELETE/movie_id movie", () => {
    it("it should delete a movie", (done) => {
      chai
        .request(server)
        .delete("/api/movies/" + movieId)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          //done();
        });
    });
  });
});
