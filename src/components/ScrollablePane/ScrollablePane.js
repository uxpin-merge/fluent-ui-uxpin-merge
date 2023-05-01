import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getTheme, mergeStyleSets } from '@fluentui/react/lib/Styling';
// import { lorem } from '@fluentui/example-data';
import { ScrollablePane as ScrollablePaneM } from '@fluentui/react/lib/ScrollablePane';
import { IScrollablePaneStyles } from '@fluentui/react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from '@fluentui/react/lib/Sticky';

// export interface IScrollablePaneExampleItem {
//   color: string;
//   text: string;
//   index: number;
// }
const theme = getTheme();
const classNames = mergeStyleSets({
  wrapper: {
    height: '40vh',
    position: 'relative',
    maxHeight: 'inherit',
  },
  pane: {
    maxWidth: 400,
    border: '1px solid ' + theme.palette.neutralLight,
  },
  sticky: {
    color: theme.palette.neutralDark,
    padding: '5px 20px 5px 10px',
    fontSize: '13px',
    borderTop: '1px solid ' + theme.palette.black,
    borderBottom: '1px solid ' + theme.palette.black,
  },
  textContent: {
    padding: '15px 10px',
  },
});
// const scrollablePaneStyles: Partial<IScrollablePaneStyles> = { root: classNames.pane };
const colors = ['#eaeaea', '#dadada', '#d0d0d0', '#c8c8c8', '#a6a6a6', '#c7e0f4', '#71afe5', '#eff6fc', '#deecf9'];
const items = Array.from({ length: 5 }).map((item, index) => ({
  color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
  text: 'Sample sentence',
  index,
}));
const createContentArea = (item) => (
  <div
    key={item.index}
    style={{
      backgroundColor: item.color,
    }}
  >
    <Sticky stickyPosition={StickyPositionType.Both}>
      <div role="heading" aria-level={1} className={classNames.sticky}>
        Sticky Component #{item.index + 1}
      </div>
    </Sticky>
    <div className={classNames.textContent}>{item.text}</div>
  </div>
);
const contentAreas = items.map(createContentArea);
const ScrollablePane = () => (
  <ScrollablePaneM
    scrollContainerFocus={true}
    scrollContainerAriaLabel="Sticky component example"
    // styles={scrollablePaneStyles}
  >
    {contentAreas}
  </ScrollablePaneM>
);

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
ScrollablePane.propTypes = {
  /**
   * @uxpindescription To display the ScrollablePane in the filled style. Otherwise, displays in the outline style
   * @uxpinpropname Primary Style
   * */
  scrollContainerFocus: PropTypes.bool,
  initialScrollPosition: PropTypes.number,
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
ScrollablePane.defaultProps = {
  scrollContainerFocus: false,
  initialScrollPosition: 0,
};

export { ScrollablePane as default };
