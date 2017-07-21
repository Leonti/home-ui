import React from 'react';

const LastReading = ({temperature, humidity, co2, timestamp}) =>
    <div>
      <table className="table">
      <tr><td>Temperature</td><td>{Math.round(temperature * 100) / 100}C</td></tr>
      <tr><td>Humidity</td><td> {Math.round(humidity * 100) / 100}%</td></tr>
      <tr><td>CO2</td><td>{co2}</td></tr>
      </table>
    </div>

export default LastReading;
