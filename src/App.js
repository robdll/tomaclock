import logo from './resources/robdll-logo.svg';
import './App.css';
import Tomato from './components/Tomato/Tomato.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TomaClock</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Tomato></Tomato>

    </div>
  );
}

export default App;
