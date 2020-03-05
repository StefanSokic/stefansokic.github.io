import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from './Icon';

const Time = styled.span`
  min-width: 5.5em;
`;

const StartText = styled.span`
  min-width: 2.8em;
`;

const FooterWrapper = styled.button`
min-width: 100vw;
min-height: 2vh;

  z-index: 100000;

  background-color: #c3c7cb;
  padding: 7px 20px 5px;
  border: none;
  font-size: 12px;
  box-shadow: inset 1px 1px 0px 1px #ffffff, inset 0 0 0 1px #868a8e,
    1px 1px 0 0px #000;

  position:fixed;
  bottom:0;

  // &:disabled {
  //   color: #868a8e;
  // }
  &:focus {
    outline: none;
  }
  //   box-shadow: inset 1px 1px 0px 1px #ffffff,
  //     inset -0.5px -0.5px 0px 1px #868a8e, 1px 1px 0 1px #000;
  //   outline: 1px dotted #000;
  //   outline-offset: -5px;
  // &:active {
  //   padding: 8px 20px 5px;
  //   outline: 1px dotted #000;
  //   outline-offset: -5px;
  //   box-shadow: inset 0 0 0 1px #868a8e, 0 0 0 1px #000;
  // }
`;


const StartBtn = styled.button`
  min-width: 3em;

  background-color: #c3c7cb;
  // padding: 7px 20px 5px;
  border: none;
  font-size: 12px;
  box-shadow: inset 1px 1px 0px 1px #ffffff, inset 0 0 0 1px #868a8e,
    1px 1px 0 0px #000;

  &:disabled {
    color: #868a8e;
  }
  &:focus {
      box-shadow: inset 1px 1px 0px 1px #ffffff,
        inset -0.5px -0.5px 0px 1px #868a8e, 1px 1px 0 1px #000;
      outline: 1px dotted #000;
      outline-offset: -5px;
  }
  &:active {
    // padding: 8px 20px 5px;
    outline: 1px dotted #000;
    outline-offset: -5px;
    box-shadow: inset 0 0 0 1px #868a8e, 0 0 0 1px #000;
  }
`;

const VolumeBtn = styled.button`
  min-width: 4em;

  background-color: #c3c7cb;
  border: none;
  font-size: 12px;

  // &:disabled {
  //   color: #868a8e;
  // }
  // &:focus {
  //     box-shadow: inset 1px 1px 0px 1px #ffffff,
  //       inset -0.5px -0.5px 0px 1px #868a8e, 1px 1px 0 1px #000;
  //     outline: 1px dotted #000;
  //     outline-offset: -5px;
  // }
  outline: 1px dotted #000;
  outline-offset: -5px;
  box-shadow: inset 0 0 0 1px #868a8e, 0 0 0 1px #000;
`;

const Footer = ({clickHandler}) => {
  useEffect(() => {
    setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
  }, []);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  return (
    <FooterWrapper>
        <span className="split-footer">
            <StartBtn onClick={clickHandler}>
                <span id="split-footer-logo">
                <Icon name="logo" width="20"/>
                <StartText>Start</StartText>
                </span>
            </StartBtn>
            <VolumeBtn>
                <span id="split-footer-logo">
                <Icon name="unmute" width="20"/>
                <Time>{time}</Time>
                </span>
            </VolumeBtn>
        </span>
    </FooterWrapper>
  )
}

Footer.displayName = "Footer";

Footer.propTypes = {
    clickHandler: PropTypes.func,
}

export default Footer;