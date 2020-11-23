/* import Cp from './components/ColorPicker' */
import Pick from './components/ColorPick'
import './App.css';

function App() {
  const colors = {
    yellow: "ffff00",
    red: "ff0000",
    green: "00ff00",
    blue: "0000ff"
  }
  return (
    <div className="App">
      
     <Pick value="555555" onChange={()=>{return "color has been changed"}} colors={colors}></Pick>
   
    </div>
  );
}

export default App;
