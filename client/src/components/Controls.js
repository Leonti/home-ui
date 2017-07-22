import React from 'react';

const Controls = ({onHeatingHigh, onHeatingMedium, onCooling, onAcOff, onLedOn, onLedOff}) =>
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
      <button className="btn-margin btn btn-primary btn-danger"
        onClick={onAcOff}
        style={{ cursor: 'pointer' }}
        >Off</button><br /><br />

      <button className="btn-margin btn btn-primary"
        onClick={() => onLedOn(255, 255, 255)}
        style={{ cursor: 'pointer' }}
        >LED On</button><br />
      <button className="btn-margin btn btn-primary btn-danger"
        onClick={onLedOff}
        style={{ cursor: 'pointer' }}
        >LED Off</button><br />              
    </div>

export default Controls;
