<script setup>
const props = defineProps({
    index: Number,
});

const emit = defineEmits(['increase', 'decrease']);

const increasePoints = () => {
    emit('increase', props.index);
};

const decreasePoints = () => {
    emit('decrease', props.index);
};
</script>

<template>
    <div class="set_controls">
        <button type="button" @click="decreasePoints" class="btn_decrease" title="Abaixar pontuação">
            -
        </button>

        <button type="button" @click="increasePoints" class="btn_increase" title="Aumentar pontuação">
            +
        </button>
    </div>
</template>

<style scoped></style>