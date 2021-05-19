/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Hint,
  RadialChart,
} from 'react-vis';
import ChartStyles from '../chartStyles/chart.styles';
import { csv2arr } from '../../_helpers/parser';
import { UxpColors } from '../../_helpers/uxpcolorutils';



const defaultColorRange = `blue 300
blue 700
purple 500`;

const defaultWidth = 300;
const defaultHeight = 300;

const defaultRadius = 140;
const defaultInnerRadius = 120;
const defaultPadAngle = "0.02";

const animationOff = "no animation";
const animationOptions = [animationOff, 'gentle', 'noWobble', 'wobbly', 'stiff'];

const defaultChartData = `Apples | 20
Bananas | 40
Pears | 60`;



export default class PieChart extends React.Component {
  constructor(props) {
    super(props);

    const getStartData = () => {
      if (Array.isArray(this.props.startData[0]) && this.props.startData.length === this.props.data.length) {
        return this.props.startData;
      } if (!Array.isArray(this.props.startData[0]) && this.props.startData.length === this.props.data.length) {
        return this.props.startData;
      }

      return this.props.data;
    };

    this.state = {
      data: [],
      startData: [],
      hintValue: '',
      showHint: false,
      colorList: [],
      _width: defaultWidth,
      _height: defaultHeight,
    };
  }

  set() {

    let colorList = [];

    if (this.props.colorRange) {
      colorList = csv2arr(this.props.colorRange)
        .flat()
        .map(
          (text, index) => (
            UxpColors.getHexFromHexOrToken(text)
          )
        );
    }

    var sliceList = [];
    var startList = [];

    if (this.props.pieSlices) {
      let slices = this.props.pieSlices.match(/[^\r\n]+/g);

      if (slices && slices.length) {
        for (var i = 0; i < slices.length; i++) {
          let item = slices[i];

          let sliceInfo = this._parseSliceItem(item);

          if (sliceInfo)
            sliceList.push(sliceInfo);

          let startInfo = sliceInfo;
          startInfo.theta = 0;
          startList.push(startInfo);
        }
      }
    }

    this.setState({
      data: sliceList,
      startData: startList,
      colorList: colorList,
      _width: this.props.chartWidth,
      _height: this.props.chartHeight,
    });
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.colorRange !== this.props.colorRange) ||
      (prevProps.pieSlices !== this.props.pieSlices) ||
      (prevProps.chartWidth !== this.props.chartWidth) ||
      (prevProps.chartHeight !== this.props.chartHeight)) {
      this.set();
    }
  }

  _parseSliceItem(rawStr) {
    if (rawStr && rawStr.length) {
      let items = rawStr.split("|");

      //First display side
      if (items && items.length) {
        let left = items[0].trim();     //This is the label value
        var right = '';                 //This is the theta value

        if (items[1]) {
          right = items[1].trim().replace("%", "");
        }

        let dataParams = {
          label: left,
          theta: right,
        }

        return dataParams;
      }
    }

    //If we made it this far, it didn't work out
    return undefined;
  }

  getHint(value) {
    if (!this.state.showHint) {
      const hintContent = value.label ? { Data: value.label, Value: `${value.theta * 10}%` } : { Value: `${value.theta * 10}%` };
      this.setState({ hintValue: hintContent, showHint: true });
    } else {
      this.setState({ hintValue: '', showHint: false });
    }
  }

  render() {

    var animationOption = this.props.animation;
    if (animationOption === animationOff)
      animationOption = false;

    console.log("Setting animation: " + animationOption);

    return (
      <RadialChart
        {...this.props}
        width={this.state._width}
        height={this.state._height}
        data={this.state.data}
        startData={this.state.startData}
        getAngle={(d) => d.theta}
        css={ChartStyles}
        radius={this.props.radius}
        innerRadius={this.props.innerRadius}
        padAngle={parseFloat(this.props.padAngle)}
        showLabels={this.props.showLabels}
        labelsRadiusMultiplier={parseFloat(this.props.labelsRadiusMultiplier)}
        labelsStyle={this.props.labelsStyle}
        colorRange={this.state.colorList}
        opacity={parseFloat(this.props.opacity)}
        onValueClick={(value) => this.getHint(value)}
        onNearestXY={this.props.onNearestXY}
        onSeriesClick={this.props.onSeriesClick}
        onSeriesRightClick={this.props.onSeriesRightClick}
        onSeriesMouseOver={this.props.onSeriesMouseOver}
        onSeriesMouseOut={this.props.onSeriesMouseOver}
        animation={animationOption} >
        {
          this.props.hint && this.state.showHint ? (
            <Hint value={this.state.hintValue} />
          ) : (
            undefined
          )
        }
      </RadialChart >
    );
  }
}


/* eslint-disable sort-keys */
PieChart.propTypes = {

  /**
   * @uxpindescription Chart width in pixels
   * @uxpinpropname Width
   * */
  chartWidth: PropTypes.number,

  /**
   * @uxpindescription Chart height in pixels
   * @uxpinpropname Height
   * */
  chartHeight: PropTypes.number,

  /**
   * @uxpindescription A variety of chart animation options
   * @uxpinpropname Animation
   * */
  animation: PropTypes.oneOf(animationOptions),

  /**
   * Color to be used on all chart lines, unless colorRange is provided
   * @uxpinignoreprop
   */
  // eslint-disable-next-line react/no-unused-prop-types
  color: PropTypes.string,

  /**
   * @uxpindescription The list of colors to use for the chart. Put each color on a separate line. Use a color token or hex. 
   * @uxpincontroltype codeeditor
   * */
  colorRange: PropTypes.string,

  /** Data Array. Structure:  [{ "theta": 1, "label": "apples" }, {"theta": 4, "label": "oranges"}, {"theta": 6, "label": "cherries"}]  */
  /**
   * @uxpindescription The list of pie slices. Values are relative and don't have to equal 100(%). Put each slice on a separate line using this format: Label Value | Slice Relative Width. For example: Apple | 4 or Bananas | 33% (Optional)
   * @uxpinpropname Data
   * @uxpincontroltype codeeditor
   */
  pieSlices: PropTypes.string,

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
  pieSlices: defaultChartData,
  chartWidth: defaultHeight,
  chartHeight: defaultWidth,
  animation: 'gentle',
  hint: true,
  labelsRadiusMultiplier: '1.1',
  opacity: '1',
  radius: defaultRadius,
  padAngle: defaultPadAngle,
  innerRadius: defaultInnerRadius,
  colorRange: defaultColorRange,
};
