import React, { useState } from 'react';
import Modal from 'react-modal';
import './colorpic.css';



const customStyles = {
  content: {
    top: '26%',
    left: '55%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};



export default function Pick(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [hex, setHex] = useState(props.value||"000000");


  
  //let hex= RGBToHex(roughScale(red, 10).toString(16), roughScale(green, 10).toString(16), roughScale(blue, 10).toString(16));
  /*  const colors = ['ffff00', 'ff0000', '00ff00', '0000ff'];
   const colorsItems = colors.map((colors) =>
     <option value="">{colors}</option>
   ); */
  


  var result = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  var styles = {

    height: 20,
    width: 20,
    background: 'rgb(' + red + ',' + green + ',' + blue + ')'
  }

  function hexToRgb(hex) {
    // var result = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length === 1)
      r = "0" + r;
    if (g.length === 1)
      g = "0" + g;
    if (b.length === 1)
      b = "0" + b;

    return r + g + b;
  }

  function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed;
  }

  function hexValid(hex) {
    if (hex.length === 6) {
      if (result) {
        return hex.toString(16);
      }
      else return 0;
    }
    else {
      return hex.toString(16).substr(0, 6);
    }
  }

  function converToHex() {
    setHex(RGBToHex(roughScale(red, 10).toString(16), roughScale(green, 10).toString(16), roughScale(blue, 10).toString(16)))
    props.onChange();
    closeModal();
  }
  function convertToRGB() {
    setRed(hexToRgb(hex).r);
    setGreen(hexToRgb(hex).g);
    setBlue(hexToRgb(hex).b);
    props.onChange();
    closeModal();
  }

  function fastOperation(value) {
    setHex(value);
    convertToRGB();
  }
  return <div className="bg">
    <div className="container-input">
      <label htmlFor="input-hex" className="hashtag">#</label>
      <input type="text" name="input-hex" id="" className="inp-hex"
        value={hexValid(hex)}
        onChange={e => setHex(e.target.value)}
        onBlur={convertToRGB}
      />
      <div className="color-pick-box" onClick={openModal}>
        <div className="color-pick" style={styles}></div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="sliders">
          <div className="red">
            <input id="red" type="range"
              min="0"
              max="255"
              steps="1"
              value={red}
              onChange={e => setRed(e.target.value)}
              />
            <label>Red: {red}</label>
          </div>
          <div className="green">
            <input id="green" type="range"
              min="0"
              max="255"
              steps="1"
              value={green}
              onChange={e => setGreen(e.target.value)} />
            <label>Green: {green}</label>
          </div>
          <div className="blue">
            <input id="blue" type="range"
              min="0"
              max="255"
              steps="1"
              value={blue}
              onChange={e => setBlue(e.target.value)} />
            <label>Blue: {blue}</label>
          </div>
        </div>
        <div className="btns">
          <button className="btn btn-cancel" onClick={convertToRGB}>Cancel</button>
          <button className="btn btn-ok" onClick={converToHex}>Ok</button>
        </div>
      </Modal>
      <select className="inp-select" onChange={e => fastOperation(e.target.value)}>
        {/*  {colorsItems} */}
         <option value="000001" disabled></option>
        {Object.keys(props.colors).map(key => <option value={props.colors[key]}
          key={key}
          style={{ backgroundColor: "#" + props.colors[key] }}
        >{key}</option>)}

      </select>
    </div>

   </div>
}