import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Icon, Link, ConstrainMode, SelectionMode, mergeStyleSets } from '@fluentui/react/';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { UxpColors } from '../_helpers/uxpcolorutils';
import * as UXPinParser from '../_helpers/UXPinParser';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';
import { UxpMenuUtils } from '../_helpers/uxpmenuutils';


const searchFieldWidth = 400;
const searchFieldIconName = "Filter";
const searchFieldPlaceholder = "Filter";
const searchFieldMarginBottom = '24px';

const dataTextSize = "smallPlus";
const defaultTextColor = "#000";
const headerBackgroundColor = 'neutralLighterAlt';
const linkTarget = "_UXPin Mockup";

const emptyHeaderText1 = "----";

const iconSizeMap = {
  tiny: 10,
  xSmall: 10,
  small: 14,
  smallPlus: 14,
  medium: 16,
  mediumPlus: 16,
  large: 18,
  xLarge: 22,
  xxLarge: 32,
  mega: 64,
};

//A StackItem that will spring to fill available space.
const spanner = (
  <StackItem grow={1}>
    <span />
  </StackItem>
);

const commandBarTokens = {
  childrenGap: 6,
  padding: 0,
};

const classNames = mergeStyleSets({
  textContainer: {
    color: "#000",
  },
  linkContainer: {
    '& div,a,button,span': {
      display: 'inline !important',
    },
    '& + .linkContainer': {
      marginLeft: '5px',
    },
  },
  iconContainer: {
    verticalAlign: 'middle',
    alignItems: 'center',
    '& .ms-Icon': {
      display: 'inline',
    },
    '& + .iconContainer': {
      marginLeft: '5px',
    },
  },
});

let spanStyle = {
  display: 'inline-block',
  marginLeft: '5px',
  verticalAlign: 'middle',
};



class DetailsList extends React.Component {
  constructor(props) {
    super(props);

    this.searchTable = this.searchTable.bind(this);
    this.onSearchClear = this.onSearchClear.bind(this);

    this.state = {
      shimmer: true,
      columns: [],
      rows: [],
      allItems: [],
      columnWidths: [],
      alignRight: [],
      alignCenter: [],
    };
  }

  set() {
    let colWidths = this.parseColumnWidths(this.props.widths);
    let alignRightCols = UxpNumberParser.parseInts(this.props.alignRight);
    let alignCenterCols = UxpNumberParser.parseInts(this.props.alignCenter);

    this.setState(
      {
        columnWidths: colWidths,
        alignRight: alignRightCols ? alignRightCols : [],
        alignCenter: alignCenterCols ? alignCenterCols : [],
        shimmer: this.props.shimmer
      },
      () => this.setColumns(this.setRows)
    );

    if (this.props.shimmer) {
      setTimeout(
        () => {
          this.setState({
            shimmer: false
          })
        },
        (this.props.shimmerDuration || defaultShimmerDuration) * 1000
      )
    }
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.alignRight !== this.props.alignRight ||
      prevProps.alignCenter !== this.props.alignCenter ||
      prevProps.columns !== this.props.columns ||
      prevProps.items !== this.props.items ||
      prevProps.minWidth !== this.props.minWidth ||
      prevProps.widths !== this.props.widths ||
      prevProps.shimmer !== this.props.shimmer ||
      prevProps.shimmerDuration !== this.props.shimmerDuration ||
      prevProps.shimmerLines !== this.props.shimmerLines
    ) {
      this.set();
    }
  }

  parseColumnWidths(colWidths) {
    let mWidth = this.props.minWidth;
    let columnWidths = [];
    let cWidths = colWidths?.split('\n');

    for (let i = 0; i < cWidths.length; i++) {
      let wItem = cWidths[i];

      let min = mWidth;
      let max = 0;
      let flex = this.getColWidthFlexInfo(wItem);

      //Did the user specify a min AND a max?
      if (wItem.includes("|")) {
        //Min Width on left, and Max Width on Right
        let right = '', left = '';
        let splitStr = wItem.split('|');

        left = splitStr[0];
        if (splitStr[1]) {
          right = splitStr[1];
        }

        let leftNum = parseInt(left?.trim());
        if (!isNaN(leftNum)) {
          min = leftNum;
        }

        let rightNum = parseInt(right?.trim());
        if (!isNaN(rightNum)) {
          max = rightNum;
        }
      }
      else {
        //Did the user specify a default width? 
        let maxNum = parseInt(wItem?.trim());
        if (!isNaN(maxNum)) {
          max = maxNum;
        }
      }

      columnWidths.push({
        index: i,
        minWidth: min,
        maxWidth: max,
        flexGrow: flex,
      });
    } //for loop

    return columnWidths;
  }

  getColWidthFlexInfo(text) {
    if (text) {
      let normalizedText = text.toLowerCase().replace(/[\W_]+/g, "");

      if (normalizedText.startsWith("flex")) {
        if (normalizedText === "flex") {
          return 1;
        }
        else {
          let flexText = normalizedText.replace("flex", "");
          let flexNum = parseInt(flexText);
          if (!isNaN(flexNum)) {
            return flexNum;
          }
        }
      }
    }

    return 0;
  };

  getColumnClasses(colIndex) {

    let alignHeaderLabels = {};
    if (this.state.alignCenter.includes(colIndex + 1))
      alignHeaderLabels = { margin: '0 auto' };

    if (this.state.alignRight.includes(colIndex + 1))
      alignHeaderLabels = { margin: '0 0 0 auto' };

    const headerBg = UxpColors.getHexFromHexOrToken(headerBackgroundColor);

    return {
      background: headerBg,
      selectors: {
        '& .ms-DetailsHeader-cellName': alignHeaderLabels,
      }
    }
  }

  /**
   * This function sorts the visible/filtered rows based on the text visible to the user and ignores the tags and attributes (colors and icon names) passed as children.
   * @param rows current visible rows
   * @param columnKey the column key to sort rows with
   * @param isSortedDescending the order of the sort
   * @returns the sorted rows based on the text content of the column values
   */
  sortColumns(rows, columnKey, isSortedDescending) {
    return rows.slice(0).sort((a, b) => {
      let aVal = this.getTextContent(a[columnKey]).toLowerCase();
      let bVal = this.getTextContent(b[columnKey]).toLowerCase();
      return isSortedDescending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }

  /**
   * Goes through all children contained in a row object in state and uses element.props.children to get all text visible to the user (ignores the props and attributes like color and icons passed as user input) and returns the string by joining all parts after trimming.
   * @param elem the react element or a component that renders a cell
   * @returns the text content of the elements/components (similar to DOM textContent property which returns the text content of the specified node, and its immediate descendants)
   * 
   */
  getTextContent(elem) {

    return elem.reduce((_text, part) => {
      const children = part.props.children;
      if (children) {
        if (Array.isArray(children)) {
          _text.push(children.join('').trim())
        } else {
          _text.push(children.trim())
        }
      }
      return _text;
    }, []).join(' ')
  }

  /**
   * 
   * This function checks whether row contains any cell that has the text visible to the user which contains the search term. The tags and attributes (colors and icon names) passed as children as ignored from the search.
   * @param i the row object that holds data for a row
   * @param search the search term
   * @returns true, if the search term is a substring of the text content of any cell, false, otherwise
   * 
   */
  includesText(i, search) {

    return Object.values(i).some(elem => {
      if (Array.isArray(elem)) {
        const text = this.getTextContent(elem);
        return text.toLowerCase().includes(search.toLowerCase())
      }
      return false;
    });
  }

  searchText(text) {
    return this.state.allItems.filter(i => this.includesText(i, text));
  }

  searchTable(queryStr) {
    let inputValue = queryStr.trim();

    let filteredRows = this.searchText(inputValue);
    this.setState({
      rows: filteredRows,
    });
  }

  onSearchClear() {
    //Propagate the change to the SearchTable event
    this.searchTable('');
  }

  onColumnClick(columnKey) {

    const { columns, rows } = this.state;
    const newColumns = columns.slice();
    const currColumn = newColumns.filter(currCol => columnKey === currCol.key)[0];

    newColumns.forEach(newCol => {
      if (newCol == currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    })
    const newRows = this.sortColumns(rows, currColumn.fieldName, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      rows: newRows
    })
  }

  setColumns(callback) {
    let columnHeadings = [];
    let colItems = this.props.columns?.split('\n');

    for (let index = 0; index < colItems.length; index++) {

      let columnNameText = colItems[index]?.trim() || ' ';

      let suffix = _.uniqueId('_k_');

      //Figure out if the column's header should be empty
      let colNameTxt = columnNameText.toLowerCase() === emptyHeaderText1 ? ' ' : columnNameText;

      //Can we access the widths? 
      let colWidthInfo = {
        index: index,
        minWidth: this.props.minWidth,
        maxWidth: 0,
        flexGrow: 0,
      };

      if (index < this.state.columnWidths.length) {
        colWidthInfo = this.state.columnWidths[index];
      };

      let iconName = "";
      if (colNameTxt.includes("icon(")) {
        let propsList = UxpMenuUtils.parseSimpleListText(colNameTxt, true, false);
        if (propsList) {
          iconName = propsList[0].iconProps.iconName;
          colNameTxt = propsList[0].text ? propsList[0].text : " ";
        }
      }

      let txtAlign = this.state.alignRight.includes(index + 1) ? 'right' :
        this.state.alignCenter.includes(index + 1) ? 'center' :
          'left';

      let columnParams = {
        uxpIndex: index,                    //For proprietary tracking
        key: "column" + index,
        name: colNameTxt,
        fieldName: colNameTxt,
        flexGrow: colWidthInfo.flexGrow,
        minWidth: colWidthInfo.minWidth,
        maxWidth: colWidthInfo.maxWidth,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        headerClassName: this.getColumnClasses(index),
        onColumnClick: () => this.onColumnClick("column" + index),
        isMultiline: true,
        className: {
          textAlign: txtAlign,
        },
      };

      console.log("Column key: " + columnParams.key);

      if (iconName) {
        columnParams.iconName = iconName;
        columnParams.iconClassName = {
          marginRight: '6px',
          color: "#000",
        };
      }

      columnHeadings.push(columnParams);
    }

    this.setState({
      columns: columnHeadings,
    }, callback);
  }

  setRows(callback) {
    let rows = [];

    UXPinParser.parseMultipleRowsCSV(this.props.items).map((row, rowIndex) => {
      let r = {
        key: rowIndex,
      };

      this.state.columns.map((column, colInd) => {
        if (row[colInd]) {
          let rawCellContents = row[colInd].trim();

          //Parse one cell at a time
          let parsedCell = UXPinParser.parseRow(rawCellContents, column);
          let parsedCellElements = [];

          if (parsedCell.type !== 'compound') {
            let cellItem = this._getUIElement(parsedCell[0]);
            parsedCellElements.push(cellItem);
          }
          else {
            //Else it's a 'compound' array of elements
            parsedCell.value.map((subElement, k) => {
              let cellItem = this._getUIElement(subElement);
              parsedCellElements.push(cellItem);
            });
          }

          //r[column.uxpIndex || ''] = parsedCellElements;
          r[column.fieldName || ''] = parsedCellElements;
        }
      });

      rows.push(r);
    });

    this.setState({
      rows: rows,
      allItems: rows,
    }, callback);
  }

  _getUIElement(item) {
    let key = _.uniqueId("__el__");

    if (item) {
      return item.type === "link" ? this._getLinkElement(key, item?.text, item?.href)
        : item.type === "icon" ? this._getIconElement(key, item?.iconName, item.color ? item.color : item?.colorToken)
          : this._getTextElement(key, item?.text);
    }
  }

  _getTextElement(key, text) {
    //Test for an empty cell item
    let txt = text === emptyHeaderText1 ? "" : text;
    return (<span key={key} style={spanStyle}> {txt} </span>);
  }

  _getLinkElement(key, text, href) {
    let txt = text ? text : href ? href : '';
    let target = linkTarget;
    if (href && href.includes("preview.uxpin.com")) {
      target = undefined;
    }

    return (
      <span key={key} className={'linkContainer ' + classNames.linkContainer} style={spanStyle}>
        <Link
          href={href ? href : ""}
          target={target} >
          {txt}
        </Link>
      </span>);
  }

  _getIconElement(key, iconName, colorToken) {
    let name = iconName ? iconName.trim() : '';
    let size = iconSizeMap[dataTextSize];
    let color = UxpColors.getHexFromHexOrToken(colorToken);
    if (!color) {
      color = defaultTextColor;
    }

    const iconDisplayClass = {
      color: color,
      fontSize: size,
      height: size,
      width: size,
      display: 'block',
      lineHeight: 'normal',
    };

    return (<span key={key} className={'iconContainer ' + classNames.iconContainer} style={spanStyle}>
      <Icon
        iconName={name}
        className={iconDisplayClass}
      />
    </span >)
  }

  render() {
    //****************************
    //For Inner Stack - CommandBar

    //Set up the StackItems
    let stackList = [];
    if (this.props.children) {

      //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
      let childList = React.Children.toArray(this.props.children);

      //Now, we configure the StackItems
      if (childList) {
        for (let i = 0; i < childList.length; i++) {
          let child = childList[i];
          let stack = (
            <StackItem>
              {child}
            </StackItem>
          );
          stackList.push(stack);
        } //for loop
      } //if childList
    } //If props.children

    let showCommandBar = stackList.length > 0 || this.props.isSearchEnabled;

    //Now, add the spanner
    stackList.push(spanner);

    return (

      <Stack>
        {showCommandBar &&
          <Stack
            tokens={commandBarTokens}
            horizontal={true}
            horizontalAlign={'start'}
            verticalAlign={'center'}
            styles={{ root: { marginBottom: searchFieldMarginBottom } }}
          >
            {stackList}
            {this.props.isSearchEnabled && (
              <StackItem>
                <SearchBox
                  iconProps={{ iconName: this.props.icon.trim() }}
                  placeholder={this.props.placeholder}
                  onChange={(e, v) => { this.searchTable(v) }}
                  onClear={this.onSearchClear}
                  styles={{ root: { width: searchFieldWidth } }}
                />
              </StackItem>
            )}
          </Stack>
        }
        <StackItem>
          <div style={{ display: 'block' }} className={
            {
              selectors: {
                '& .ms-DetailsHeader': {
                  paddingTop: 0,
                },
              }
            }
          }>
            <ShimmeredDetailsList
              enableShimmer={this.state.shimmer}
              {...this.props}
              columns={this.state.columns}
              items={this.state.rows}
              selectionMode={SelectionMode.none}
              constrainMode={ConstrainMode[ConstrainMode.horizontalConstrained]}
              // onRenderRow={(props, defaultRender) => (
              //   <>
              //     {defaultRender({ ...props, styles: { root: { background: 'white' } } })}
              //   </>
              // )}
              isHeaderVisible={this.props.header}
            />
          </div>
        </StackItem>

      </Stack>

    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
DetailsList.propTypes = {

  /**
   * Don't show this prop in the UXPin Editor. 
   * @uxpinignoreprop   
   * @uxpinpropname CommandBar Children
   */
  children: PropTypes.node,

  /**
  * @uxpindescription Whether to show the filter SearchBox 
  * @uxpinpropname Show Filter
  */
  isSearchEnabled: PropTypes.bool,

  /**
   * @uxpindescription The exact name from the icon library. Displays on the right side. 
   * @uxpinpropname Search Icon
   * */
  icon: PropTypes.string,

  /**
   * @uxpindescription Placeholder text to show in the text field when it's empty
   * @uxpinpropname Search Placeholder
   * */
  placeholder: PropTypes.string,

  /**
  * @uxpindescription Whether to display the table headers 
  * @uxpinpropname Show Headers
  */
  header: PropTypes.bool,

  /** 
   *  Separate each item with new line or | symbol.
   *  Put at the end of the line [color:blue-600] token to set color for whole column.
   * @uxpindescription Enter one column heading value per row. 
   * To include a comma within the text, wrap it in quotes. 
   * To specify an empty heading, leave the field empty or typ in "----" (no quotes).
   * @uxpinpropname Headers
   * @uxpincontroltype codeeditor
   * */
  columns: PropTypes.string,

  /** 
   * 
   * @uxpindescription Separate each row with a new line. Separate each cell with a comma.
   * Link syntax: link(Display Text | HREF) 
   * Icon syntax: icon(IconName | Color_Token or #Hex) 
   * To specify an empty cell, enter "----" (no quotes).
   * NOTE: To display text with a comma, wrap the entire cell's contents in double quotes: "$1,234" 
   * To show an icon plus text with a comma in a cell:  "icon(CashDollar | green-600) $1,234" 
   * To show a comma within a link, wrap the cell contents in double quotes: "link(Dec 24, 2023, 4:15 pm)"
   * @uxpinpropname Rows
   * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

  /**
  * @uxpindescription Minimum column width  
  * @uxpinpropname Min Width
  */
  minWidth: PropTypes.number,

  /**
   * @uxpindescription Default Column Widths. Optionally specify default widths for individual columns. 
   * Leave line blank and the default Min Width will be applied. 
   * To create a specifically sized column width, enter both a Minimum and Max value as: 24 | 24
   * Enter "flex" with an optional number, e.g., "flex 2", (no quotes) for a column to proportionally take any remaining available space.
   * NOTE: The Best Practice is to specify at least one column as "flex" (no quotes). If none is specified, the last column is assigned all remaining horizontal space.
   * @uxpinpropname Col Widths
   * @uxpincontroltype codeeditor
   */
  widths: PropTypes.string,

  /**
  * Example: 2, 3
  * @uxpindescription Enter a comma-separated list of column numbers for right aligning their contents (Optional)
  * @uxpinpropname Align Right
  */
  alignRight: PropTypes.string,

  /**
  * Example: 2, 3
  * @uxpindescription Enter a comma-separated list of column numbers for center aligning their contents (Optional)
  * @uxpinpropname Align Center
  */
  alignCenter: PropTypes.string,

  /**
  * @uxpindescription Whether to display the shimmer 
  * @uxpinpropname Shimmer
  */
  shimmer: PropTypes.bool,

  /**
  * @uxpindescription Shimmer duration, in seconds
  * @uxpinpropname Shimmer Duration
  */
  shimmerDuration: PropTypes.number,

  /**
  * @uxpindescription Number of Shimmer lines
  * @uxpinpropname Shimmer Lines
  */
  shimmerLines: PropTypes.number,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
DetailsList.defaultProps = {
  columns: '',
  items: '',
  minWidth: 125,
  widths: '',
  header: true,
  alignRight: '',
  alignCenter: '',
  isSearchEnabled: true,
  icon: searchFieldIconName,
  placeholder: searchFieldPlaceholder,
  shimmer: false,
  shimmerDuration: 0,
  shimmerLines: 0
};


export { DetailsList as default };
