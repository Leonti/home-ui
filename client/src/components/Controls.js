import React from 'react';

const Controls = ({onHeatingHigh, onHeatingMedium, onCooling, onOff}) =>
    <div>
      <button className="btn-margin btn btn-primary"
        onClick={onHeatingHigh}
        style={{ cursor: 'pointer' }}
        >Heating high</button><br />
      <button className="btn-margin btn btn-primary"
        onClick={onHeatingMedium}
        style={{ cursor: 'pointer' }}
        >Heating</button><br />
      <button className="btn-margin btn btn-primary"
        onClick={onCooling}
        style={{ cursor: 'pointer' }}
        >Cooling</button><br />
      <button className="btn-margin btn btn-primary"
        onClick={onOff}
        style={{ cursor: 'pointer' }}
        >Off</button><br />
    </div>

export default Controls;
