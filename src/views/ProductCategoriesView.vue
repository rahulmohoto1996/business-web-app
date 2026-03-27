<template>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div>
        <h2>Product Categories</h2>
    </div>

    <div>
        <button class="btn" :class="{active: isListActive}" @click="listView">
            <i class="fa fa-bars"></i>
            List
        </button>
        <button class="btn" :class="{active: isGridActive}" @click="gridView">
            <i class="fa fa-th-large"></i>
            Grid
        </button>
    </div>
    <br>


    <div class="row">
        <div v-for="category in categories" :key="category.id" class="column" :style="{width: setWidth}">
            <div class="card" @click="showProductsList">
                <h4>{{ category.name }}</h4>
                <!-- <p></p> -->
            </div>
        </div>
        <div class="column" :style="{width: setWidth}">
            <div class="card" @click="addNewCategory">
                <h4>
                    <i class="fa fa-plus"></i>
                    Category
                </h4>
            </div>
        </div>
    </div>
    

</template>

<style>
* {
    box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
    float: left;
    width: 50%;
    padding: 10px;
    background-color:#ddd;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
}

/* Style the buttons */
.btn {
    border: none;
    outline: none;
    padding: 12px 16px;
    background-color: #f1f1f1;
    cursor: pointer;
}

.btn:hover {
    background-color: #ddd;
}

.btn.active {
    background-color: #666;
    color: white;
}
</style>

<script>

import { bus } from '@/js/eventBus';

export default {
    name: "ProductCategoriesView",

    data() {
        return {
            categories: [
                {id: 1, name: "Category 1"},
                // {id: 2, name: "Category 2"},
                // {id: 3, name: "Category 3"},
                // {id: 4, name: "Category 4"},
            ],
            isListActive: true,
            isGridActive: false,
            setWidth: "100%"
        }
    },

    methods: {

        // List View
        listView() {
            this.isListActive = true;
            this.isGridActive = false;
            this.setWidth = "100%";
        },

        // Grid View
        gridView() {
            this.isListActive = false;
            this.isGridActive = true;
            this.setWidth = "50%";
        },

        async addNewCategory() {
            // alert("Add new category");
            debugger;

            await this.$router.push("/addNewProductCategory");

            bus.emit('add-product-category', {
                params: {
                    x: 1
                },
                onSave: (category) => {
                    debugger;
                    this.updateCategory(category);
                }
            });
        },

        updateCategory(category) {
            this.categories.push({
                id: this.categories.length + 1,
                name: category.name
            });
        },

        showProductsList() {
            //this will show prducts list for that category;
            this.$router.push("/showProductsList");
        }

    },

    computed: {

    },

    created() {
    }
}

</script>