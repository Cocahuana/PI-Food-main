import './App.css';
import {Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    <Switch>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home}/>
        <Route path="/postRecipe" component={RecipeCreate}/>
        <Route path="/home/:id" component={RecipeDetail}/>
      </div>
    </Switch>
  );
}
export default App;
