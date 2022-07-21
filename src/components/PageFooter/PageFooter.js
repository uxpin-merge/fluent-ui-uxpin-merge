import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    Image,
    ImageFit
} from '@fluentui/react/lib/Image';
import { Link } from '@fluentui/react/lib/Link';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { UxpColors } from '../_helpers/uxpcolorutils';
import { UxpImageUtils } from '../_helpers/uxpimageutils';



const defaultTextColor = 'black';
const defaultTextColorHex = '#000000';
const defaultTextSize = '14px';

const defaultLine1Text = "Product or Team Name";
const defaultLine1TextSize = 'medium';
const defaultLine2Text = "#chat_support | http://www.website.com";
const defaultLine3Text = "prod_support@email.com | mailto:prod_support@email.com";

const defaultBgColor = 'transparent';

const defaultBorderColor = 'themeDark';
const defaultBorderThickness = 4;
const borderSolid = 'solid';

const defaultInternalPadding = 24;
const defaultTextStackPadding = 6;

const defaultTextStackMinWidth = '300px';

const dividerStyle = {
    width: 1,
    height: 60,
    borderLeft: '1px solid #c8c6c4',
}

const logoURL = 'https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/uxpin_logo_black.png';
const logoWidth = '120';
const logoHeight = '60';
const logoFit = ImageFit.contain;

//Default nav items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultLinks = `Product Home | http://www.website.com
Support | https://www.website.com/help
FAQs | http://website.com/faqs
Github | http://github.website.com/`;

const corpInfoTextSize = '12px';
const copyright = '©' + new Date().getFullYear() + ' Company, Inc. All Rights Reserved.';
const confidentiality = 'CONFIDENTIALITY NOTICE: This web site is intended only for the use of Company employees, and may contain information that is privileged, confidential and exempt from disclosure under applicable law.';



class PageFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            copyright: '',
            links: [],
            textColor: defaultTextColorHex,
        }
    }

    set() {
        this.setItems();

        this.setState(
            {
                textColor:
                    UxpColors.getHexFromHexOrToken(this.props.textColor)
                    || UxpColors.getHexFromHexOrToken(defaultTextColor)
            }
        );
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.links !== this.props.links
            || prevProps.textColor !== this.props.textColor
        ) {
            this.set();
        }
    }


    setItems() {
        var linkList = [];

        if (this.props.links) {
            let items = this.props.links.match(/[^\r\n]+/g);

            if (items && items.length) {
                for (var i = 0; i < items.length; i++) {
                    let item = items[i];

                    let linkInfo = this._parseTextAndLink(item);

                    if (linkInfo)
                        linkList.push(linkInfo);
                } //for loop
            } //if items
        } //if props.links

        this.setState(
            { links: linkList }
        );
    }

    _parseTextAndLink(rawStr) {
        if (rawStr && rawStr.length) {
            let links = rawStr.split("|");

            //First display side
            if (links && links.length) {
                let left = links[0].trim();     //This is the display text
                var right = undefined;          //This is the optional link

                if (links[1]) {
                    right = links[1].trim();
                }

                let linkInfo = {
                    text: left,
                    href: right,
                }

                return linkInfo;
            }
        }

        //If we made it this far, it didn't work out
        return undefined;
    }


    _configTextOrLink(textLinkInfo, textSize, addLinkDelimiter) {
        //Both params are required
        if (!textLinkInfo || !textSize)
            return '';

        //Text prop is required. HREF prop is optional.
        let text = textLinkInfo.text ? textLinkInfo.text : '';
        let href = textLinkInfo.href ? textLinkInfo.href : undefined;

        let fTextStyles = {
            color: href ? undefined : this.state.textColor,
            fontSize: textSize,
            fontWeight: 'normal',
            fontStyle: 'normal',
        }

        let textSpan = (
            <span
                style={fTextStyles}>
                {text}
            </span>
        )

        //if isText, return this part
        if (!href) {
            return textSpan;
        }

        //Should we add a link delimiter?
        var linkDelimiter = '';
        if (addLinkDelimiter) {
            let delimiterStyle = {
                color: this.state.textColor,
                fontSize: textSize,
                fontWeight: 'normal',
                fontStyle: 'normal',
            }

            linkDelimiter = (
                <span
                    style={delimiterStyle}>
                    {" | "}
                </span>
            );
        }

        let linkPart = (
            <>
                <Link
                    href={href}
                    target={"_UXPin Mockup"} //Force open in a new window
                >
                    {textSpan}
                </Link>

                {linkDelimiter}
            </>
        );

        //if isLink, return this part
        return linkPart;
    }


    _getBorderStyle() {
        var bColor = UxpColors.getHexFromHexOrToken(this.props.borderColor);

        //If the line thickness is 0 or the user has removed the line color, then we're done.
        if (this.props.borderThickness < 1 || !bColor)
            return 'none';

        let thickness = this.props.borderThickness > 0 ? this.props.borderThickness : defaultBorderThickness;

        return thickness + 'px ' + borderSolid + ' ' + bColor;
    }


    render() {
        //Outer container stack is a horizontal stack.
        //Left Vertical Stack holds the Page Heading and super & sub text.
        //Right Horizontal Stack holds toolbar.

        //Let's track whether to show the Divider. We only show it if there is left side text to display
        var showDivider = false;

        //****************************
        //OUTER HORIZONTAL STACK
        //For internal padding within the stack. 

        let internalPadding = this.props.internalPadding > -1 ? this.props.internalPadding : 0;

        //With one number, the padding applies to both rows and columns.  
        const outerStackTokens = {
            childrenGap: 24,        //24 between each column in the outer stack
            padding: 0,
        };

        const outerStackStyles = {
            root: {
                display: 'flex',
                overflow: 'hidden',
                // padding: internalPadding,
                background: defaultBgColor,
                borderTop: this._getBorderStyle(),
            },
        };

        //****************************
        //TEXT VERTICAL STACK

        //With one number, the padding applies to both rows and columns.  
        const textStackTokens = {
            childrenGap: defaultTextStackPadding,
            padding: 0,
        };


        //****************************
        //LINE 1 TEXT
        var line1 = '';
        if (this.props.line1Value) {

            let l1Styles = {
                root: {
                    color: this.state.textColor,
                    fontWeight: this.props.line1Bold ? 'bold' : 'normal',
                    fontStyle: this.props.line1Italic ? 'italic' : 'normal',
                    display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
                    lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes
                }
            }

            line1 = (
                <StackItem>
                    <Text
                        styles={l1Styles}
                        variant={defaultLine1TextSize}>
                        {this.props.line1Value}
                    </Text>
                </StackItem>
            );

            showDivider = true;
        }

        //****************************
        //LINE 2 TEXT
        var line2 = '';
        var l2Info = this._parseTextAndLink(this.props.line2Value);
        if (l2Info) {
            let contents = this._configTextOrLink(l2Info, defaultTextSize, false);

            line2 = (
                <StackItem>
                    {contents}
                </StackItem>
            );

            showDivider = true;
        }


        //****************************
        //LINE 3 TEXT
        var line3 = '';
        var l3Info = this._parseTextAndLink(this.props.line3Value);
        if (l3Info) {
            let contents = this._configTextOrLink(l3Info, defaultTextSize, false);

            line3 = (
                <StackItem>
                    {contents}
                </StackItem>
            );
            showDivider = true;
        }


        //****************************
        //VERTICAL DIVIDER

        var divider = '';
        if (showDivider) {
            divider = (
                <StackItem><div style={dividerStyle} /></StackItem>
            );
        }

        //We gotta use the showDivider var
        const textStackStyles = {
            root: {
                minWidth: showDivider ? defaultTextStackMinWidth : 0,
                display: 'flex',
                overflow: 'hidden',
            },
        };

        var spanner = '';
        if (showDivider) {
            spanner = (
                <StackItem grow={1}><span /></StackItem>
            );
        }

        //****************************
        //RIGHT SIDE STACK

        const corpInfoStackStyles = {
            root: {
                maxWidth: showDivider ? '800px' : '100%',
                display: 'flex',
                overflow: 'hidden',
            },
        };

        var logoStack = '';
        let imgURL = UxpImageUtils.getImageUrlByToken(this.props.logoURL);
        if (imgURL) {

            let logoW = this.props.logoWidth > -1 ? this.props.logoWidth + 'px' : logoWidth;
            let logoH = this.props.logoHeight > -1 ? this.props.logoHeight + 'px' : logoHeight;

            let logoProps = {
                shouldFadeIn: true,
                src: imgURL,
                imageFit: logoFit,
                maximizeFrame: true,
                width: logoW,
                height: logoH,
            }

            logoStack = (
                <StackItem>
                    <Image
                        {...logoProps}
                    />
                </StackItem>
            );
        }

        //With one number, the padding applies to both rows and columns.
        const companyInfoStackTokens = {
            childrenGap: defaultTextStackPadding,
            padding: 0,
        };

        //Set up the StackItems
        //The right side is a vertical stack, as well. 
        var linkList = [];
        var linkElem = '';
        if (this.state.links && this.state.links.length) {

            for (var i = 0; i < this.state.links.length; i++) {
                let link = this.state.links[i];

                //Now we put it all together!
                var addLinkDelimiter = false;
                if (i + 1 < this.state.links.length)
                    addLinkDelimiter = true;

                let linkInfo = this._configTextOrLink(link, defaultTextSize, addLinkDelimiter);
                if (linkInfo) {
                    linkList.push(linkInfo);
                }
            } //for loop

            if (linkList.length > 0) {
                linkElem = (
                    <StackItem>
                        <div>{linkList}</div>
                    </StackItem>
                );
            }

        } //If state.links


        //setup copyright and confidentiality
        let copyrightInfo = this._parseTextAndLink(this.props.copyright);
        var copyrightElem = '';
        if (copyrightInfo) {
            let contents = this._configTextOrLink(copyrightInfo, corpInfoTextSize, false);
            copyrightElem = (
                <StackItem>
                    {contents}
                </StackItem>
            );
        }

        let confidentialityInfo = this._parseTextAndLink(this.props.confidentiality);
        var confidentialityElem = '';
        if (confidentialityInfo) {
            let contents = this._configTextOrLink(confidentialityInfo, corpInfoTextSize, false);
            confidentialityElem = (
                <StackItem>
                    {contents}
                </StackItem>
            );
        }


        return (

            <Stack                          //Outer wrapper stack
                {...this.props}
                tokens={outerStackTokens}
                horizontal={true}
                horizontalAlign={'start'}
                verticalAlign={'center'}
                wrap={false}
                styles={outerStackStyles}
                padding={internalPadding + 'px'}>

                <StackItem>
                    <Stack                  //Left side vertical text stack              
                        tokens={textStackTokens}
                        horizontal={false}
                        horizontalAlign={'start'}
                        verticalAlign={'center'}
                        wrap={false}
                        styles={textStackStyles}>

                        {line1}
                        {line2}
                        {line3}

                    </Stack>
                </StackItem>

                {spanner}

                {divider}

                {logoStack}

                <StackItem>
                    <Stack                                  //Right side Company Info Stack
                        tokens={companyInfoStackTokens}
                        horizontal={false}
                        horizontalAlign={'start'}
                        verticalAlign={'center'}
                        wrap={false}
                        styles={corpInfoStackStyles}>

                        {linkElem}

                        {copyrightElem}

                        {confidentialityElem}

                    </Stack>
                </StackItem>

            </Stack>

        );
    }

};


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PageFooter.propTypes = {

    /**
     * @uxpindescription The 1st line of text. Enter product team name. Use format:  Display Text | http://www.website.com (Optional)
     * @uxpinpropname Line 1
     * @uxpincontroltype textfield(3)
     */
    line1Value: PropTypes.string,

    /**
     * @uxpindescription To apply bold formatting
     * @uxpinpropname Line 1 Bold
     */
    line1Bold: PropTypes.bool,

    /**
     * @uxpindescription To apply italic formatting
     * @uxpinpropname Line 1 Italics
     */
    line1Italic: PropTypes.bool,

    /**
     * @uxpindescription The 2nd line of text. Enter a link or chat channel. Use format:  Display Text | http://www.website.com (Optional)
     * @uxpinpropname Line 2
     * @uxpincontroltype textfield(4)
     */
    line2Value: PropTypes.string,

    /**
     * @uxpindescription The 3rd line of text. Enter support email or chat channel. Use format:  Display Text | http://www.website.com (Optional)
     * @uxpinpropname Line 3 
     * @uxpincontroltype textfield(4)
     */
    line3Value: PropTypes.string,

    /**
     * @uxpindescription The list of link items. Put each link on a separate line. Display Text | http://www.website.com (Optional)
     * @uxpinpropname Links
     * @uxpincontroltype codeeditor
     */
    links: PropTypes.string,

    /**
     * @uxpindescription The full URL to an image file. Supports the Image Tokens feature, such as 'person1', 'bridge', 'office', and 'dog'. (Optional)
     * @uxpinpropname Logo URL 
     * @uxpincontroltype textfield(6)
     */
    logoURL: PropTypes.string,

    /**
     * @uxpindescription The width to reserve for the logo
     * @uxpinpropname Logo Width
     */
    logoWidth: PropTypes.number,

    /**
     * @uxpindescription The height to reserve for the logo
     * @uxpinpropname Logo Height
     */
    logoHeight: PropTypes.number,

    /**
     * @uxpindescription The text to show on the Copyright line (Optional)
     * @uxpinpropname Copyright 
     * @uxpincontroltype textfield(4)
     */
    copyright: PropTypes.string,

    /**
     * @uxpindescription The text to show on the Confidentiality line (Optional)
     * @uxpinpropname Confidentiality 
     * @uxpincontroltype textfield(4)
     */
    confidentiality: PropTypes.string,

    /**
     * @uxpindescription Specify a text color with a Hex or color token, such as '#ffffff' or 'blue-700'. 
     * @uxpinpropname Text Color
     */
    textColor: PropTypes.string,

    /**
     * @uxpindescription Specify a text color with a Hex or color token, such as '#ffffff' or 'blue-700'. 
     * @uxpinpropname Border Color
     */
    borderColor: PropTypes.string,

    /**
     * @uxpindescription The thickness of the bottom border line 
     * @uxpinpropname Border Line Thickness
     */
    borderThickness: PropTypes.number,

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Padding within the control. Value must be 0 or more. 
     * @uxpinpropname Padding
     */
    internalPadding: PropTypes.number,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
PageFooter.defaultProps = {
    textColor: defaultTextColor,
    line1Value: defaultLine1Text,
    line1Bold: true,
    line1Italic: false,
    line2Value: defaultLine2Text,
    line3Value: defaultLine3Text,
    links: defaultLinks,
    logoURL: logoURL,
    logoWidth: logoWidth,
    logoHeight: logoHeight,
    copyright: copyright,
    confidentiality: confidentiality,
    borderThickness: defaultBorderThickness,
    borderColor: defaultBorderColor,
    internalPadding: defaultInternalPadding,
};


export { PageFooter as default };