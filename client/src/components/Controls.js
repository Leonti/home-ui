import React from 'react';

const Controls = ({onHeatingHigh, onHeatingMiddle, onCooling, onOff}) =>
    <div>
      <button onClick={onHeatingHigh}>Heating high</button>
      <button onClick={onHeatingMiddle}>Heating</button>
      <button onClick={onCooling}>Cooling</button>
      <button onClick={onOff}>Off</button>
    </div>

export default Controls;
