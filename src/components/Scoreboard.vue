<script setup>
defineProps({
    scoreboard: Object,
    index: Number,
});
</script>

<template>
    <div class="scoreboard card">
        <div class="scoreboard_header">
            <h3 contenteditable="true" @keydown="$emit('name-change', $event)">{{ scoreboard.name }}</h3>
            <span>{{ scoreboard.setPoints }}</span>
        </div>

        <p>{{ scoreboard.points }}</p>

        <div class="scoreboard_buttons">
            <button type="button" @click="$emit('decrease', index)" class="btn_decrease" title="Abaixar pontuação">
                -
            </button>

            <button type="button" @click="$emit('increase', index)" class="btn_increase" title="Aumentar pontuação">
                +
            </button>
        </div>
    </div>
</template>

<style scoped>
.scoreboard {
    display: grid;
    width: 100%;
    max-width: 300px;
    place-items: center;
    aspect-ratio: 1;
    overflow-x: hidden;
}

.scoreboard h3 {
    font-size: 2.2rem;
    font-weight: 600;
    white-space: nowrap;
}

.scoreboard_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.scoreboard p {
    background-color: var(--color-primary-600);
    border-radius: 6px;
    text-align: center;
    font-size: 3.6rem;
    padding: 0.6rem;
    width: 100%;
    cursor: default;
}

.scoreboard_header span {
    background-color: var(--color-primary-600);
    border-radius: 3px;
    font-size: 1.3rem;
    display: grid;
    place-items: center;
    width: 2.25rem;
    aspect-ratio: 1;
    cursor: default;
}

.scoreboard_buttons {
    display: flex;
    width: 100%;
    gap: 0.6rem;
}

.scoreboard_buttons button {
    flex: 1;
    padding: 1rem 2rem;
    color: #eee;
    font-size: 1.8rem;
}

.scoreboard_buttons button.btn_increase {
    background-color: var(--color-success);
}

.scoreboard_buttons button.btn_decrease {
    background-color: var(--color-danger);
}

@media (max-width: 768px) {
    .scoreboard {
        gap: 1rem;
    }

    .scoreboard p {
        font-size: 2.8rem;
    }

    .scoreboard button {
        padding: 0.6rem 1rem;
    }
}
</style>
