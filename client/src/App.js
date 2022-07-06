import './App.css';
import {Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';
import RecipeDetail from './components/RecipeDetail';
import Error404 from './components/Error404';

function App() {
  return (
    <Switch>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route path="/postRecipe" component={RecipeCreate}/>
        <Route exact path="/home/:id" component={RecipeDetail}/>
        <Route path="*" component={Error404}/>
      </div>
    </Switch>
  );
}
export default App;
