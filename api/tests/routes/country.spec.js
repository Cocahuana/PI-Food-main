/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
    title: "Chinchulines Asados",
    summary: "Unos chinchulines muy blanditos con limon y faciles de cocinar en la parrila ",
    healthScore: 35,
    img: "https://www.paulinacocina.net/wp-content/uploads/2022/06/receta-de-chinchulines-a-la-parrilla.jpg",
    diet: ["pescetarian", "vegan"],
    analyzedInstructions:[
      {
        number: 1,
        step:"Poner los chinchulines en mucho limon. Prender el fuego y poner el carbon. Cuando el fuego este prendido dejar que el carbon se queme"
      },
      {
        number:2,
        step:"Cuando el carbon este blanco, poner los chinchulines en la parrilla y cocinar a fuego lento"
      },
    ]
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('La ruta a GET /getRecipes debe estar funcionando', () => {
    it('should get 200', () =>
      agent.get('/getRecipes').expect(200)
    );
  });

  describe('GET /getRecipes/:id', () => {
    it('should reply the GET method /getRecipes/:id with status code 404 if params is not a valid id', async () => {
      const response = await agent.get('/getRecipes/p34nuts');
      //Si bien el http correcto es el 400, la api de spooncolar devuelve un 404 de pagina no encontrada
      // ya que el controller recipes by id de la apiInfo lleva al endPoint de la api
      expect(response.statusCode).to.equal(404);
    });
  })

  const diet = {
    dietName: 'ketogenic'
  }

  beforeEach(() => Diet.sync({ force: true })
  .then(() => Diet.create(diet)));    
  describe('GET /getAllDiets', () => {    
    it('getAllDiets should get 200 status when it is called', () =>
      agent.get('/getAllDiets').expect(200)
    );
  });

  //Seguir cuando esten la validaciones en el post
  describe('POST /postRecipe', () => {  
    it('should reply the POST method /postRecipe whith code 500 if title and summary is not sent', async () => {
      const res = await agent.post('/postRecipe').send({});
      expect(res.statusCode).to.equal(400);
      const res1 = await agent.post('/postRecipe').send({title: 'Sopa casera de la abuela'});
      expect(res1.statusCode).to.equal(400);
    });  
    it('should reply the POST method /postRecipe with status code 200 if al inputs has something when it is sent', async () => {
      const res2 = await agent.post('/postRecipe').send(
        {
          title: 'Sopa casera de la abuela', 
          summary: 'Es la sopa mas nostalgica', 
          diet: ["paleo"],
          healthScore: 35,
          img: "https://www.paulinacocina.net/wp-content/uploads/2022/06/receta-de-chinchulines-a-la-parrilla.jpg",
          steps: "Soy un paso a paso",
        
        });
      expect(res2.statusCode).to.equal(200);
    })  
  });


});
