import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Onekey from './onekey';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/onekey">
              <Onekey />
            </Route>
            <Route path="/">
              <Onekey />
            </Route>
          </Switch>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
