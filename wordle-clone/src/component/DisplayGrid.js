import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const DisplayGrid = () => {
  const generateGrid = () => {
    const gridRows = [];
    let tileArray = [];

    const tileContainerStyle = {
      style: {
        display: "flex",
        width: "min-content",
        height: "63px",
        margin: "0 auto"
      }
    };

    const tileStyle = {
      style: {
        width: "3.75rem",
        border: "2px solid grey",
        margin: "1.5px"
      }
    };

    for (let rows = 0; rows < 6; rows++) {
      for (let tiles = 0; tiles < 5; tiles++) {
        let tile = React.createElement(
          "div",
          { ...tileStyle, key: tiles },
          null
        );
        tileArray.push(tile);
      }

      let container = React.createElement(
        "div",
        { ...tileContainerStyle, key: rows },
        tileArray
      );

      tileArray = [];

      gridRows.push(container);
    }

    return gridRows;
  };
  return <GridContainer>{generateGrid()}</GridContainer>;
};

export default DisplayGrid;
