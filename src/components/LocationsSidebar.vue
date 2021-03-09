<template>
    <v-card class="Sidebar">
        <h3>Choose location</h3>
        <ul v-if="savedLocations.length > 0" class="Sidebar__locations">
            <li v-for:="(item, index) in savedLocations">
                <LocationItem 
                    v-bind:item="item"
                    v-on:setLocation="() => setLocation(item)"
                    v-on:removeLocation="() => removeLocation(index)"
                />
            </li>
        </ul>
        <h3 v-else class="Placeholder">No locations yet...</h3>
        <form class="search-form" v-on:submit.prevent="onSearch">
            <label>Enter location here:</label>
            <span class="search-form__search">
                <input class="search-form__input" v-model="searchQuery" placeholder="example: New York"/>
                <v-btn-search class="search-form__btn"/>
            </span>
        </form>
    </v-card>
    <v-modal v-bind:showModal="isModalOpen" v-on:close="closeModal">
        <v-card class="search-modal" v-if="locationList">
            <h2>Choose location:</h2>
            <ul class="search-results">
                <li class="search-results__result" v-for:="item in locationList" v-on:click="() => pickLocation(item)">
                    {{ item.formatted }}
                </li>
            </ul>
            <button form="none" class="search-modal__btn" v-on:click="closeModal"> Cancel</button>
        </v-card>
        <div v-else class="card spinner-container">
            <v-spinner />
        </div>
    </v-modal>
</template>
<script>
import { getLocationList } from '../lib/api/GeocodingAPI';
import storage from '../lib/api/localStorage';
import LocationItem from './LocationItem';
export default {
    name: 'LocationSidebar',
    emits: ['setLocation'],
    components: {
        LocationItem,
    },
    data() {
        return {
            locationList: null,
            savedLocations: [],
            searchQuery: '',
            isModalOpen: false
        }
    },
    mounted() {
        const savedLocation= storage.getLocations()
        if (savedLocation) {
            this.savedLocations = savedLocation;
        }
    },
    methods: {
        closeModal() {
            this.locationList = null;
            this.isModalOpen = false;
            document.body.style.overflow = 'auto';
        },
        onSearch() {
            this.locationList = null;
            this.isModalOpen = true;
            document.body.style.overflow = 'hidden';
            getLocationList(this.searchQuery, { language: 'en' })
                .then(data => {
                    this.locationList = data;
                    this.searchQuery = '';
                })
        },
        pickLocation(item) {
            this.setLocation(item);
            this.locationList = null;
            this.isModalOpen = false;
            document.body.style.overflow = 'auto';
            this.savedLocations.push(item);
            storage.saveLocations(this.savedLocations);
        },
        setLocation(item) {
            this.$emit('setLocation', item)
        },
        removeLocation(index) {
            this.savedLocations.splice(index, 1);
            storage.saveLocations(this.savedLocations);
        }
    }
}
</script>

<style scoped>
    .Sidebar{
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    .Sidebar__locations{
        overflow-y: auto;
        max-height: 150px;
    }
    .Sidebar__locations li{
        width: 100%;
    }
    ul{
        padding: 0;
        list-style: none
    }
    .Placeholder{
        opacity: 0.5;
    }
    .empty-card{
        width: 300px;
        height: 300px;
    }
    .spinner-container{
        position: relative;
    }
    .search-form__search{
        margin-top: 0.5rem;
        display: flex;
        padding: 0.5rem;
        border-radius: 20px;
        border: 1px solid #ccc;
    }
    .search-form__input{
        background: transparent;
        border: none;
        width: 80%;
    }
    .search-form__btn{
        margin-right: 0.5rem;
        width: 20%;
    }
    .search-modal__btn{
        padding: 1rem;
        border: none;
        background: #666;
        color: white;
        border-radius: 20px;
        cursor: pointer;
    }
    .search-modal__btn{
        background: #777;
    }
    .search-results{
        max-height: 40vh;
        overflow: auto;
    }
    .search-results__result{
        padding: 1rem;
        text-align: left;
        cursor: pointer;
    }
    .search-results__result:hover{
        background: #f1faee;
    }
    @media (max-width: 700px) {
        .Sidebar{
            width: 90%;
            margin-bottom: 3rem;
        }
        .search-modal{ 
            height: 70vh;
            width: 90vw;
        }
    }
</style>