import * as React from 'react';
import DetailsList from '../DetailsList';


const searchIcon = "Filter";
const searchPlaceholder = "Filter";
const defaultAlignRight = '5';
const defaultAlignCenter = "3, 4";
const defaultMinWidth = 125;
const defaultWidths = `flex



200`;

const defaultColumns = `Column A
Column B
Column C
Column D
Actions`;
const defaultRows = `link(PayPal.com|www.paypal.com), icon(CircleCheckSolid|success) Ready, C-1, D-1, icon(Deploy|blue-600) Deploy
link(Component_Name_B), icon(CircleWarningSolid|warning) Restarting..., C-2, D-2, icon(MoreVertical|blue-600)
link(Component_Name_C), icon(CircleClearSolid|error) Unavailable, C-3, D-3, icon(MoreVertical|blue-600)`;



export default (
  <DetailsList
    uxpId='DetailsList1'
    columns={defaultColumns}
    items={defaultRows}
    minWidth={defaultMinWidth}
    widths={defaultWidths}
    header={true}
    alignRight={defaultAlignRight}
    alignCenter={defaultAlignCenter}
    isSearchEnabled={true}
    icon={searchIcon}
    placeholder={searchPlaceholder}
    shimmer={true}
    shimmerDuration={1}
    shimmerLines={3}
  />
)