<script setup>
import { ref } from 'vue';

const emit = defineEmits(['changeSetQuantity', 'nextPage']);

const auxiliarQuantity = ref(0);

const changeSetQuantity = (quantity) => {
    emit('changeSetQuantity', quantity);
    auxiliarQuantity.value = quantity;
};

const nextPage = () => {
    if (auxiliarQuantity.value === 0) return;
    emit('nextPage');
};
</script>

<template>
    <form class="card" @submit.prevent>
        <img src="/src/assets/images/logo.webp" alt="Logo do website" class="logo" width="64" height="64">

        <div class="hints_content">
            <p>Dicas:</p>
            <ul>
                <li>Clique no nome do time para alterá-lo.</li>
                <li>Utilize o modo paisagem no celular.</li>
            </ul>
        </div>

        <div class="form_group">
            <p>Quantidade de sets:</p>

            <div class="set_quantity_choices">
                <button type="button" @click="changeSetQuantity(3)" :class="{ 'active': auxiliarQuantity == 3 }"
                    title="Selecionar quantidade de sets">
                    3
                </button>

                <button type="button" @click="changeSetQuantity(5)" :class="{ 'active': auxiliarQuantity == 5 }"
                    title="Selecionar quantidade de sets">
                    5
                </button>
            </div>
        </div>

        <button type="button" @click="nextPage" class="btn-scoreboard" title="Acessar placar">Acessar placar</button>
    </form>
</template>

<style scoped>
.logo {
    border-radius: 3px;
    margin: 0 auto;
    margin-bottom: 1rem;
}

form {
    display: grid;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    color: #171c1b;
}

form .form_group {
    display: grid;
    gap: 0.3rem;
}

.hints_content {
    font-size: 0.8rem;
    border-top: 1px solid var(--color-primary-100);
    border-bottom: 1px solid var(--color-primary-100);
    padding: 1rem 0;
    margin-top: -1rem;
}

.hints_content ul {
    margin-top: 0.25rem;
    list-style-type: none;
}

.hints_content ul li::before {
    content: "• ";
}

.set_quantity_choices {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.set_quantity_choices button {
    flex: 1;
    display: grid;
    padding: 1rem;
    place-items: center;
    background: var(--color-primary-600);
    color: #000;
    border-radius: 3px;
    border: 1px solid transparent;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

.set_quantity_choices button.active {
    border-color: var(--color-primary-100);
    filter: brightness(85%);
}

.btn-scoreboard {
    background-color: var(--color-primary-100);
    color: #eee;
}
</style>