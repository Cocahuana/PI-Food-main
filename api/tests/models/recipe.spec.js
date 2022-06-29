///^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('Title', () => {
      it('should throw an error if title is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid title')))
          .catch(() => done());
      });
      it('should work when its a valid title', () => {
        Recipe.create({ title: 'Chinchulines a la parrilla con limon y sal' });
      });
    });

    describe('Summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({summary: {}})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({ summary: 'Chinchulines a la parrilla con limon y sal' });
      });
    });

    describe('Health Score', () => {
      it('should throw an error if healthScore is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid healthScore')))
          .catch(() => done());
      });
      it('should work when its a valid healthScore', () => {
        Recipe.create({ healthScore: 50 });
      });
    });
  });
});
