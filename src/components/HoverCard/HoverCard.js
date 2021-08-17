import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HoverCard as FHoverCard, HoverCardType } from '@fluentui/react/lib/HoverCard';

export default function HoverCard(props){
   
    const plainCardProps= {
        onRenderPlainCard: onRenderPlainCard,
      };

      function onRenderPlainCard(){
        return (
          <div>
           <p>hello</p>
          </div>
        )
      }

    return (
        <FHoverCard
        // cardDismissDelay={2000}
        type={HoverCardType.plain}
        plainCardProps={plainCardProps}
        // onRenderCompactCard={onRenderCard}
        // componentRef={hoverCard}
        // onCardHide={onCardHide}
      >
        <span >Hover Over ffffMe</span>
      </FHoverCard>
        )
}

HoverCard.propTypes = {
    // onRenderPlainCard: PropTypes.func
}