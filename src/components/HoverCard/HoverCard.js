import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HoverCard as FHoverCard, HoverCardType, IExpandingCardProps } from '@fluentui/react/lib/HoverCard';
import { DirectionalHint } from '@fluentui/react/lib/common/DirectionalHint';

export default function HoverCard(props){
   
    const plainCardProps= {
        onRenderPlainCard: onRenderPlainCard,
        directionalHint: DirectionalHint.topCenter,

      };

      function onRenderPlainCard(){
        return (
          <div>
           <p>hello SIMPLE</p>
          </div>
        )
      }
      
      const expandingCardProps= {
        onRenderCompactCard: onRenderExpandedCard,
        directionalHint: DirectionalHint.leftTopEdge,
      };

      function onRenderExpandedCard(){
        return (
          <div>
           <p>hello EXPANDED</p>
          </div>
        )
      }

    return (
        <>
       <FHoverCard
        // cardDismissDelay={2000}
        type={HoverCardType.plain}
        plainCardProps={plainCardProps}
        
        // onRenderCompactCard={onRenderCard}
        // componentRef={hoverCard}
        // onCardHide={onCardHide}
      >
        <span >Hover for SIMPLE</span>
      </FHoverCard>
<br/>
      <FHoverCard
        cardDismissDelay={300}
        // type={HoverCardType.expanding}
        expandingCardProps={expandingCardProps}
        
        // onRenderCompactCard={onRenderCard}
        // componentRef={hoverCard}
        // onCardHide={onCardHide}
      >
        <span >Hover for EXPANDED</span>
      </FHoverCard>
      </>
        )
}

HoverCard.propTypes = {
    // onRenderPlainCard: PropTypes.func
}