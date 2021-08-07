import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ActivityItem as FActivityItem } from '@fluentui/react/lib/ActivityItem';
import { Icon } from '@fluentui/react/lib/Icon';
import { UxpColors } from '../_helpers/uxpcolorutils';
import * as UXPinParser from '../_helpers/UXPinParser';



const defaultIcon = "Info";
const defaultIconColor = "#000000";
const defaultDescription = 'link(Tahlia) ran a new system test';
const defaultBody = 'link(System Test #420) contains 3 components. You have been given access privileges.';
const defaultTimeStamp = 'Just now';
const linkTarget = 'uxpin_proto_';



class ActivityItem extends React.Component {

    constructor(props) {
        super(props);

        //State currently unused. 
        this.state = {
            comments: "",
            description: ""
        }
    }

    set() {
        let description = this._getMessageText(this.props.description);
        let comments = this._getMessageText(this.props.bodyCopy);

        this.setState(
            {
                comments: comments,
                description: description
            }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.description !== this.props.description
            || prevProps.bodyCopy !== this.props.bodyCopy
        ) {
            this.set();
        }
    }

    _getMessageText(rawText) {
        let elements;
        let parsedOutput = UXPinParser.parse(rawText);
        console.log("Text parsedOutput in JSON: " + JSON.stringify(parsedOutput));

        return parsedOutput.map(
            (item) => {
                // If not type compound, return the single element
                if (item.type !== "compound") {
                    return this._parseItem(item);
                }
                else {
                    // If type compound, map the item values
                    elements = item.value.map(
                        (subItem) => {
                            // Second map of parsedOutput.value to seperate each object of links, icons, and text
                            return this._parseItem(subItem);
                        }
                    )
                    return elements;
                }
            }
        )
    }

    _parseItem(item) {
        if (item) {
            const key = _.uniqueId('text_');
            return item.type === "link" ? this._getLinkElement(key, item?.text, item?.href)
                : this._getTextElement(key, item?.text);
        }
    }

    _getTextElement(key, text) {
        return (<span key={key}> {text} </span>);
    }

    _getLinkElement(key, text, href) {
        return (<a key={key} href={href ? href : ''} target={href ? linkTarget : ''}>{text}</a>)
    }

    //Tokenize the string coming in from UXPin for the message 
    //    to support the link(Link Text) feature.
    // _getTokenizedText(text) {

    //     // let tokens = UXPinParser.parseRow(text).map(
    //     //     (item, index) => {
    //     //         if (item.type === "link") {
    //     //             console.log("Found a link: (" + item.text + ") href= " + item.href);
    //     //             return (
    //     //                 // <span>{item.text}</span>
    //     //                 <Link
    //     //                     value={item.text}
    //     //                     linkHref={item.href}
    //     //                 />
    //     //             );
    //     //         }
    //     //         if (item.type === "text") {
    //     //             return (<span key={index}>{item.text}</span>);
    //     //         }
    //     //     }
    //     // );



    //     let tokens = getTokens(text).mixed.map((el, i) => {
    //         if (typeof (el) === 'string') {
    //             return (<span key={i}> {el} </span>);
    //         }
    //         else if (el.type == 'link') {
    //             return el.suggestions[0];
    //         }
    //         else if (el.suggestions[0]) {
    //             // if there's a suggestion, call the function
    //             return el.suggestions[0];
    //         } else {
    //             // there's no suggestion, return the text
    //             return (<span key={i}> {el.tokenString} </span>);
    //         }
    //     });

    //     return tokens;
    // }

    render() {

        var icon = '';
        if (this.props.icon) {
            let c = this.props.iconColor ? this.props.iconColor : defaultIconColor;

            let cHex = UxpColors.getHexFromHexOrToken(c);
            let cStyle = { color: cHex };

            icon = (
                <Icon
                    iconName={this.props.icon.trim()}
                    className={cStyle} />
            );
        }

        return (
            <FActivityItem
                {...this.props}
                activityIcon={icon}
                activityDescription={this.state.description}
                comments={this.state.comments}
                timeStamp={this.props.timeStamp}
                isCompact={this.props.isCompact}
            />
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ActivityItem.propTypes = {
    /**
     * @uxpindescription The exact name from the icon library. Displays on the left side. (Optional)
     * @uxpinpropname Icon Name
     */
    icon: PropTypes.string,

    /**
     * @uxpindescription Use a color token, such as 'themePrimary' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Icon Color
     * */
    iconColor: PropTypes.string,

    /**
     * @uxpindescription The top line of text summarizing what the activity was. Supports the link(Click Me) feature. 
     * @uxpinpropname Description
     * @uxpincontroltype textfield(4)
     */
    description: PropTypes.string,

    /**
     * We have to have a proprietary prop or else Microsoft will use this value before we can transform the input. 
     * This prop will be mapped to the 'comments' property. 
     * @uxpindescription The main body of text detailing the activity. Supports the link(Click Me) feature. 
     * @uxpinpropname Comments
     * @uxpincontroltype textfield(5)
     */
    bodyCopy: PropTypes.string,

    /**
     * @uxpindescription Brief timestamp info. 
     * @uxpinpropname Timestamp
     */
    timeStamp: PropTypes.string,

    /** 
    * @uxpindescription Whether to display the control in Compact mode. 
    * @uxpinpropname Compact Mode
    */
    isCompact: PropTypes.bool
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
ActivityItem.defaultProps = {

    icon: defaultIcon,
    iconColor: defaultIconColor,
    description: defaultDescription,
    bodyCopy: defaultBody,
    timeStamp: defaultTimeStamp,
    isCompact: false
}


export { ActivityItem as default };
