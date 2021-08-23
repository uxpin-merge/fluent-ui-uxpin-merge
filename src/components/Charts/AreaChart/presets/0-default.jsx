import React from 'react';
import AreaChart from '../AreaChart';

const chartData =
  'x 0, y 9\n' +
  'x 1, y 5\n' +
  'x 2, y 4\n' +
  'x 3, y 9\n' +
  'x 4, y 1\n' +
  'x 5, y 7\n' +
  'x 6, y 6\n' +
  'x 7, y 3\n' +
  'x 8, y 2\n' +
  'x 9, y 0\n' +
  '\n' +
  'x 0, y 18\n' +
  'x 1, y 9\n' +
  'x 2, y 2\n' +
  'x 3, y 19\n' +
  'x 4, y 11\n' +
  'x 5, y 17\n' +
  'x 6, y 2\n' +
  'x 7, y 1\n' +
  'x 8, y 9\n' +
  'x 9, y 11';

const defaultColors = `success
info`;

export default (
  <AreaChart
    animation="gentle"
    colorRange={defaultColors}
    curve="curveLinear"
    data={chartData}
    opacity="0.6"
    styles={[{ strokeStyle: 'dashed' }]}
    uxpId="areaChart1"
    width={500}
  />
);
