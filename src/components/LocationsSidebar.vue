<template>
    <div className="Sidebar">
        <h3>Choose location</h3>
        <ul v-if="savedLocations.length > 0" className="Sidebar__locations">
            <li v-for:="(item, index) in savedLocations">
                <LocationItem 
                    v-bind:item="item"
                    v-on:setLocation="() => setLocation(item)"
                    v-on:removeLocation="() => removeLocation(index)"
                />
            </li>
        </ul>
        <h3 v-else className="Placeholder">No locations yet...</h3>
        <form v-on:submit.prevent="onSearch">
            <label>Enter location here:</label>
            <input v-model="searchQuery" placeholder="example: New York"/>
            <button>search</button>
        </form>
    </div>
    <Modal v-bind:showModal="locationList!==null" v-on:close="locationList = null">
        <v-card>
        <h2>Choose location:</h2>
        <ul>
            <li v-for:="item in locationList" v-on:click="() => pickLocation(item)">
                {{ item.formatted }}
            </li>
        </ul>
        </v-card>
    </Modal>
</template>
<script>
import { getLocationList } from '../lib/api/GeocodingAPI';
import Modal from './common/Modal';
import LocationItem from './LocationItem';
export default {
    name: 'LocationSidebar',
    emits: ['setLocation'],
    components: {
        Modal,
        LocationItem
    },
    data() {
        return {
            locationList: null,
            savedLocations: [],
            searchQuery: ''
        }
    },
    methods: {
        onSearch() {
            getLocationList(this.searchQuery, 'en')
                .then(data => {
                    this.locationList = data;
                    this.searchQuery = '';
                })
        },
        pickLocation(item) {
            this.setLocation(item);
            this.locationList = null;
            this.savedLocations.push(item);
        },
        setLocation(item) {
            this.$emit('setLocation', item)
        },
        removeLocation(index) {
            this.savedLocations.splice(index, 1);
        }
    }
}
</script>

<style scoped>
    .Sidebar{
        width: 30%;
        display: flex;
        flex-direction: column;
        
    }
    ul{
        padding: 0;
        list-style: none
    }
    .Placeholder{
        opacity: 0.5;
    }
</style>