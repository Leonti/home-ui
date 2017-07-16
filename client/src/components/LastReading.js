import React from 'react';

const LastReading = ({temperature, humidity, co2, timestamp}) =>
    <div>
      <div>Temperature {temperature}C</div>
      <div>Humidity {humidity}%</div>
      <div>CO2 {co2}</div>
      <div>Timestamp {timestamp}</div>
    </div>

export default LastReading;
