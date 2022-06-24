import './App.css';
import {Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <Switch>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home}/>
      </div>
    </Switch>
  );
}
export default App;
