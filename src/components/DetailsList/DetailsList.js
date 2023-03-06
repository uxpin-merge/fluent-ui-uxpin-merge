import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConstrainMode, SelectionMode, mergeStyleSets, Text } from '@fluentui/react/';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { UxpColors } from '../_helpers/uxpcolorutils';
//import { Text } from '../Text/Text';
import { Link } from '../Link/Link';
import { Icon } from '../Icon/Icon';

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



class DetailsList extends React.Component {
   constructor(props) {
      super(props);

      //  this.searchTable = this.searchTable.bind(this);
      //  this.onSearchClear = this.onSearchClear.bind(this);

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

      console.log("Items: " + this.props.items);

      this.setColumns();
      this.setRows();

   }

   componentDidMount() {
      this.set();
   }

   componentDidUpdate(prevProps) {
      if (
         prevProps.columns !== this.props.columns ||
         prevProps.items !== this.props.items


         // prevProps.minWidth !== this.props.minWidth ||
         // prevProps.widths !== this.props.widths ||
         // prevProps.alignRight !== this.props.alignRight ||
         // prevProps.alignCenter !== this.props.alignCenter ||
         // prevProps.shimmer !== this.props.shimmer ||
         // prevProps.shimmerDuration !== this.props.shimmerDuration ||
         // prevProps.shimmerLines !== this.props.shimmerLines
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

      const headerBg = UxpColors.getHexFromHexOrToken(headerBackgroundColor);

      return {
         background: headerBg,
         selectors: {
            '& .ms-DetailsHeader-cellName': alignHeaderLabels,
         }
      }
   }

   setColumns() {
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

            //  onColumnClick: () => this.onColumnClick(columnNameText + suffix),

            isMultiline: true,
            className: {
               textAlign: txtAlign,
            },
         };

         if (iconName) {
            columnParams.iconName = iconName;
            columnParams.iconClassName = {
               marginRight: '6px',
               color: defaultTextColor,
            };
         }

         columnHeadings.push(columnParams);
      }

      this.setState({
         columns: columnHeadings,
      });
   }

   setRows() {
      let rows = [];

      console.log("Entering setRows() ");

      UXPinParser.parseMultipleRowsCSV(this.props.items).map((row, rowIndex) => {
         let r = {
            key: rowIndex,
         };

         this.state.columns.map((column, colInd) => {
            if (row[colInd]) {
               let rawCellContents = row[colInd];

               console.log("Row " + rowIndex + ", Column " + colInd + ", Contents: \n    " + rawCellContents);

               //Parse one cell at a time
               let parsedCell = UXPinParser.parseRow(rawCellContents, colInd);
               let parsedCellElements = [];

               console.log("parsedCell obj: " + JSON.stringify(parsedCell));

               if (parsedCell.type !== 'compound') {
                  let cellItem = this._getUIElement(parsedCell[0]);

                  if (cellItem) {
                     parsedCellElements.push(cellItem);
                  }
                  else {
                     console.log("  **** UNDEFINED parsedCell obj ");
                  }


               }
               else {
                  //Else it's a 'compound' array of elements
                  parsedCell.value.map((subElement, k) => {

                     console.log("subElement obj: " + JSON.stringify(subElement));

                     let cellItem = this._getUIElement(subElement);

                     if (cellItem) {
                        parsedCellElements.push(cellItem);
                     }
                     else {
                        console.log("  **** UNDEFINED parsedCell obj");
                     }
                  });
               }

               r[column.fieldName || ''] = parsedCellElements;
            }
         });

         rows.push(r);
      });

      this.setState({
         rows: rows,
         allItems: rows,
      });
   }

   _getUIElement(item) {
      let key = _.uniqueId("e_");

      console.log(">>> Looking at item " + item.type + ", Text: " + item.text);

      if (item) {
         if (item.type === "link") {
            return "link: " + item?.href + "  |  " + item?.text;
         }
         else if (item.type === "icon") {
            return "icon: " + item?.iconName + "  |  item.color: " + item.color + "  |  item?.colorToken: " + item?.colorToken;
         }

         else {
            //return "text obj: " + item?.text;
            return this._getTextElement(key, item?.text);
         }

         // return item.type === "link" ? this._getLinkElement(key, item?.text, item?.href)
         //    : item.type === "icon" ? this._getIconElement(key, item?.iconName, item.color ? item.color : item?.colorToken)
         //       : this._getTextElement(key, item?.text);
      }
   }

   _getTextElement(key, text) {
      //Test for an empty cell item
      let txt = text === emptyHeaderText1 ? "" : text;

      let fTextStyles = {
         root: {
            //Fixes the 'nudge up/down' issues for larger and smaller sizes
            display: 'block',
            //Fixes the janked line height issues for larger and smaller sizes
            lineHeight: 'normal',
         }
      }

      return (<span key={key}>

         {txt}

      </span>);
   }


   render() {


      return (

         <Stack>

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
                     {...this.props}
                     columns={this.state.columns}
                     items={this.state.rows}
                     selectionMode={SelectionMode.none}
                     constrainMode={ConstrainMode[ConstrainMode.horizontalConstrained]}
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
   // children: PropTypes.node,

   /**
   * @uxpindescription Whether to show the filter SearchBox 
   * @uxpinpropname Show Filter
   */
   // isSearchEnabled: PropTypes.bool,

   /**
    * @uxpindescription The exact name from the icon library. Displays on the right side. 
    * @uxpinpropname Search Icon
    * */
   // icon: PropTypes.string,

   /**
    * @uxpindescription Placeholder text to show in the text field when it's empty
    * @uxpinpropname Search Placeholder
    * */
   // placeholder: PropTypes.string,

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
   // minWidth: PropTypes.number,

   /**
    * @uxpindescription Default Column Widths. Optionally specify default widths for individual columns. 
    * Leave line blank and the default Min Width will be applied. 
    * To create a specifically sized column width, enter both a Minimum and Max value as: 24 | 24
    * Enter "flex" with an optional number, e.g., "flex 2", (no quotes) for a column to proportionally take any remaining available space.
    * NOTE: The Best Practice is to specify at least one column as "flex" (no quotes). If none is specified, the last column is assigned all remaining horizontal space.
    * @uxpinpropname Col Widths
    * @uxpincontroltype codeeditor
    */
   // widths: PropTypes.string,

   /**
   * Example: 2, 3
   * @uxpindescription Enter a comma-separated list of column numbers for right aligning their contents (Optional)
   * @uxpinpropname Align Right
   */
   // alignRight: PropTypes.string,

   /**
   * Example: 2, 3
   * @uxpindescription Enter a comma-separated list of column numbers for center aligning their contents (Optional)
   * @uxpinpropname Align Center
   */
   // alignCenter: PropTypes.string,

   /**
   * @uxpindescription Whether to display the shimmer 
   * @uxpinpropname Shimmer
   */
   // shimmer: PropTypes.bool,

   /**
   * @uxpindescription Shimmer duration, in seconds
   * @uxpinpropname Shimmer Duration
   */
   // shimmerDuration: PropTypes.number,

   /**
   * @uxpindescription Number of Shimmer lines
   * @uxpinpropname Shimmer Lines
   */
   // shimmerLines: PropTypes.number,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
DetailsList.defaultProps = {
   header: true,
   columns: '',
   items: '',

   // minWidth: 125,
   // widths: '',
   // alignRight: '',
   // alignCenter: '',
   // isSearchEnabled: true,
   // icon: searchFieldIconName,
   // placeholder: searchFieldPlaceholder,
   // shimmer: false,
   // shimmerDuration: 0,
   // shimmerLines: 0
};


export { DetailsList as default };
