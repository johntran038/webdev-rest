<template>
    <section class="grid-container">
        <div class="title grid-x grid-margin-x">
            <div class="cell Crimetitle">
                <h6>Crime in Minnesota's capital, understood.</h6>
                <h3>St. Paul Crime Data</h3>
                <h3>Explorer</h3>
            </div>
            <div class="cell Buttons">
                <router-link to="/Search" class="navButton"><button class="titleButton Search">Search</button></router-link>
                <a href="https://www.youtube.com/embed/uHgt8giw1LY?autoplay=1&mute=1" target="_blank"><button class="titleButton"><ion-icon name="play-outline"></ion-icon> Watch Overview</button></a>
            </div>

            <div class="cell">
                <iframe width="85%" height="580" src="https://www.youtube.com/embed/oHg5SJYRHA0" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </section>




    <section class="grid-container">
        <div class="grid-x grid-margin-x">
            <div class="cell tooltitle">
                <h4>Built With</h4>
            </div>
            <div class="cell tools">
                <img src="https://vuejs.org/images/logo.png" draggable="false" alt="vue logo"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" draggable="false" alt="nodejs logo"/>
                <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.png" draggable="false" alt="express logo"/>
                <img src="https://static-00.iconduck.com/assets.00/sqlite-icon-1831x2048-7upf1m3n.png" draggable="false" alt="sqlite3 logo"/>
                <img src="https://camo.githubusercontent.com/6463de5386f43d6c67645ac94fc7a0fb309432e8f0b166ce2ef423057ea7bc0f/68747470733a2f2f77696b692e6f70656e7374726565746d61702e6f72672f772f696d616765732f372f37392f5075626c69632d696d616765732d6f736d5f6c6f676f2e737667" draggable="false" alt="Nominatim Logo"/>
                <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/096/thumb/leaflet.png" draggable="false" alt="leaflet"/>
            </div>
        </div>
    </section>




    <section class="grid-container">
        <div class="grid-x grid-margin-x">
            <div class="cell tooltitle">
                <h4>Did you know?</h4>
            </div>
            <div class="cell sliderFact">
                <div id="slider">
                    <input type="radio" name="slider" id="slide1" checked>
                    <input type="radio" name="slider" id="slide2">
                    <input type="radio" name="slider" id="slide3">
                    <input type="radio" name="slider" id="slide4">
                    <input type="radio" name="slider" id="slide5">
                    <input type="radio" name="slider" id="slide6">
                    <div id="slides">
                        <div id="overflow">
                            <div class="inner">

                                <div class="slide slide_1 grid-container">
                                    <div class="slide-content grid-x grid-margin-x">
                                        <div class="cell medium-5">
                                            <img src="../../public/img/most-crimes.png" width="300px" height="300px" alt="Crime Image by Fran couto" draggable="false" />
                                        </div>
                                        <div class="cell medium-7">
                                            <h2>Highest Number of Crimes in St. Paul</h2>
                                            <p>Out of the 1000 most recent crimes, Capitol River has the highest number of crimes in St. Paul Minnesota. They have 120 total crimes in that area.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="slide slide_2 grid-container">
                                    <div class="slide-content grid-x grid-margin-x">
                                        <div class="cell medium-5">
                                            <img src="../../public/img/spooky.png" width="300px" height="300px" alt="Grim Reaper Image by Funtasticon" draggable="false" />
                                        </div>
                                        <div class="cell medium-7">
                                            <h2>Spooky Month is Consistently Spooky</h2>
                                            <p>For the past three years, there have been only two murders every year in October.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="slide slide_3 grid-container">
                                    <div class="slide-content grid-x grid-margin-x">
                                        <div class="cell medium-5">
                                            <img src="../../public/img/arson.png" width="300px" height="300px" alt="Arson Image by Fran couto" draggable="false" />
                                        </div>
                                        <div class="cell medium-7">
                                            <h2>Arson Cases Spike in Payne/Phalen</h2>
                                            <p>Payne/Phalen has the most Arson cases out of the most recent 1000 incidents. They have a total of 171 Arson cases.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="slide slide_4 grid-container">
                                    <div class="slide-content grid-x grid-margin-x">
                                        <div class="cell medium-5">
                                            <img src="../../public/img/safe.png" width="300px" height="300px" alt="Safest Place Image by Fran couto" draggable="false" />
                                        </div>
                                        <div class="cell medium-7">
                                            <h2>Safest Place in Town</h2>
                                            <p>The Summit Hill neighborhood had the least number of violent crimes (7) for the past year.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="slide slide_5 grid-container">
                                    <div class="slide-content grid-x grid-margin-x">
                                        <div class="cell medium-5">
                                            <img src="../../public/img/murder.png" width="300px" height="300px" alt="Murder Image by Aldric Rodriguez" draggable="false" />
                                        </div>
                                        <div class="cell medium-7">
                                            <h2>Lots of Murders in Dayton's Bluff</h2>
                                            <p>Over the past five years, Dayton's Bluff had a total of ten murders which is the most out of the all the St. Paul neighborhoods.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="slide slide_6 grid-container">
                                    <div class="slide-content grid-x grid-margin-x">
                                        <div class="cell medium-5">
                                            <img src="../../public/img/theft.png" width="300px" height="300px" alt="Theft Image by Fran couto" draggable="false" />
                                        </div>
                                        <div class="cell medium-7">
                                            <h2>Theft Soars in Union Park</h2>
                                            <p>In the past year, Union Park is the neighborhood with the highest amount of theft with a total of 1238 thefts.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div id="bullets">
                        <label for="slide1"></label>
                        <label for="slide2"></label>
                        <label for="slide3"></label>
                        <label for="slide4"></label>
                        <label for="slide5"></label>
                        <label for="slide6"></label>
                    </div>
                </div>
            </div>

        </div>
    </section>




    <section class="grid-container">
        <div class="grid-x grid-margin-x">
            <div class="cell crimeSectionTitle">
                <h4>Our Developers</h4>
            </div>



            <!--List of Contributors-->
            <div class="cell">
                <div class="profiles">

                    <div class="profile">
                        <img src="https://avatars.githubusercontent.com/u/123771828?v=4"
                        class="profile-img" draggable="false" loading="lazy" alt="Francis' Profile"/>
                        <h3 class="user-name">Francis T.</h3>
                        <h5>Group Member</h5>
                    </div>


                    <div class="profile">
                        <img src="https://avatars.githubusercontent.com/u/123798873?v=4"
                        class="profile-img" draggable="false" loading="lazy" alt="John's Profile"/>
                        <h3 class="user-name">John T.</h3>
                        <h5>Group Member</h5>
                    </div>


                    <div class="profile">
                        <img src="../../public/img/profile/matt.jpg"
                        class="profile-img" draggable="false" loading="lazy" alt="Matt's Profile"/>
                        <h3 class="user-name">Matt L.</h3>
                        <h5>Group Member</h5>
                    </div>


                    <div class="profile">
                        <img src="https://tmarrinan.github.io/images/home/cover_photo_02.jpg"
                        class="profile-img" draggable="false" loading="lazy" alt="Marrinan's Profile"/>
                        <h3 class="user-name">Tommy M.</h3>
                        <h5>CS Professor</h5>
                    </div>
                </div>
            </div>

        </div>
	</section>


</template>

<style scoped>
.title{
    align-items: center;
    text-align: center;
}
.Crimetitle{
    align-items: center;
    text-align: center;
    padding: 3rem;
}
.Crimetitle h3{
    font-weight: bold;
    font-size: 3.3rem;
}
.Crimetitle h6{
    color: gray;
}
.titleButton{
    width: 13rem;
    height: 3.3rem;
    margin: .5rem;
    border-radius: .5rem;
    border: 2px solid black;
    font-weight: bold;
    cursor: pointer;
}
.titleButton:hover{
    background-color: black;
    color: white;
}
.Search{
    background-color: black;
    color: white;
}
.Search:hover{
    background-color: white;
    color: black;
}
.Buttons{
    margin-bottom: 3rem;
}
iframe{
    box-shadow: 0px 0px 21px 21px rgba(180, 180, 180, 0.22),
0px 5px 14px 0px rgb(0, 0, 0);
    border: 5px solid rgb(0, 0, 0)
}






.tooltitle{
    align-items: center;
    text-align: center;
    margin-top: 10rem;
    margin-bottom: 2rem;
}
.tooltitle h4{
    font-weight: bold;
    font-size: 2.5rem;
}
.tools{
    align-items: center;
    text-align: center;
}
.tools img{
    margin: 3rem;
    width: 9rem;
}







.crimeSectionTitle{
    align-items: center;
    text-align: center;
    margin-top: 10rem;
    margin-bottom: 2rem;
}
.crimeSectionTitle h4{
    font-size: 2.5rem;
    font-weight: bold;
}


.profiles{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
    align-items: center;
    text-align: center;
    grid-gap: 1.5rem;
    padding: 1rem 0px;
    font-size: 1.2rem;

    /* border: 1px solid red; */
}
.profile{
    min-width: 100%;
    height: 100%;
    margin-bottom: 20px;
    /* border: 1px solid white;  */
}

.profile .profile-img{
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 5px solid black;
}
.profile img{
    /* -webkit-filter: grayscale(100%);
    filter: grayscale(100%); */
    object-fit: cover;
}

.user-name{
    margin-top: 30px;
    font-size: 30px;
}
.profile h5{
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 3px;
    color: #000000;
    word-break: break-all;
}
@media only screen and (max-width: 1395px){
    .profiles{
        grid-template-columns: repeat(4, 1fr);
    }

    .profile{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

@media only screen and (max-width: 1275px){
    .heading{
        font-size: 40px;
        color: white;
        text-align: center;
    }
    .profiles{
        grid-template-columns: repeat(3, 1fr);
        margin: 20px 0;
    }
}

@media only screen and (max-width: 955px){
    .heading{
        font-size: 40px;
        color: white;
        text-align: center;
    }
    .profiles{
        grid-template-columns: repeat(2, 1fr);
        margin: 20px 0;
    }
}

@media only screen and (max-width: 720px){
    .heading{
        font-size: 40px;
        color: white;
        text-align: center;
    }
    .profiles{
        grid-template-columns: repeat(1, 1fr);
        margin: 20px 0;
    }
}




/* https://www.youtube.com/watch?v=1CZhGDU5cWM */
#slider {
   width: 100%;
   display: block;
}
#slider input[type=radio] {
   display: none;
}
#slider label {
   cursor: pointer;
   text-decoration: none;
}
#slides {
    border: 5px solid #ccc;
}
#overflow {
    display: block;
    overflow: hidden;
}
#slide1:checked ~ #slides .inner {
   margin-left: 0;
}
#slide2:checked ~ #slides .inner {
   margin-left: -100%;
}
#slide3:checked ~ #slides .inner {
   margin-left: -200%;
}
#slide4:checked ~ #slides .inner {
   margin-left: -300%;
}
#slide5:checked ~ #slides .inner {
   margin-left: -400%;
}
#slide6:checked ~ #slides .inner {
   margin-left: -500%;
}



/* Debug */
/*/
#slides .slide_1 {
   background: #00171F;
}
#slides .slide_2 {
   background: #003459;
}
#slides .slide_3 {
   background: #007EA7;
}
#slides .slide_4 {
   background: #00A8E8;
}
#slides .slide_5 {
   background: #00171F;
}
#slides .slide_6 {
   background: #0095ff;
} 
/*/



#slides .inner {
   transition: margin-left 800ms cubic-bezier(0.770, 0.000, 0.175, 1.000);
   width: 666.7%;
   line-height: 0;
}
#slides .slide {
   width: 15%;
   display: flex;
   float: left;
   color: #fff;
}

.slide-content{
    color: black;
}

#bullets {
   margin-top: 1em;
   text-align: center;
}
#bullets label {
   display: inline-block;
   width: .9em;
   height: .9em;
   border-radius: 100%;
   background: #ccc;
   margin: 0 .7em;
}
#slide1:checked ~ #bullets label:nth-child(1),
#slide2:checked ~ #bullets label:nth-child(2),
#slide3:checked ~ #bullets label:nth-child(3),
#slide4:checked ~ #bullets label:nth-child(4),
#slide5:checked ~ #bullets label:nth-child(5),
#slide6:checked ~ #bullets label:nth-child(6) {
   background: #444;
}

</style>