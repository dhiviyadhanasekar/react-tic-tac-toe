import React from "react";
import PropTypes from "prop-types";
import "./styles/gameGrid.css";

const CellValues = {
  BLANK: " ",
  X: "X",
  O: "O"
};

const Cell = (props) => {
  const { value, onChange, row, col } = props;
  const isDisabled = value === CellValues.X || value === CellValues.O;

  const handleOnClick = (e) => {
    onChange(row, col);
  };

  return (
    <button className="cell" onClick={handleOnClick} disabled={isDisabled}>
      {value}
    </button>
  );
};
Cell.propTypes = {
  value: PropTypes.oneOf(Object.values(CellValues)).isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};
const GRID_LENGTH = 3;

class GameGrid extends React.Component {
  state = {
    matrix: [
      [CellValues.BLANK, CellValues.BLANK, CellValues.BLANK],
      [CellValues.BLANK, CellValues.BLANK, CellValues.BLANK],
      [CellValues.BLANK, CellValues.BLANK, CellValues.BLANK]
    ],
    currentUser: CellValues.X,
    gameWon: false
  };

  isRowSame = (row, matrix) => {
    for (let i = 1; i < GRID_LENGTH; i++) {
      if (matrix[row][i] !== matrix[row][i - 1]) return false;
    }
    return true;
  };

  isColSame = (col, matrix) => {
    for (let i = 1; i < GRID_LENGTH; i++) {
      if (matrix[i][col] !== matrix[i - 1][col]) return false;
    }
    return true;
  };

  isDiagonalSame = (row, col, matrix) => {
    if (row !== col) return false;
    for (let i = 1; i < GRID_LENGTH; i++) {
      if (matrix[i][i] !== matrix[i - 1][i - 1]) return false;
    }
    return true;
  };

  checkWinningMove = (row, col, matrix) => {
    if (this.isRowSame(row, matrix)) return true;
    if (this.isColSame(col, matrix)) return true;
    if (this.isDiagonalSame(row, col, matrix)) return true;

    return false;
  };

  onCellChange = (row, col) => {
    const { matrix, currentUser } = this.state;
    const matrixToUpdate = matrix.slice();
    matrixToUpdate[row] = [...matrix[row]];
    matrixToUpdate[row][col] = currentUser;
    const hasUserWon = this.checkWinningMove(row, col, matrixToUpdate);
    this.setState({
      matrix: matrixToUpdate,
      currentUser: currentUser === CellValues.X ? CellValues.O : CellValues.X,
      gameWon: hasUserWon
    });
  };

  render() {
    return (
      <div>
        {this.state.gameWon && <div>'Yay this game is over!'</div>}
        {this.state.matrix.map((row, rowIndex) => {
          return (
            <div className="row" key={`${rowIndex}`}>
              {row.map((value, colIndex) => {
                return (
                  <Cell
                    key={`${rowIndex}-${colIndex}`}
                    onChange={this.onCellChange}
                    value={value}
                    col={colIndex}
                    row={rowIndex}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
GameGrid.propTypes = {};

export default GameGrid;
