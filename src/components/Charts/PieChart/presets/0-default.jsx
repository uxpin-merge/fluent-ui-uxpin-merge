import React from 'react';
import PieChart from '../PieChart';

const chartData = 'label apples, theta 1\n' +
                  'label oranges, theta 4\n' +
                  'label cherries, theta 6';

export default (
  <PieChart
    animation="gentle"
    colorRange={"success\n" + "info\n" + "warning"}
    data={chartData}
    height={300}
    hint
    innerRadius={120}
    padAngle="0.02"
    radius={140}
    uxpId="pieChart1"
    width={300}
  />
);
