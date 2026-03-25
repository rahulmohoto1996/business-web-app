<!-- KB: https://cssloaders.github.io/ -->
<!-- https://www.w3schools.com/vue/vue_components.php -->
<template>
    <span v-if="size == 'big'" class="loader-big"></span>
    <span v-if="size == 'medium'" class="loader-medium"></span>
    <span v-if="size == 'small'" class="loader-small"></span>
</template>

<style>
.loader-big {
    width: 120px;
    height: 120px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

.loader-medium {
    width: 60px;
    height: 60px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

.loader-small {
    width: 30px;
    height: 30px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

<script>
export default {
    name: "spinner",
    props: {
        // Here will go the props to pass
        // name: String,
        // message: String
        size: String
    },
    data() {
        return {
            //Here will go the data.
        }
    }
};
</script>