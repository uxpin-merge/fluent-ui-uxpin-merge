/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Hint,
  RadialChart,
} from 'react-vis';
import ChartStyles from '../chartStyles/chart.styles';
import * as UXPinParser from '../../_helpers/UXPinParser';
import { UxpColors } from '../../_helpers/uxpcolorutils';

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.getData(),
      hintValue: '',
      showHint: false,
    };
  }

  componentDidMount() {
    this.setState({ data: this.getData() });
  }

  getHint(value) {
    if (!this.state.showHint) {
      const hintContent = value.label ? { Data: value.label, Value: `${value.theta * 10}%` } : { Value: `${value.theta * 10}%` };
      this.setState({ hintValue: hintContent, showHint: true });
    } else {
      this.setState({ hintValue: '', showHint: false });
    }
  }

  getColorRange() {
    return UXPinParser.parse(this.props.colorRange).map((item) => (UxpColors.getHexFromHexOrToken(item.text)));
  }

  getData() {
    let output = [];
    UXPinParser.parse(this.props.data).forEach((element, index) => {
      // Is this an odd or even row of the array?
      if (element.order % 2 == 0) {
        output.push({
          label: element.text.split('label ')[1],
          theta: undefined,
        });
      } else {
        output[output.length-1].theta = parseInt(element.text.split('theta ')[1]);
      }
    });

    return output;
  }

  render() {
    return (
      <RadialChart
        getAngle={(d) => d.theta}
        css={ChartStyles}
        radius={this.props.radius}
        innerRadius={this.props.innerRadius}
        padAngle={parseFloat(this.props.padAngle)}
        showLabels={this.props.showLabels}
        labelsRadiusMultiplier={parseFloat(this.props.labelsRadiusMultiplier)}
        labelsStyle={this.props.labelsStyle}
        data={this.getData()}
        width={this.props.width}
        height={this.props.height}
        colorRange={this.getColorRange()}
        opacity={parseFloat(this.props.opacity)}
        onValueClick={(value) => this.getHint(value)}
        onNearestXY={this.props.onNearestXY}
        onSeriesClick={this.props.onSeriesClick}
        onSeriesRightClick={this.props.onSeriesRightClick}
        onSeriesMouseOver={this.props.onSeriesMouseOver}
        onSeriesMouseOut={this.props.onSeriesMouseOver}
        animation={this.props.animation}>
        {this.props.hint && this.state.showHint ? (
          <Hint value={this.state.hintValue} />
        ) : (
          undefined
        )}
      </RadialChart>
    );
  }
}

/* eslint-disable sort-keys */
PieChart.propTypes = {
  /** Height of the Chart in px. Accepts only numbers. */
  height: PropTypes.number,
  /** Width of the Chart in px. Accepts only numbers. */
  width: PropTypes.number,
  /** Turns, on/off animation and allows for selection of different types of animations. */
  animation: PropTypes.oneOf([false, 'noWobble', 'gentle', 'wobbly', 'stiff']),
  /**
   * Color to be used on all chart lines, unless colorRange is provided
   * @uxpinignoreprop
   */
  // eslint-disable-next-line react/no-unused-prop-types
  color: PropTypes.string,
  /** Array with colors to be used across all chart lines. If array doesn't specify color for all the chart lines, color property is used. */
  /**
   * @uxpincontroltype codeeditor
   */
  colorRange: PropTypes.string,
  /**
   * @uxpincontroltype codeeditor
   */
  data: PropTypes.string,
  /** Shows hint on click into every part of the pie chart */
  hint: PropTypes.bool,
  /** In combination with radius property, innerRadius enables ability to create a donut chart. The higher the value the bigger tha hole in the donut.  */
  innerRadius: PropTypes.number,
  /** Specifies the distance between edge of the chart and labels. 1 places labels on the edge of the chart. */
  labelsRadiusMultiplier: PropTypes.string,
  /** Styles object that let's you style labels on the chart */
  labelsStyle: PropTypes.object,
  /**
   * @uxpinignoreprop
   */
  onNearestXY: PropTypes.func,
  /**
   * @uxpinignoreprop
   */
  onSeriesClick: PropTypes.func,
  /**
   * @uxpinignoreprop
   */
  // eslint-disable-next-line react/no-unused-prop-types
  onSeriesMouseOut: PropTypes.func,
  /**
   * @uxpinignoreprop
   */
  onSeriesMouseOver: PropTypes.func,
  /**
   * @uxpinignoreprop
   */
  onSeriesRightClick: PropTypes.func,
  /** Color filling inside of every circle on the chart. */
  opacity: PropTypes.string,
  /** Adds padding between series in the chart. 0 means no padding. 0.005 provides 1px relief. */
  padAngle: PropTypes.string,
  /** Specifies the radius of the chart. Value that equals 50% of the height of the entire component equals 100% of the size. Required to create donut chart. */
  radius: PropTypes.number,
  /** Shows labels one the chart. Set up labels in the data object. Example: {"theta": 1, "label": "Apples"} */
  showLabels: PropTypes.bool,
};
/* eslint-enable sort-keys */

PieChart.defaultProps = {
  height: 300,
  hint: false,
  labelsRadiusMultiplier: '1.1',
  opacity: '1',
  width: 300,
};
