export default class Board {
    constructor() {
        this.cells = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }

    /**
     * @param {int} x
     * @param {int} y
     * @param {string} player
     * @returns {boolean}
     */
    doMove(x, y, player) {
        if (this.cells[x][y] !== '') {
            return false;
        }

        this.cells[x][y] = player;
        return true;
    }

    /**
     * @returns {number}
     */
    getScore() {
        let score = 0;
        if (this.playerHasWon('x')) {
            score -= 100;
        }
        if (this.playerHasWon('o')) {
            score += 100;
        }
        return score;
    }

    /**
     * @param {string} player
     * @returns {boolean}
     */
    playerHasWon(player) {
        for (let i = 0; i < 3; i++) {
            if (this.cells[0][i] === player && this.cells[1][i] === player && this.cells[2][i] === player) {
                return true;
            }
        }

        for (let i = 0; i < 3; i++) {
            if (this.cells[i][0] === player && this.cells[i][1] === player && this.cells[i][2] === player) {
                return true;
            }
        }

        if (this.cells[0][0] === player && this.cells[1][1] === player && this.cells[2][2] === player) {
            return true;
        }

        return this.cells[2][0] === player && this.cells[1][1] === player && this.cells[0][2] === player;
    }

    /**
     * @returns {boolean}
     */
    isGameOver() {
        return this.getPossibleMoves().length === 0 || this.playerHasWon('x') || this.playerHasWon('o');
    }

    /**
     * @returns {Board}
     */
    clone() {
        let clone = new Board();

        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                clone.cells[i][j] = this.cells[i][j];
            }
        }

        return clone;
    }

    /**
     * @returns {*[]}
     */
    getPossibleMoves() {
        let moves = [];
        for (let i= 0; i < 3; i++) {
            for (let j= 0; j < 3; j++) {
                if (this.cells[i][j] === '') {
                    moves.push({x: i, y: j});
                }
            }
        }
        return moves;
    }
}
