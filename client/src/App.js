import './App.css';
import {Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import RecipeDetail from './components/RecipeDetail';
import Error404 from './components/Error404';
import React from 'react';

function App() {
  return (
    <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/postRecipe" component={RecipeCreate}/>
        <Route exact path="/home/:id" component={RecipeDetail}/>
        <Route exact path="/error404" component={Error404}/>
        <Route path="*" component={Error404}/>
    </Switch>
  );
}
export default App;
