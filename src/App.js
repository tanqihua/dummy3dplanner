import logo from './logo.svg';
import './App.css';
import View3d from "./viewer3d";
import View2d from "./viewer2d";
function App() {
  return (
    <div className="App">
      <View2d/>
      <View3d/>
    </div>
  );
}

export default App;
