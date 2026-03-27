<template>
    <div class="flex-container-parent">
        <div class="dialog-box" :style="{ width: pageWidth, height: pageHeight }">
            <div class="header">
                <div class="title">
                    {{ title }}
                </div>
                <div class="close-btn">
                    <button @click="close">X</button>
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.dialog-box {
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dialog-box .header {
    display: flex;
    justify-content: flex-end;
    padding: 5px 0px;
    background-color: #ccc;

    position: relative;
}

.title {
    flex-grow: 1;
    font-size: 18px;
    font-weight: bold;
}

.flex-container-parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

.close-btn {
   /* padding-right: 5px; */
   position: absolute;
   right: 5px;
}
</style>

<script>
export default {
    name: "dialogBox",
    props: {
        pageWidth: {
            type: String,
            default: "400px"
        },
        pageHeight: {
            type: String,
            default: "300px"
        },
        title: {
            type: String,
            default: "Dialog Box"
        }
    },
    data() {
        return {
            //Here will go the data.
        }
    },

    methods: {
        close() {
            this.$emit("close");
        }
    }
};
</script>