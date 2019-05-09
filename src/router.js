import React from "react";
import { hot } from "react-hot-loader";
import asyncComponent from "./hoc/asyncComponent";

let views = [];
function importAll (r) {
  r.keys().forEach(key => {
    let _key = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
    if (_key.indexOf('-') > -1) {
      const newWordArr = [];
      const wordArr = _key.split('-');
      wordArr.forEach(word => {
        const word1 = word.slice(0, 1).toUpperCase();
        const word2 = word.slice(1);
        newWordArr.push(word1 + word2);
      });
      _key = newWordArr.join('');
    } else {
      const __key = _key;
      const word1 = __key.slice(0, 1).toUpperCase();
      const word2 = __key.slice(1);
      _key = word1 + word2;
    }
    const Route = r(key).default;
    views.push(<Route key={_key} />);
  });
}

if (process.env.NODE_ENV === "production") {
  const MyFirstComponent = asyncComponent(() => import(
    /* webpackChunkName: "myFirstComponent" */
    "./components/myFirstComponent/myFirstComponent"
  ));
  views = [
    <MyFirstComponent key="myFirstComponent" />
  ];
} else {
  importAll(require.context('./components/', true, /\.jsx$/));
}

@hot(module)
class App extends React.Component {
  render() {
    return (
      <div id="router">{views}</div>
    );
  }
}
export default App;