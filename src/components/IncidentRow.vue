<script setup>
import { ref } from 'vue';
import Popup from './IncidentPopUp.vue';
defineProps(['incident', 'codes', 'neighborhoods']);

const isOpen = ref(false);

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

</script>

<template>
    <div class="cell box grid-x">
        <span id="cell clipIcon" v-bind:style="{color: getColorCode(incident.code)}"><ion-icon name="clipboard"></ion-icon></span>
        <div class="cell caseNum">
            <h1>Case</h1>
            <h4>{{ incident.case_number }}</h4>
        </div>
        <div class="cell infopreview">
            <h1>Date:</h1>
            <h4>{{ incident.date }}</h4>
        </div>
        <div class="cell learnButton">
            <button @click="isOpen = true">Learn More</button>
        </div>
        <teleport to="body">
            <div class="moreInfo" v-if="isOpen">
                <Popup :incident="incident" :codes="codes" :neighborhoods="neighborhoods" @close="isOpen = false"></Popup>
            </div>
        </teleport>
    </div>
</template>

<style scoped>
.box {
    height: 22em;
    border: 5px solid black;
    border-left: 5px solid #ca944c;
    border-bottom: 5px solid #ca944c;
    background-color: tan;
}
.box span{
    font-size: 2em;
}
h1{
    text-align: center;
    font-size: 2em;
    font-weight: bold;
}
h4{
    text-align: center;
    font-size: 1.5em;
}

.learnButton{
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: .5em;
}
.learnButton button{
    border: 2px solid rgb(0, 0, 0);
    border-radius: 1em;
    padding: .6em;
    font-weight: bold;
    cursor: pointer;
}
.learnButton button:hover{
    background-color: black;
    color: white;
}

</style>