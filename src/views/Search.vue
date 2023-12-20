<script setup>
import { reactive, ref, onMounted } from 'vue';
import IncidentTable from '../components/IncidentTable.vue';

let base_url = ref('http://localhost:8001');
let location = ref('');
let markers = ref([]);
let current_location = ref('');

// data models
let crimes = ref([]);
let codes = ref([]);
let neighborhoods = ref([]);
let visibleCrimes = ref([]);
let codeCategories = reactive([
    {name:'Murder', value:'100-199'},
    {name:'Rape', value:'200-299'},
    {name:'Theft', value:'300-399,500-799'},
    {name:'Assault', value:'400-499,800-899'},
    {name:'Arson', value:'900-999'},
    {name:'Other', value:'1000-x'}
]);
let startDate = ref();
let endDate = ref();
let limit = ref();
let incidentModel = ref('');
let neighborhoodModel = ref('');
let vModels = {
    incidentModel:  incidentModel,
    neighborhoodModel: neighborhoodModel
};
let tagHistory=[];

// filter vars
let id = 0;
let advancedSearch = ref(false); //set back to false after testing
const tags = ref([]);

function setAdvancedSearch(bool){
    advancedSearch.value = bool;
}

let map = reactive(
    {
        leaflet: null,
        center: {
            lat: 44.955139,
            lng: -93.102222,
            address: ''
        },
        zoom: 12,
        bounds: {
            nw: {lat: 45.008206, lng: -93.217977},
            se: {lat: 44.883658, lng: -92.993787}
        },
        neighborhood_markers: [
            {location: [44.942068, -93.020521], number: 1},
            {location: [44.977413, -93.025156], number: 2},
            {location: [44.931244, -93.079578], number: 3},
            {location: [44.956192, -93.060189], number: 4},
            {location: [44.978883, -93.068163], number: 5},
            {location: [44.975766, -93.113887], number: 6},
            {location: [44.959639, -93.121271], number: 7},
            {location: [44.947700, -93.128505], number: 8},
            {location: [44.930276, -93.119911], number: 9},
            {location: [44.982752, -93.147910], number: 10},
            {location: [44.963631, -93.167548], number: 11},
            {location: [44.973971, -93.197965], number: 12},
            {location: [44.949043, -93.178261], number: 13},
            {location: [44.934848, -93.176736], number: 14},
            {location: [44.913106, -93.170779], number: 15},
            {location: [44.937705, -93.136997], number: 16},
            {location: [44.949203, -93.093739], number: 17}
        ]
    }
);

// Vue callback for once <template> HTML has been added to web page
onMounted(() => {
    // Create Leaflet map (set bounds and valied zoom levels)
    map.leaflet = L.map('leafletmap').setView([map.center.lat, map.center.lng], map.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 11,
        maxZoom: 18
    }).addTo(map.leaflet);
    map.leaflet.setMaxBounds([[44.883658, -93.217977], [45.008206, -92.993787]]);

    // Get boundaries for St. Paul neighborhoods
    let district_boundary = new L.geoJson();
    district_boundary.addTo(map.leaflet);
    fetch('data/StPaulDistrictCouncil.geojson')
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        result.features.forEach((value) => {
            district_boundary.addData(value);
        });
    })
    .catch((error) => {
        console.log('Error:', error);
    });

    // Draw markers once data is fetched
    initializeCrimes()
    .then(() => {
        drawMarkers();
    })
    .catch(error => {
            console.log('Error:', error);
    });
    
    map.leaflet.on('moveend', handleMapMove);
    map.leaflet.on('zoomend', handleMapZoom);
});

// Fetches data from crime API and populates respective data models
async function initializeCrimes() {
    return Promise.all([
        fetchJson(base_url.value + "/incidents"),
        fetchJson(base_url.value + "/codes"),
        fetchJson(base_url.value + "/neighborhoods")
    ]).then(data => {
        crimes.value = data[0];
        codes.value = data[1];
        neighborhoods.value = data[2];
        updateVisibleCrimes();
    });
}

// Fetches filter crime data based on user parameters
async function updateCrimes(params) {
    
    // Compute all codes
    Promise.all(getAllCodes(params))
    .then(data => {
        let code_params = parseCodes(data);
        let neighborhood_params = parseNeighborhoods(params);
        params = buildParamString(params, code_params, neighborhood_params);
        return fetchJson(base_url.value + "/incidents" + params);
    })
    .then(updated_data => {
        crimes.value = updated_data;
        updateVisibleCrimes();
        drawMarkers();
    })
    .catch(error => {
        console.log('Error:', error);
    })
}

function getAllCodes(params) {
    let code_data = [];
    params.forEach((param) => {
        if (param.type === 'code_range') {
            code_data.push(
                fetchJson(base_url.value + '/codes?code_range='+ param.value)
            );
        }
    });
    return code_data;
}

function parseCodes(data) {
    let code_params = ''
    data.forEach((code_list) => {
        code_list.forEach((code_item) => {
            code_params += code_item.code + ","
        });
    });
    code_params = code_params !== '' ? code_params.slice(0, -1) : '';
    return code_params
}

function parseNeighborhoods(params) {
    let neighborhood_params = ''
    params.forEach((param) => {
        if (param.type == 'neighborhood') {
            neighborhood_params += param.value + ","
        }
    });
    neighborhood_params = neighborhood_params !== '' ? neighborhood_params.slice(0, -1) : '';
    return neighborhood_params;
}

function buildParamString(params, code_params, neighborhood_params) {
    let param_string = '?';
    params.forEach((param) => {
        if (param.type === 'limit' && param.value !== '') {
            param_string += 'limit=' + param.value + '&'; 
        } else if (param.type === 'start_date') {
            param_string += 'start_date=' + param.value + '&';
        } else if (param.type === 'end_date') {
            param_string += 'end_date=' + param.value + '&';
        }
    });
    if (code_params !== '') {
        param_string += 'code=' + code_params + '&';
    }
    if (neighborhood_params !== '') {
        param_string += 'neighborhood=' + neighborhood_params + '&';
    }
    param_string = param_string !== '' ? param_string.slice(0, -1) : '';
    return param_string;
}

async function fetchJson(url) {
    return fetch(url).then(response => response.json());
}

function drawMarkers() {
    // remove markers currently on map
    if (markers.value.length > 0) {
        markers.value.forEach((marker) => {
            map.leaflet.removeLayer(marker);
        })
        markers.value = [];
    }
    
    map.neighborhood_markers.forEach((marker) => {
        let marker_name = getNeighborhoodNameById(marker.number, neighborhoods.value);
        let marker_crimes = calculateCrimes(marker_name, crimes.value, neighborhoods.value);
        
        // only add markers that have crimes
        if (marker_crimes > 0) {
            let marker_layer = L.marker(marker.location).bindPopup(
                `${marker_name}` +
                ': ' +
                `${marker_crimes}`
            ).on('click', ()=>{
                console.log("Pan in!");
                // location.value = marker_name+" Saint Paul, MN";
                if (document.getElementById('dialog-loc') !== null) {
                    document.getElementById('dialog-loc').value = marker.location;
                    closeDialog();
                }
            });
            markers.value.push(marker_layer);
            map.leaflet.addLayer(marker_layer);
        }
        
    });
}

function getNeighborhoodNameById(id, neighborhoods) {
    // finds json object for id passed
    const neighborhood = neighborhoods.find(i => i.id === id);
    return neighborhood ? neighborhood.name : null;
}

function calculateCrimes(name, crimes, neighborhoods) {
    let crime_count = 0
    crimes.forEach((crime) => {
        if (getNeighborhoodNameById(crime.neighborhood_number, neighborhoods) === name) {
            crime_count++;
        }
    })
    return crime_count; 
}

// Function called when user presses 'OK' on dialog box
function closeDialog() {
    let loc_input = document.getElementById('dialog-loc');

    if(loc_input != null && loc_input.value !== ''){
        locationZoom(loc_input.value);
    }else{
        let collectiveInfo = [];
        for(let i=0; i<tags.value.length; i++){
            // console.log(tags.value[i].historyId.split('id=')[1]);
            let info = tags.value[i];
            collectiveInfo.push({type: info.type, value: info.historyId.split('id=')[1]});
        }
        let start = (startDate.value != null && startDate.value != '');
        let end = (endDate.value != null && endDate.value != '');
        let startValidDate = !(new Date(startDate.value) == 'Invalid Date');
        let endValidDate = !(new Date(endDate.value) == 'Invalid Date');
        let startBeforeEnd = new Date(startDate.value) < new Date(endDate.value);
        if(start && end){
            if(startValidDate && endValidDate && startBeforeEnd){
                collectiveInfo.push({type: 'start_date', value: startDate.value});
                collectiveInfo.push({type: 'end_date', value: endDate.value});
            }
        }else if(start && startValidDate){
            collectiveInfo.push({type: 'start_date', value: startDate.value});
        }else if(end && endValidDate){
            collectiveInfo.push({type: 'end_date', value: endDate.value});
        }
        
        if(limit.value != null){
            collectiveInfo.push({type:'limit', value: limit.value});
        }
        console.log(collectiveInfo);
        updateCrimes(collectiveInfo);
    }
}

//in search bar try "Frogtown, MN"
function locationZoom(loc){
    let url = 'https://nominatim.openstreetmap.org/search?q='+loc+'&format=json&&limit=1';
    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        if(data.length > 0){
            let lat = data[0].lat;
            let lon = data[0].lon;

            //see if it is outside of the map
            const bounds = map.leaflet.getBounds();

            // Check if the marker is within the map bounds
            const markerLatLng = L.latLng([lat, lon]);
            console.log("Is it there?: "+bounds.contains(markerLatLng));

            if (bounds.contains(markerLatLng)){
                map.leaflet.setView([lat, lon], 14);
            }else{
                alert("That location is out of bounds. Try Again.")
            }

        }else{
            //console.log("Not found");
            alert("Location not found. Try Again.")
        }
        console.log(data);
    })
    .catch((error)=>{
        console.log('Error:', error);
    });
}

function addTag(filter){
    if(filter.value == ''){
        return; 
    }
    let type = filter.value.split(':')[0];
    let id = filter.value.split(':')[1];
    let text = filter.value.split(':')[2];
    if(!within(id, tagHistory)){
        tagHistory.push(id);
        tags.value.push({type: type, text: text, historyId: id});
    }
}

function removeTag(tag, id){
    tags.value = tags.value.filter((t) => t !== tag);
    tagHistory = tagHistory.filter((i) => i !== id);
}

function within(target, array){
    for(let i=0; i<array.length; i++){
        if(target == array[i]){
            return true;
        }
    }
    return false;
}

async function handleMapMove() {
  map.bounds.nw = map.leaflet.getBounds().getNorthWest();
  map.bounds.se = map.leaflet.getBounds().getSouthEast();
  map.center = map.leaflet.getCenter();
  console.log(map.center);
  location.value = `${map.center.lat}, ${map.center.lng}`
  updateVisibleCrimes();
};

async function handleMapZoom() {
  map.bounds.nw = map.leaflet.getBounds().getNorthWest();
  map.bounds.se = map.leaflet.getBounds().getSouthEast();
  map.center = map.leaflet.getCenter();
  console.log(map.center);
  location.value = `${map.center.lat}, ${map.center.lng}`
  updateVisibleCrimes();
};

async function updateVisibleCrimes() {
    const bounds = map.leaflet.getBounds();
    //const nw = bounds.getNorthWest();
    //const se = bounds.getSouthEast();
    console.log("initial length: "+crimes);

    const visible = crimes.value.filter(crime => {
        const neighborhoodId = crime.neighborhood_number;

        // Find the corresponding marker for the neighborhood
        const neighborhoodMarker = map.neighborhood_markers.find(marker => marker.number === neighborhoodId);

        // Check if the marker is within the map bounds
        if (neighborhoodMarker) {
            const markerLatLng = L.latLng(neighborhoodMarker.location);
            return bounds.contains(markerLatLng);
        }
        return false;
    });

    console.log("visibleCrimes count: ", visible.length);
    visibleCrimes.value = visible;
}


</script>

<template>
    <!-- <dialog id="rest-dialog" open>
        <h1 class="dialog-header">St. Paul Crime REST API</h1>
        <label class="dialog-label">Location: </label>
        <input id="dialog-loc" class="dialog-input" v-model="location" placeholder="Enter a location" />
        <p class="dialog-error" v-if="dialog_err">Error: must enter valid URL</p>
        <br/>
        <button class="button" type="button" @click="closeDialog">GO</button>
    </dialog> -->
    
    <div class="grid-container">
        
        <div class="grid-x">
            <!-- might not need hardcoded height when all filters are added-->
            <div class="cell large-5 grid-x" style="border: 4px solid black;">

                <div class="cell grid-x">
                    <h1 class="cell dialog-header" style="text-align: center;">St. Paul Crime REST API</h1>
                    <div class="cell grid-x grid-padding-x">

                        <div class="cell grid-x" v-if="!advancedSearch">
                            <label class="cell dialog-label" style="font-weight: bold;">Location: </label>
                            <input id="dialog-loc" class="dialog-input cell" v-model="location" placeholder="Enter a location" />
                            <button class="advanced-search cell" type="button" @click="setAdvancedSearch(true)" >Advanced Search</button>
                        </div>
                        <div class="cell grid-x" v-if="advancedSearch">
                            <div class="cell">
                                <button class="advanced-search cell"
                                type="button" @click="setAdvancedSearch(false)" >Revert to Searchbar</button>
                            </div>

                            <!-- Advanced FILTERS -->
                            <div class="cell grid-x">
                                <label for="incident-type" class="cell" style="font-weight: bold;">Incident Type: </label>
                                <select v-model="incidentModel" id="incident-type" class="cell small-10 large-6">
                                    <option selected disabled value="">Select an Incident Type</option>
                                    <option
                                        v-for="types in codeCategories" :key="codeCategories.name"
                                        :value="'code_range:id='+types.value+':'+types.name">
                                        {{ types.name }}
                                    </option>
                                </select>
                                <button class="button cell small-2" type="button" @click="addTag(vModels.incidentModel)">+</button>

                                <label for="incident-type" class="cell" style="font-weight: bold;">Neighborhood Name: </label>
                                <select v-model="neighborhoodModel" id="code" class="small-10 large-6">
                                    <option selected disabled value="">Select a neighborhood</option>
                                    <option
                                        v-for="neighborhood in neighborhoods" :key="neighborhood.value"
                                        :value="'neighborhood: id='+neighborhood.id+':'+neighborhood.name">
                                        {{ neighborhood.name }}
                                    </option>
                                </select>
                                <button class="button cell small-2" type="button" @click="addTag(vModels.neighborhoodModel)">+</button>

                            </div>

                            <div class="cell grid-x">
                                <div class="cell medium-6">
                                    <label for="start-date" class="cell" style="font-weight: bold;">Start Date: </label>
                                    <input v-model="startDate" class="cell input-filter" type="date" id="start-date" pattern="\d{4}-\d{2}-\d{2}">
                                </div>
                                <div class="cell medium-6">
                                    <label for="end-date" class="cell" style="font-weight: bold;">End Date: </label>
                                    <input v-model="endDate" class="input-filter" type="date" id="end-date" pattern="\d{4}-\d{2}-\d{2}">
                                </div>
                            </div>
                            <div class="cell grid-x">
                                <label for="limit" class="cell" style="font-weight: bold;">Limit: </label>
                                <input v-model="limit" class="cell input-filter" type="number" id="limit" placeholder="1000">
                            </div>
                        </div>
                        <button class="button cell" type="button" @click="closeDialog">GO</button>

                    </div>

                </div>

                <div class="cell small-12" style="margin-top:1rem; padding: 1rem;">
                    <div class="button tag-button"
                        v-for="tag in tags" >
                            {{ tag.text }}
                            <button class="tag-close" @click="removeTag(tag, tag.historyId)">X</button>
                    </div>
                </div>
            </div>

            <div class="cell large-7">
                <div id="leafletmap"  style="margin:0; padding: 0; height: 700px; border: 4px solid black"></div>
            </div>

        </div>

    </div>
    <div class="grid-container">
        <div class="grid-x">
            <IncidentTable id="table" :crimes="visibleCrimes" :codes="codes" :neighborhoods="neighborhoods" :map="map"></IncidentTable>
        </div>
    </div>
</template>
