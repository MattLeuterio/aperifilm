import React from 'react';
import PropTypes from 'prop-types';

import { BottleRender } from './style';
import FullBottle from '../../assets/icons/aperitif-bottle-full.svg';
import HalfBottle from '../../assets/icons/aperitif-bottle-half.svg';
import EmptyBottle from '../../assets/icons/aperitif-bottle-empty.svg';

const RenderBottles = ({
  vote, size
}) => {
  if (vote >= 0 && vote < 0.5) {
    return (
      <>
        <BottleRender size={size} srcBg={FullBottle.src}>
        </BottleRender>
        <BottleRender size={size} srcBg={FullBottle.src}>
        </BottleRender>
        <BottleRender size={size} srcBg={FullBottle.src}>
        </BottleRender>
        <BottleRender size={size} srcBg={FullBottle.src}>
        </BottleRender>
        <BottleRender size={size} srcBg={FullBottle.src}>
        </BottleRender>
      </>
    )
  } else if (vote >= 0.5 && vote <= 1) {
      return (
        <>
          <BottleRender size={size} srcBg={HalfBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
        </>
      )
    } else if (vote > 1 && vote <= 2) {
      return (
        <>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
        </>
      )
    } else if (vote > 2 && vote <= 3) {
      return (
        <>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={HalfBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
        </>
      )
    } else if (vote > 3 && vote <= 4) {
      return (
        <>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
        </>
      )
    } else if (vote > 4 && vote <= 5) {
      return (
        <>
            <BottleRender size={size} srcBg={EmptyBottle.src}>
            </BottleRender>
            <BottleRender size={size} srcBg={EmptyBottle.src}>
            </BottleRender>
            <BottleRender size={size} srcBg={HalfBottle.src}>
            </BottleRender>
            <BottleRender size={size} srcBg={FullBottle.src}>
            </BottleRender>
            <BottleRender size={size} srcBg={FullBottle.src}>
            </BottleRender>
          </>
      )
    } else if (vote > 5 && vote <= 6) {
      return (
        <>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
        </>
      )
    } else if (vote > 6 && vote <= 7) {
      return (
        <>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={HalfBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
        </>
      )
    } else if ( vote > 7 && vote <= 8) {
      return (
        <>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={FullBottle.src}>
          </BottleRender>
        </>
      )
    } else if (vote > 8 && vote <= 9) {
      return (
        <>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={HalfBottle.src}>
          </BottleRender>
        </>
      )
    } else if (vote > 9 && vote <= 10) {
      return (
        <>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
          <BottleRender size={size} srcBg={EmptyBottle.src}>
          </BottleRender>
        </>
      )
    }
};

RenderBottles.SIZE = {
	SMALL: 'small',
	MEDIUM: 'medium'
}

RenderBottles.defaultProps = {
	size: 'medium'
}

export default RenderBottles;
