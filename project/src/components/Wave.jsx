import React from 'react';
import Wavify from 'react-wavify';


const Wave = () => (
  
  
  <Wavify
    fill="#6b8fa2"
    
    paused={false}
    options={{
      height: 30,
      amplitude: 30,
      speed: 0.2,
      points: 3,
    }}
    style={{
      position: 'absolute',
      bottom: -5,
      width: '100%',
      height: '25%'
    }}
  />
);

export default Wave;