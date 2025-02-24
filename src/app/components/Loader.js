import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  .quater {
    height: 1.5cm;
    width: 1.5cm;
    background-color: skyblue;
    float: left;
    position: relative;
    bottom: 1.25cm;
  }

  .i {
    border-top-left-radius: 100%;
    animation: spin1 2s ease-in-out infinite;
    transform-origin: 1.5cm 1.5cm;
  }

  .ii {
    border-top-right-radius: 100%;
    animation: spin2 2s ease-in-out infinite;
    transform-origin: 0 1.5cm;
  }

  @keyframes spin1 {
    0% {
      transform: rotateZ(0deg);
    }

    25% {
      transform: rotateZ(0deg);
    }

    50% {
      transform: rotateZ(180deg);
    }

    75% {
      transform: rotateZ(180deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }

  @keyframes spin2 {
    0% {
      transform: rotateZ(0deg);
    }

    25% {
      transform: rotateZ(180deg);
    }

    50% {
      transform: rotateZ(180deg);
    }

    75% {
      transform: rotateZ(360deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }`;

export default function Loader() {
    return (
        <StyledWrapper>
            <div className="loader mt-20 ml-10">
                <div className="quater i" />
                <div className="quater ii" />
            </div>
        </StyledWrapper>
    )
}
