<template>
    <main class="min-h-screen pt-8 text-center dark:bg-gray-800 dark:text-white">
        <h1 class="mb-8 text-4xl font-bold uppercase"><span class="text-pink-500">Tic</span> <span class="text-blue-500">Tac</span> <span class="text-pink-500">Toe</span></h1>

        <h3 class="mb-4 text-xl text-blue-500" v-if="playerTurn && !gameOver">{{ playerName }}, it's your turn 👀</h3>
        <h3 class="mb-4 text-xl text-blue-500" v-else-if="gameOver">{{ gameOverText }}</h3>
        <h3 class="mb-4 text-xl text-pink-500" v-else-if="errorMessage">{{ errorMessage }}</h3>

        <div class="mb-8 flex flex-col items-center">
            <div v-for="(n, y) in 3" class="flex">
                <div v-for="(n, x) in 3">
                    <cell @click="performPlayerMove(x, y)" :value="board.cells[x][y]"></cell>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center justify-center mb-8">
            <input class="shadow w-1/4 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="playerName" type="text" v-model="playerName" placeholder="What is your name?" />
        </div>

        <div class="items-center">
            <button @click="startGame" class="duration-400 rounded bg-green-500 px-4 py-2 font-bold uppercase hover:bg-green-600 mr-1">
                Start
            </button>
            <button @click="resetBoard" class="duration-400 rounded bg-red-500 px-4 py-2 font-bold uppercase hover:bg-red-600">
                Reset
            </button>
        </div>

        <highscores></highscores>
    </main>
</template>

<script>
import Board from "../board";
import Cell from "./Cell.vue";
import Highscores from "./Highscores.vue";

export default {
    components: { Highscores, Cell },

    data() {
        return {
            gameOver: false,
            gameOverText: '',
            board: new Board(),
            playerTurn: false,
            player: 'x',
            playerName: null,
            errorMessage: null,
            highScores: [],
        }
    },

    methods: {
        startGame() {
            this.resetBoard();

            if (this.playerName === null) {
                this.errorMessage = 'You will need to give us a name first';
                return;
            }

            if (this.player === 'o') {
                this.performAiMove();
            }

            this.playerTurn = true;
        },

        /**
         * @param {int} x
         * @param {int} y
         */
        performPlayerMove(x, y) {
            if (this.gameOver || this.playerTurn === false) {
                return;
            }

            if (! this.board.doMove(x, y, this.player)) {
                return;
            }

            this.$forceUpdate();

            if (this.board.isGameOver()) {
                this.gameOver = true;
                this.gameOverText = this.board.playerHasWon(this.player) ? 'You win!' : 'Draw';

                axios.post('/api/players', {
                    playerName: this.playerName,
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });

                return;
            }

            this.performAiMove();
        },

        performAiMove() {
            let aiPlayer = this.player === 'x' ? 'o' : 'x';
            let aiMove = this.minimax(this.board.clone(), aiPlayer);
            this.board.doMove(aiMove.move.x, aiMove.move.y, aiPlayer);

            if (this.board.isGameOver()) {
                this.gameOver = true;
                this.gameOverText = this.board.playerHasWon(aiPlayer) ? 'You lose!' : 'Draw';
            }

            this.$forceUpdate();
        },

        /**
         *
         * @param {Board} board
         * @param {string} player
         * @param {int} depth
         * @returns {{score: number, move: null}|{score: (number), move: null}}
         */
        minimax(board, player, depth = 1) {
            if (board.isGameOver()) {
                return {
                    score: board.getScore() + depth,
                    move: null
                }
            }

            let bestScore = player === 'o' ? -10000 : 10000;
            let bestMove = null;

            let moves = board.getPossibleMoves();
            for (let i = 0; i < moves.length; i++) {
                let move = moves[i];
                let newBoard = board.clone();
                newBoard.doMove(move.x, move.y, player);

                const score = this.minimax(newBoard, player === 'x' ? 'o' : 'x', depth + 1).score;
                if ((player === 'o' && score > bestScore) || (player === 'x' && score < bestScore)) {
                    bestScore = score;
                    bestMove = move;
                }
            }

            return {
                score: bestScore,
                move: bestMove
            }
        },

        resetBoard() {
            this.board = new Board();
            this.gameOver = false;
            this.playerTurn = false;
            this.errorMessage = null;
        }
    }
}
</script>
