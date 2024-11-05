<script setup>
import { ref, reactive, onMounted } from 'vue';
import MatchSetup from './components/MatchSetup.vue';
import Scoreboard from './components/Scoreboard.vue';

const currentPage = ref(0);
const setQuantity = ref(3);
const currentSet = ref(1);
const matchEnded = ref(false);
const setMessage = ref('');
const scoreboards = reactive([
    { name: 'Time 1', points: 0, setPoints: 0 },
    { name: 'Time 2', points: 0, setPoints: 0 }
]);

const MPAudio = new Audio("src/assets/audio/match_point.wav");
const TBAudio = new Audio("src/assets/audio/tie_break.wav");

const changeSetQuantity = (quantity) => {
    setQuantity.value = quantity;
};

const nextPage = () => {
    currentPage.value++;
};

const handleNameChange = (event) => {
    const index = scoreboards.findIndex(s => s.name === event.target.textContent);
    if (index !== -1) {
        scoreboards[index].name = event.target.textContent;
    }
};

const increasePoints = (index) => {
    if (matchEnded.value) return;

    scoreboards[index].points++;
    if (scoreboards[index].points === 24 || (setQuantity.value === 5 && currentSet.value === 5 && scoreboards[index].points === 14)) {
        MPAudio.play();
    }

    if (scoreboards[index].points >= 25) {
        endSet(index);
    }
};

const decreasePoints = (index) => {
    if (scoreboards[index].points > 0) {
        scoreboards[index].points--;
    }
};

const endSet = (winningIndex) => {
    currentSet.value++;
    scoreboards[winningIndex].setPoints++;

    if (scoreboards[0].setPoints >= 3 || scoreboards[1].setPoints >= 3 || currentSet.value > setQuantity.value) {
        matchEnded.value = true;
        setMessage.value = `${scoreboards[winningIndex].name} venceu!`;
        currentSet.value--;
    } else {
        if (setQuantity.value === 5 && currentSet.value === 5) {
            TBAudio.play();
            setMessage.value = "Tie Break!";
        }
    }

    resetPoints();
};

const resetPoints = () => {
    scoreboards.forEach(scoreboard => {
        scoreboard.points = 0;
    });
};

const resetScoreboards = () => {
    currentPage.value = 0;
    setQuantity.value = 3;
    currentSet.value = 1;
    matchEnded.value = false;
    setMessage.value = '';
    scoreboards.splice(0, scoreboards.length,
        { name: 'Time 1', points: 0, setPoints: 0 },
        { name: 'Time 2', points: 0, setPoints: 0 }
    );
};

onMounted(() => {
    document.body.classList.add("loaded");
});
</script>

<template>
    <div class="container">
        <main>
            <section v-if="currentPage == 0">
                <MatchSetup @changeSetQuantity="changeSetQuantity" @nextPage="nextPage" />
            </section>

            <section v-if="currentPage == 1">
                <h3 class="set-display">{{ currentSet }}° de {{ setQuantity }} sets</h3>
                <h4 class="set-message">{{ setMessage }}</h4>

                <div class="scoreboards_container">
                    <Scoreboard v-for="(scoreboard, index) in scoreboards" :key="index" :scoreboard="scoreboard"
                        :index="index" @name-change="handleNameChange" @increase="increasePoints"
                        @decrease="decreasePoints" />
                </div>

                <button type="button" @click="resetScoreboards" class="btn-reset" title="Voltar para o início">
                    Voltar para o início
                </button>
            </section>
        </main>
    </div>
</template>

<style scoped>
.scoreboards_container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
    width: inherit;
    gap: 1rem;
}

.btn-reset {
    background-color: var(--color-primary-100);
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    color: #eee;
    border-radius: 3px;
    padding: 0.4rem 1.6rem;
    margin-top: 3rem;
}

.set-message {
    text-transform: uppercase;
    margin-top: 1rem;
}

.set-display {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    border: 2px solid var(--color-primary-100);
    background-color: var(--color-primary-600);
    border-radius: 3px;
    padding: 0.3rem 1.6rem;
    font-size: 2rem;
    font-weight: 500;
}

.container {
    width: calc(100% - 1rem);
    max-width: 1080px;
    margin: 0 auto;
}

main {
    display: grid;
    place-items: center;
    width: 100%;
    position: relative;
    height: 100vh;
    overflow-y: hidden;
}

section {
    display: grid;
    place-items: center;
    width: 100%;
}

section:last-of-type {
    padding: 3rem 0;
}
</style>
