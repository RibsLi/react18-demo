import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import About from './pages/about';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* 导入组件的方式：使用 JSX 语法或函数调用的方式渲染 */}
        <Home />
        {/* { Home() } */}

        <About />
      </header>
    </div>
  );
}

export default App;
