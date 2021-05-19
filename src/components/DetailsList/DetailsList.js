import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConstrainMode, SelectionMode } from '@fluentui/react/';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { getTokens, csv2arr } from '../_helpers/parser';
import { getTheme } from '@fluentui/react/lib/Styling';



const theme = getTheme();

const searchFieldWidth = 400;
const searchFieldIconName = "Filter";
const searchFieldPlaceholder = "Filter";
const searchFieldMarginBottom = '24px';


//Use this in the default props below.
const defaultColumnValues = `Column A, Column B, Column C, Column D, Actions`;

const defaultRowValues =
  `link(Component_Name_A), icon(SkypeCircleCheck|green-600) Ready, C-1, D-1, icon(MoreVertical|color-blue-600)
link(Component_Name_B), icon(WarningSolid|orange-500) Restarting..., C-2, D-2, icon(MoreVertical|color-blue-600)
link(Component_Name_C), icon(StatusErrorFull|red-500) Unavailable, C-3, D-3, icon(MoreVertical|color-blue-600)`;

const defaultShimmerDuration = 1;
const defaultShimmerLines = 3;



class DetailsList extends React.Component {
  constructor(props) {
    super(props);

    this.searchTable = this.searchTable.bind(this);
    this.onSearchClear = this.onSearchClear.bind(this);

    console.log("Theme info: theme.palette.themeLighterAlt - " + theme.palette.themeLighterAlt);

    this.state = {
      shimmer: true,
      columns: [],
      rows: [],
      allItems: [],
      alignRight: [],
      alignCenter: [],
    };
  }

  set() {

    this.setState(
      {
        alignRight: this.props.alignRight ? this.props.alignRight.split(',').map(v => parseInt(v.trim())) : [],
        alignCenter: this.props.alignCenter ? this.props.alignCenter.split(',').map(v => parseInt(v.trim())) : [],
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
      prevProps.maxWidth !== this.props.maxWidth ||
      prevProps.shimmer !== this.props.shimmer ||
      prevProps.shimmerDuration !== this.props.shimmerDuration ||
      prevProps.shimmerLines !== this.props.shimmerLines
    ) {

      this.set();
    }
  }


  getColumnClasses(colIndex) {

    let alignHeaderLabels = {};
    if (this.state.alignCenter.includes(colIndex + 1))
      alignHeaderLabels = { margin: '0 auto' };

    if (this.state.alignRight.includes(colIndex + 1))
      alignHeaderLabels = { margin: '0 0 0 auto' };

    return {
      background: 'var(--color-grey-100)',
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
      rows: filteredRows
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

    var columnList = [];
    if (this.props.columns) {
      columnList = csv2arr(this.props.columns)
        .flat()
        .map((columnName, colIndex) => {
          columnName = columnName.trim()

          let name = getTokens(columnName).mixed
            .map((el, i) => typeof el === 'string' ?
              <span key={i}> {el} </span>
              : el.suggestions[0])

          const columnParams = {
            key: columnName,
            name,
            fieldName: columnName,
            isResizable: true,
            minWidth: this.props.minWidth,
            maxWidth: this.props.maxWidth,
            isSorted: false,
            isSortedDescending: false,
            isMultiline: true,
            onColumnClick: () => this.onColumnClick(columnName),
            headerClassName: this.getColumnClasses(colIndex),
          }

          let adjustedIndex = colIndex + 1;

          if (this.state.alignRight.includes(adjustedIndex)) {

            console.log("Yes, right align it: " + adjustedIndex);

            columnParams.styles = {
              textAlign: 'right',
              background: 'purple',
            };
          }

          if (this.state.alignCenter.includes(adjustedIndex)) {
            console.log("Yes, center align it: " + adjustedIndex);

            columnParams.styles = {
              textAlign: 'center',
              background: 'red',
            };
          }

          return columnParams
        });
    }

    this.setState({
      columns: columnList,
    }, callback)
  }

  setRows(callback) {
    let rows = [];

    csv2arr(this.props.items).forEach((row, rowIndex) => {
      let r = {
        key: rowIndex,
      }
      this.state.columns.forEach((column, colInd) => {
        if (row[colInd]) {
          const value = row[colInd].trim()
          let name = getTokens(value).mixed ? getTokens(value).mixed
            .map((el, i) => typeof el === 'string' ?
              <span key={i}> {el} </span> :
              el.suggestions[0])
            :
            getTokens(value).text

          r[column.fieldName] = name
        }

      })
      rows.push(r)
    });

    this.setState({ rows }, callback);
    this.setState({ allItems: rows });
  }


  render() {

    return (

      <Stack>

        {this.props.isSearchEnabled &&
          <StackItem
            align="end"
            styles={{ root: { marginBottom: searchFieldMarginBottom } }}
          >
            <SearchBox
              iconProps={{ iconName: this.props.icon.trim() }}
              placeholder={this.props.placeholder}
              onChange={(e, v) => { this.searchTable(v) }}
              onClear={this.onSearchClear}
              styles={{ root: { width: searchFieldWidth } }}
            />
          </StackItem>
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
              onRenderRow={(props, defaultRender) => (
                <>
                  {defaultRender({ ...props, styles: { root: { background: 'white' } } })}
                </>
              )}
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
   * @uxpindescription Enter one column per row. Supports these features: link(Link Text) and icon(Name|color-blue-600). Also supports CSV formatting.
   * @uxpinpropname Headers
   * @uxpincontroltype codeeditor
   * */
  columns: PropTypes.string,

  /** 
   * 
   * Separate each row with new line or || symbol.
   * Icon token icon(Snow|blue-600)
   * @uxpindescription Enter one row per line. Supports these features: link(Link Text) and icon(Name|color-blue-600). Also supports CSV formatting. 
   * @uxpinpropname Rows
   * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

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
  * @uxpindescription Minimum column width width 
  * @uxpinpropname Min Width
  */
  minWidth: PropTypes.number,

  /**
  * @uxpindescription Maximum column width width 
  * @uxpinpropname Max Width
  */
  maxWidth: PropTypes.number,

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
  columns: defaultColumnValues,
  items: defaultRowValues,
  minWidth: 125,
  maxWidth: 350,
  header: true,
  alignRight: "5",
  alignCenter: "3, 4",
  isSearchEnabled: true,
  icon: searchFieldIconName,
  placeholder: searchFieldPlaceholder,
  shimmer: true,
  shimmerDuration: defaultShimmerDuration,
  shimmerLines: defaultShimmerLines
};


export { DetailsList as default };
