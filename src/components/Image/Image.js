import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    Image as FImage,
    ImageFit
} from '@fluentui/react/lib/Image';



//This is the default URL to use for a generic female user
let defaultImageURL = "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/golden_gate_bridge.jpg";

const fitCenter = 'center';
const fitCenterCover = 'center cover';
const fitCenterContain = 'center contain';
const fitContain = 'contain';
const fitCover = 'cover';
const fitNone = 'none';



class Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    _getFitCode() {
        let fit = this.props.imageFit;
        let code = fit === fitCenter ? ImageFit.center  //fitCenterCode
            : fit === fitCenterContain ? ImageFit.centerContain // fitCenterContainCode
                : fit === fitCenterCover ? ImageFit.centerCover //fitCenterCoverCode
                    : fit === fitContain ? ImageFit.contain // fitContainCode
                        : fit === fitCover ? ImageFit.cover // fitCoverCode
                            : ImageFit.none; // fitNoneCode;

        return code;
    }

    _onClick() {
        //Raise this event to UXPin.
        if (this.props.onImageClick) {
            this.props.onImageClick();
        }
    }

    render() {
        let fit = this._getFitCode();

        let mWidth = this.props.imgWidth > 0 ? this.props.imgWidth : 1;
        let mHeight = this.props.imgHeight > 0 ? this.props.imgHeight : 1;

        let imgProps = {
            shouldFadeIn: true,
            src: this.props.imageUrl,
            imageFit: fit,
            maximizeFrame: true,
            width: mWidth,
            height: mHeight,
        }

        return (

            <FImage
                {...imgProps}
                onClick={() => { this._onClick() }}
            />

        );
    }


}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Image.propTypes = {

    /**
    * @uxpindescription The URL to an image file. TIP: Put any image on screen, in the UXPin Preview, right-click and copy the image URL, then paste that URL into this box. Then move the original image off canvas -- but don't delete it!
    * @uxpinpropname Img URL
    * @uxpincontroltype textfield(6)
    */
    imageUrl: PropTypes.string,

    /**  
    * @uxpindescription How to scale and fit the image within the viewable space 
    * @uxpinpropname Fit
    */
    imageFit: PropTypes.oneOf([fitCenter, fitCenterCover, fitContain, fitCenterContain, fitCover, fitNone]),

    /**
    * NOTE: This cannot be called just 'minWidth,' or else there is a namespace collision with regular CSS prop
    * @uxpindescription Minimum image width. Useful when putting an image into a card or stack. 
    * @uxpinpropname Width
    */
    imgWidth: PropTypes.number,

    /**
     * NOTE: This cannot be called just 'minHeight,' or else there is a namespace collision with regular CSS prop
     * @uxpindescription Minimum image height. Useful when putting an image into a card or stack. 
     * @uxpinpropname Height
     */
    imgHeight: PropTypes.number,

    /**
     * @uxpindescription Fires when the control is clicked on
     * @uxpinpropname Click
     * */
    onImageClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
Image.defaultProps = {
    imageUrl: defaultImageURL,
    imageFit: fitContain,
    imgWidth: 200,
    imgHeight: 200,
}


export { Image as default };