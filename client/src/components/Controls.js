import React from 'react';

const buttonClass = "btn-margin btn btn-primary btn-lg"

const Controls = ({onHeatingHigh, onHeatingMedium, onCooling, onAcOff, onLedOn, onLedOff, isProcessing}) =>
    <div>
      <button className={buttonClass}
        onClick={onHeatingHigh}
        disabled={isProcessing}
        style={{ cursor: 'pointer' }}
        >Heating high</button><br />
      <button className={buttonClass}
        onClick={onHeatingMedium}
        disabled={isProcessing}
        style={{ cursor: 'pointer' }}
        >Heating</button><br />
      <button className={buttonClass}
        onClick={onCooling}
        disabled={isProcessing}
        style={{ cursor: 'pointer' }}
        >Cooling</button><br />
      <button className={`${buttonClass} btn-danger`}
        onClick={onAcOff}
        disabled={isProcessing}
        style={{ cursor: 'pointer' }}
        >Off</button><br /><br />

      <button className={buttonClass}
        onClick={() => onLedOn(255, 255, 255)}
        disabled={isProcessing}
        style={{ cursor: 'pointer' }}
        >LED On</button><br />
      <button className={`${buttonClass} btn-danger`}
        onClick={onLedOff}
        disabled={isProcessing}
        style={{ cursor: 'pointer' }}
        >LED Off</button><br />
    </div>

export default Controls;
