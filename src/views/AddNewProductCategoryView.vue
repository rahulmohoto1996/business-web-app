<template>

    <DialogBox @close="closeDialog" title="Add new product category" pageWidth="400px" pageHeight="200px">

        <div class="flex-container-parent">
            <div class="flex-container">
                <div style="margin: 20px;">
                    <div class="fields">
                        <div>Name</div>
                        <div>
                            <input v-model="newCategory.name" placeholder="Enter category name">
                        </div>
                    </div>
                </div>
                <div class="fields">
                    <button @click="saveCategory">Save</button>
                    <button @click="cancel">Cancel</button>
                </div>
            </div>
        </div>

    </DialogBox>

</template>

<style scoped>
.flex-container-parent {
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: aqua; */
}

.flex-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: aliceblue; */
    /* width: 500px; */
    /* height: 200px; */
    justify-content: space-around;
}

.fields {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: 20px;
}
</style>

<script>
import DialogBox from '@/components/dialogBox.vue';
import { bus } from '@/js/eventBus';

export default {
    name: "AddNewProductCategoryView",
    components: {
        DialogBox
    },
    data() {
        return {
            newCategory: {
                name: null
            },
            model: null
        }
    },
    methods: {
        closeDialog() {
            this.$router.back();
        },

        saveCategory() {
            debugger;

            if(!this.newCategory.name) {
                alert("Please enter category name");
                return;
            }

            this.model.onSave(this.newCategory);

            this.closeDialog();
        },

        cancel() {
            this.closeDialog();
        }
    },

    beforeUnmount() {
        // bus.off('add-product-category'); // always clean up!
    },

    mounted() {
    },

    created() {
        bus.on('add-product-category', (data) => {
            this.model = data;
        });
    }
}
</script>