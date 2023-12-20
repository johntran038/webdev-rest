<script setup>
import { ref, reactive, onMounted } from 'vue';
defineProps(['incident', 'codes', 'neighborhoods']);
defineEmits('close');
let statusLocation = ref(true);

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
                {location: [44.942068, -93.020521], marker: null},
                {location: [44.977413, -93.025156], marker: null},
                {location: [44.931244, -93.079578], marker: null},
                {location: [44.956192, -93.060189], marker: null},
                {location: [44.978883, -93.068163], marker: null},
                {location: [44.975766, -93.113887], marker: null},
                {location: [44.959639, -93.121271], marker: null},
                {location: [44.947700, -93.128505], marker: null},
                {location: [44.930276, -93.119911], marker: null},
                {location: [44.982752, -93.147910], marker: null},
                {location: [44.963631, -93.167548], marker: null},
                {location: [44.973971, -93.197965], marker: null},
                {location: [44.949043, -93.178261], marker: null},
                {location: [44.934848, -93.176736], marker: null},
                {location: [44.913106, -93.170779], marker: null},
                {location: [44.937705, -93.136997], marker: null},
                {location: [44.949203, -93.093739], marker: null}
            ]
        }
    );
// Vue callback for once <template> HTML has been added to web page
onMounted(() => {
        // Create Leaflet map (set bounds and valied zoom levels)
        map.leaflet = L.map('leafletmap2').setView([map.center.lat, map.center.lng], map.zoom);
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
});



//--TESTING------------------------------------------
async function markerMap(address, code, neighborhood_number, neighborhoods){
    let url = 'https://nominatim.openstreetmap.org/search?q='+address+'&format=json&&limit=1';
    let colorCode = getColorCode(code);
    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        if(data.length > 0){
            let lat = data[0].lat;
            let lon = data[0].lon;
            map.leaflet.setView([lat, lon], 14);
            L.circleMarker([lat, lon], {
                radius: 15,
                fillOpacity: 1,
                color: 'black',
                fillColor: colorCode
            }).addTo(map.leaflet).bindPopup(
                `${address}`
            );
            statusLocation.value = true;
        }else{
            console.log("Not found");
            //set the general area (WIP)
            statusLocation.value = false;
        }
        console.log(data);
    })
    .catch((error)=>{
        console.log('Error:', error);
    });
}


function allEqual(input) {
    return input.split('').every(char => char === input[0]);
}
//Replace X with 0
function completeAddress(block, code, neighborhood_number, neighborhoods){
    console.log(block);
    let blockArr = block.split(" "); //split into an array of group string (Ex: "Summit Ave" -> ["Summit", "Ave"])
    //9XX if first char is an int or if all X
    if ((blockArr[0][0] >= '0' && blockArr[0][0] <= '9') || allEqual(blockArr[0])){
        blockArr[0] = blockArr[0].replaceAll("X", "0");
    }
    //add St. Paul, MN at the end of the string
    blockArr.push("St. Paul, MN");
    markerMap(blockArr.join(' '), code, neighborhood_number, neighborhoods);
    return blockArr.join(' ');
}

function getColorCode(code){
    //Murder
    if (code >= 100 && code < 200){
        return "rgb(230, 0, 0)";
    //Rape
    }else if (code >= 200 && code < 300){
        return "rgb(249, 0, 158)";
    //Robbery
    }else if ((code >= 300 && code < 400) || (code >= 500 && code < 800)){
        return "rgb(6, 188, 0)";
    //Assault
    }else if ((code >= 400 && code < 500) || (code >= 800 && code < 900)){
        return "rgb(0, 116, 217)";
    //Arson
    }else if (code >= 900 && code < 1000){
        return "rgb(129, 0, 203)";
    }else{
        return "rgb(134, 134, 134)";
    }
}




async function deleteData(caseNum){
    console.log('Deleted: '+caseNum);
    let formValues = {"case_number": caseNum};
    // curl -X DELETE "http://localhost:8000/remove-incident" -H "Content-Type: application/json" -d "{\"case_number\": 999999999}"
    const response = await fetch('http://localhost:8001/remove-incident', { 
        method: 'DELETE', 
        headers: { 
            'Content-type': 'application/json'
        }, 
        body: JSON.stringify(formValues) 
    }); 
            
    // Awaiting response.json() 
    const resData = response;
    location.reload();
    return resData;
}

function getIncidentTypeByCode(code, codes) {
    // finds json object for code passed
    const incident = codes.find(i => i.code === code);
    return incident ? incident.type : null;
}

function getNeighborhoodNameById(id, neighborhoods) {
    // finds json object for id passed
    const neighborhood = neighborhoods.find(i => i.id === id);
    return neighborhood ? neighborhood.name : null;
}

</script>

<template>
    <!-- <tr>
        <td>{{ incident.case_number }}</td>
        <td>{{ incident.date }}</td>
        <td>{{ incident.time }} mph</td>
        <td>{{ getIncidentTypeByCode(incident.code, codes)}}</td>
        <td>{{ incident.incident }}</td>
        <td>{{ incident.police_grid }}</td>
        <td>{{ getNeighborhoodNameById(incident.neighborhood_number, neighborhoods) }}</td>
        <td>{{ incident.block }}</td>
    </tr> -->
	<div class="popup">
		<div class="popup-inner grid-x grid-padding-x">
            <div class="moreInfo cell grid-x grid-padding-x">
                <h1 class="cell">Case: {{ incident.case_number }}</h1>
                <div class="cell medium-4">
                    <h2 class="cell">{{ incident.date }} / {{ incident.time }}</h2>
                    <h3 class="cell">{{ getIncidentTypeByCode(incident.code, codes)}}</h3>
                    <h6>Status Location: <span v-if="statusLocation" style="color:green; font-weight: bold">Found</span> <span v-else style="color:red; font-weight: bold">Not Found</span></h6>
                </div>

                <div class="cell medium-8">
                    <div class="mapPopup" id="leafletmap2"></div>
                </div>
                <h4 class="cell">Address: {{ completeAddress(incident.block, incident.code, incident.neighborhood_number, neighborhoods)}} / {{ getNeighborhoodNameById(incident.neighborhood_number, neighborhoods) }}</h4>


                <div class="cell options">
                    <button class="cell medium-6 popup-close" @click="$emit('close')">
                        Close
                    </button>
                    <button class="cell medium-6 popup-closeDel" @click="deleteData(incident.case_number); $emit('close')">
                        Delete
                    </button>
                </div>

            </div>
		</div>
	</div>
</template>

<style scoped>
.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.7);
	
	display: flex;
	align-items: center;
	justify-content: center;
}
.popup-inner{
	background: tan;
    border: 5px solid rgb(0, 0, 0);
    z-index: 99999;
    margin: 1em;
}

.popup-close,
.popup-closeDel{
    border: 2px solid rgb(0, 0, 0);
    border-radius: 1em;
    padding: 1em;
    font-weight: bold;
    cursor: pointer;
}
.popup-close:hover{
    background-color: black;
    color: white;
}
.popup-closeDel:hover{
    background-color: red;
    color: white;
}

.moreInfo h1{
    font-weight: bold;
}
.moreInfo h2{
    font-size: 1.2em;
    font-weight: bold;
}
.moreInfo h3{
    font-size: 1.2em;
    font-weight: bold;
}
.moreInfo h4{
    font-size: 1.3em;
    font-weight: bold;
}

.options{
    display: block;
    text-align: center;
}
.options button{
    margin-bottom: .5em;
    width: 70%;
}

.mapPopup{
    margin-bottom: 2em;
    height: 250px;
    width: 100%;
    display: block;
    border: 5px solid rgb(0, 0, 0);
}
</style>