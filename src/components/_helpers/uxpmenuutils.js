import * as UXPinParser from './UXPinParser';
import { SelectableOptionMenuItemType } from '@fluentui/react/';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';

export const UxpMenuUtils = {
  /**
   * The preferred tag for a child menu item.
   */
  childTag: '*',

  /**
   * The preferred divider string for a menu: 'divider'
   */
  dividerText1: 'divider',

  /**
   * An alternative divider string for a menu: '----'
   */
  dividerText2: '----',

  uxpTypeDivider: 'divider',
  uxpTypeGroup: 'group',
  uxpTypeChild: 'child',
  uxpTypeStandardItem: 'item',

  /**
   * For context menus, the enum to use for a header item.
   */
  cmItemTypeHeader: ContextualMenuItemType.Header,

  /**
   * For context menus, the enum to use for a divider item.
   */
  cmItemTypeDivider: ContextualMenuItemType.Divider,

  /**
   * For 'selectable option menus', such as Dividers and Comboboxes, the enum to use for a header item.
   */
  somItemTypeHeader: SelectableOptionMenuItemType.Header,

  /**
   * For 'selectable option menus', such as Dividers and Comboboxes, the enum to use for a divider item.
   */
  somItemTypeDivider: SelectableOptionMenuItemType.Divider,

  /**
   * Tests whether the raw UXPin prop text for a menu or item list includes
   * any explicitly identified children.
   * The preferred childTag must be the first character on the line.
   * @param {string} rawPropText The raw UXPin prop text for a menu or item list. Pass in the raw multi-line string, entered into a Codeeditor in the Props Panel.
   * @returns {boolean} Returns true if explicitly identified children are found, false otherwise.
   */
  testForChildren: function (rawPropText) {
    if (rawPropText) {
      //Split the raw prop text into individual items based on return (new line breaks)
      let items = rawPropText.match(/[^\r\n]+/g);

      if (items && items.length) {
        for (var i = 0; i < items.length; i++) {
          let item = items[i]?.trim();
          if (item.startsWith(this.childTag)) {
            return true;
          }
        }
      }
    }

    //Else if we made it this far, there are no headers/children pattern
    return false;
  },

  /**
   * Parses a simple list of raw UXPin prop text from a codeeditor. Does not support dividers or groups.
   * @param {string} rawPropText The raw UXPin prop text for a list. Pass in the raw multi-line string, entered into a Codeeditor in the Props Panel.
   * @param {boolean} parseIcon True to parse the prop text for an icon name. Will set the iconProps params. False to skip icon name processing.
   * @param {boolean} isDisabled Set the 'disabled' prop.
   * @returns {Array} Returns an array of props. Props include key, text, iconProps and disabled.
   */
  parseSimpleListText: function (rawPropText, parseIcon, isDisabled) {
    var propsList = [];

    if (rawPropText) {
      //Split each line out.
      let items = rawPropText.match(/[^\r\n]+/g);

      if (items && items.length) {
        var i;
        for (i = 0; i < items.length; i++) {
          //Parse the individual item. It may have an icon.
          let parsedItems = UXPinParser.parseSimpleTokensRow(items[i]);

          if (parsedItems && parsedItems.length > 0) {
            let icon = '';
            let text = '';

            for (let x = 0; x < parsedItems.length; x++) {
              let tokenInfo = parsedItems[x];
              if (tokenInfo.type === 'icon') {
                icon = tokenInfo.iconName ? tokenInfo.iconName : '';
              } else if (tokenInfo.type === 'text') {
                text = tokenInfo.text ? tokenInfo.text : '';
              }
            }

            let props = {
              key: i,
              text: text,
              disabled: isDisabled,
            };

            if (parseIcon) {
              props.iconProps = { iconName: icon ? icon : '' };
            }

            propsList.push(props);
          }

          // //Parse the individual item. It may have an icon.
          // let parsedItems = UXPinParser.parse(item);

          // if (parsedItems && parsedItems.length > 0) {
          //    let pItem = parsedItems[0];

          //    console.log("parse simple pItem: " + JSON.stringify(pItem));

          //    let trimmedText = pItem?.text?.trim();

          //    if (pItem && trimmedText) {
          //       let iconProps = {
          //          iconName: pItem?.iconName || '',
          //       };

          //       let itemProps = {
          //          key: i,
          //          text: trimmedText,
          //          iconProps: parseIcon ? iconProps : '',
          //          disabled: isDisabled,
          //       };

          //       propsList.push(itemProps);
          //    }
          // }
        }
      }
    }

    return propsList;
  },

  /**
   * Parses a complex list of raw UXPin prop text from a codeeditor. Supports dividers and groups.
   * @param {string} rawPropText The raw UXPin prop text for a list. Pass in the raw multi-line string, entered into a Codeeditor in the Props Panel.
   * @param {boolean} isContextMenuType Fluent has two types of enums for Dividers and Group Headers. Set true to set these with the Context Menu set of enum values. False for the Selectable Option kind.
   * @returns {Array} Returns an array of props. Props include key, itemType, text, iconProps and a custom uxpType.
   */
  parseItemText: function (rawPropText, isContextMenuType) {
    var propsList = [];

    if (rawPropText) {
      //Split each line out.
      let items = rawPropText.match(/[^\r\n]+/g);
      let hasHeadersAndChildren = this.testForChildren(rawPropText);

      if (items && items.length) {
        var i;
        for (i = 0; i < items.length; i++) {
          var item = items[i]?.trim();

          let isChild = item?.startsWith(this.childTag);
          var hasChild = false;
          if (isChild) {
            //We must remove the * before parsing.
            item = item.substring(1).trim();
          } else if (hasHeadersAndChildren) {
            hasChild = this.isChildItem(items, i + 1);
          }

          //Parse the individual item. It may have an icon.
          let parsedItems = UXPinParser.parseSimpleTokensRow(item);

          if (parsedItems && parsedItems.length > 0) {
            let mayBeHeader = hasHeadersAndChildren && hasChild;

            let icon = '';
            let text = '';

            for (let x = 0; x < parsedItems.length; x++) {
              let tokenInfo = parsedItems[x];
              if (!hasChild && tokenInfo.type === 'icon') {
                icon = tokenInfo.iconName ? tokenInfo.iconName : '';
              } else if (tokenInfo.type === 'text') {
                text = tokenInfo.text ? tokenInfo.text : '';
              }
            }

            let props = this.getContextMenuProps(i, text, icon, mayBeHeader, isChild, isContextMenuType);

            //OK! If this is a child item, append it to the last item in the props array. If it's not, push it to the props array.
            if (props) {
              propsList.push(props);
            }
          }
        }
      }
    }

    return propsList;
  },

  /**
   * Parses a complex list of raw UXPin prop text from a codeeditor for the Nav control.
   * @param {string} rawPropText The raw UXPin prop text for a list. Pass in the raw multi-line string, entered into a Codeeditor in the Props Panel.
   * @param {number} selectedIndex The 1-based index for the Nav control's selected index item.
   * @param {Array} disabledList A list of integers. The list represents 1-based indexes of items that should be disabled.
   * @param {boolean} allowChildren True to allow child groupings. False to disallow children and have a single layer. If False, also removes the starting childTag, if present.
   * @returns {Array} Returns an array of props. Props include key, itemType, name, icon and any child groups.
   */
  parseNavItemText: function (rawPropText, selectedIndex, disabledList, allowChildren) {
    //Let's reasonably guarantee an array for the disabled items
    let dList = disabledList ? disabledList : [];

    if (!rawPropText || typeof rawPropText != 'string' || rawPropText.trim().length < 1) return undefined;

    //If this list has children, then the top level array represents groups.
    var propsList = [];

    if (rawPropText) {
      //Split each line out.
      let items = rawPropText.match(/[^\r\n]+/g);
      let hasChildren = allowChildren ? this.testForChildren(rawPropText) : false;

      //The first item must be a regular nav item.
      for (let i = 0; i < items.length; i++) {
        var item = items[i]?.trim();

        var isChild = item?.startsWith(this.childTag);
        var hasChild = false;
        if (isChild) {
          //We must remove the * before parsing.
          item = item.substring(1).trim();

          //If it's the first item, then we will force it to be a parent.
          if (i < 1) {
            isChild = false;
          }
        } else if (hasChildren) {
          hasChild = this.isChildItem(items, i + 1);
        }

        //Parse the individual item. It may have an icon.
        let parsedItems = UXPinParser.parseSimpleTokensRow(item);

        if (parsedItems && parsedItems.length > 0) {
          let disabled = dList.includes(i + 1) ? true : false;
          //If the index is for a parent or one of its children, expand the parent.
          let expanded = selectedIndex === i + 1 ? true : false;

          let icon = '';
          let text = '';

          for (let x = 0; x < parsedItems.length; x++) {
            let tokenInfo = parsedItems[x];
            if (!hasChild && tokenInfo.type === 'icon') {
              icon = tokenInfo.iconName ? tokenInfo.iconName : '';
            } else if (tokenInfo.type === 'text') {
              text = tokenInfo.text ? tokenInfo.text : '';
            }
          }

          let props = this.getNavItemProps(i, text, icon, expanded, disabled);

          //OK! If this is a child item, append it to the last item in the props array. If it's not, push it to the props array.
          if (props) {
            if (isChild) {
              let parent = propsList[propsList.length - 1];
              this.appendNavItemChildProps(parent, props);

              if (expanded) parent.isExpanded = expanded;
            } else {
              propsList.push(props);
            }
          }
        }
      }
    }

    return propsList;
  },

  /**
   * Affirms whether the item at the specified index is a child menu/list item. If it starts with the childTag, then it will return true.
   * @param {Array} itemList An array of strings.
   * @param {number} testIndex The index for the string to test whether it starts with the childTag.
   * @returns {boolean} True if the item at the specified index starts with the childTag. False otherwise.
   */
  isChildItem: function (itemList, testIndex) {
    if (itemList && itemList.length && itemList.length > testIndex) {
      let item = itemList[testIndex]?.trim();
      return item?.startsWith(this.childTag);
    }

    return false;
  },

  /**
   * Creates a menu item params object with the specified values. Params include key, itemType, text, iconProps and a proprietary uxpType.
   * @param {number} index Index value to use in creating the item's key prop.
   * @param {string} text The value to use for the text prop.
   * @param {string} iconName The value to use for the iconProps iconName prop.
   * @param {boolean} isHeaderCandidate True if this item might be a header item.
   * @param {boolean} isChild True if this item is a known child item.
   * @param {boolean} isContextMenuType True to apply Context Menu enums for Divider and Header items. False to use Selectable Option enums instead.
   * @returns {string} Returns a JSON props object representing a menu item.
   */
  getContextMenuProps: function (index, text, iconName, isHeaderCandidate, isChild, isContextMenuType) {
    let key = index + 1;
    let isDivider = text?.toLowerCase() === this.dividerText1 || text?.startsWith(this.dividerText2);

    if (text && isDivider) {
      let menuProps = {
        key: 'divider_' + key,
        itemType: isContextMenuType ? this.cmItemTypeDivider : this.somItemTypeDivider,
        uxpType: this.uxpTypeDivider,
      };
      return menuProps;
    } else {
      let itemKey = !isHeaderCandidate || isChild ? key : 'header_' + key;
      let itemType =
        !isHeaderCandidate || isChild ? '' : isContextMenuType ? this.cmItemTypeHeader : this.somItemTypeHeader;
      let uxpType = !isHeaderCandidate ? this.uxpTypeStandardItem : isChild ? this.uxpTypeChild : this.uxpTypeGroup;

      let menuProps = {
        key: itemKey,
        text: text ? text : '',
        itemType: itemType,
        iconProps: {
          iconName: iconName ? iconName : '',
        },
        uxpType: uxpType,
      };
      return menuProps;
    }
  },

  /**
   * Creates a Nav item params object with the specified values. Params include key, text, icon name, and whether it should be disabled.
   * @param {number} index Index value to use in creating the item's key prop.
   * @param {string} text The value to use for the text prop.
   * @param {string} iconName The value to use for the iconProps icon prop.
   * @param {boolean} isExpanded If a group, whether it should be shown as expande by default.
   * @param {boolean} disabled True if this item should be disabled. False otherwise.
   * @returns {string} Returns a JSON props object representing a generic Nav item.
   */
  getNavItemProps: function (index, text, iconName, isExpanded, disabled) {
    let navProps = {
      key: index + 1,
      name: text ? text : '',
      icon: iconName ? iconName : '',
      isExpanded: isExpanded,
      disabled: disabled,
      links: [],
    };
    return navProps;
  },

  /**
   * Appends the child item's Nav Item-formatted props to the parent item's list of child Links.
   * @param {string} parentItem The Nav Item-formatted props for a nav group in a Nav UI control.
   * @param {string} childItem The Nav Item-formatted props for a child item in a Nav UI control.
   */
  appendNavItemChildProps: function (parentItem, childItem) {
    if (!parentItem || !childItem) return false;

    parentItem.links = parentItem.links.concat(childItem);
    return true;
  },
};
