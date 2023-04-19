<template>
    <div class="mx-auto my-5 max-w-md rounded overflow-hidden shadow-md text-xs">

        <div class="flex bg-gray-200 px-2 py-2">
            <div class="w-5/12 text-gray-700 text-left text-red-500 font-bold">Player Highscores</div>
        </div>

        <div class="flex px-2 py-2 items-center" v-for="highScore in highScores">
            <div class="w-10/12 flex">
                <div class="flex flex-col">
                    <p class="text-sm font-bold">{{ highScore.name }}</p>
                </div>
            </div>
            <p class="w-2/12 text-lg sm:text-xl font-bold text-right">{{ highScore.score }}</p>
        </div>

    </div>
</template>

<script>
import Board from "../board";

export default {
    data() {
        return {
            highScores: [],
        }
    },

     created() {
        let self = this;
        axios.get('/api/players').then(function (response) {
            self.highScores = response.data.players;
        }).catch(function (error) {
            console.log(error);
        });
    },
}
</script>
