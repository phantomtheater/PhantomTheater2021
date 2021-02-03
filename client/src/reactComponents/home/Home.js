//-----------------------------Imports---------------------------------------------------------------
import React, { useState } from "react";
import Image from "../images/barn3.jpeg";
import ImageH from "../images/barn3crop.jpg"
import Image2 from "../images/SarahRose.jpg";
import "./Home.css";
import { firestore } from '../firebase/firebase';
import { storage } from '../firebase/firebase';


// repetitive code that gets all ids and documents in a collection for .map
const collectAllIdsAndDocs = doc => {
   return { id: doc.id, ...doc.data() }
}



//------ Homepage component function with currently playing as central image and next show -----------
function Home() {

   let [allShows, setAllShows] = useState(null)
   let [currentShow1, setCurrentShow1] = useState(null)
   let [currentShow2, setCurrentShow2] = useState(null)

   // print list of all shows
   async function seeAllShows(dateIn) {
      // get all data from shows collection
      const showsRef = firestore.collection('shows')
      const showSnapshot = await showsRef.where('status', '==', 'Booked').get()

      // create array of all Booked shows
      const allShowsArray = showSnapshot.docs.map(collectAllIdsAndDocs)

      if (!allShows) {
         setAllShows(allShowsArray)
      }
   }


   async function loadHomePage() {
      // get system date
      let date = "2020-07-01T00:00"
      console.log(date)

      await seeAllShows(date)


      let currentShows = await allShows.filter(show => show.dates[0] >= date)
      currentShows.sort(function (a, b) {
         return new Date(a.dates[0]) - new Date(b.dates[0]);
      }); 
      
      setCurrentShow1(currentShows[0])
      setCurrentShow2(currentShows[1])
    
      console.log('current 1 =', currentShow1.title)
      console.log('current 2 =', currentShow2.title)
   }

   loadHomePage()

   return (
      <div className="homeContainer">
         <div className="currentPlay">
            <div className="imageDiv">

               {/* Firefly Divs that draws to the page */}
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <div className="firefly"></div>
               <img className="homeImage" src={Image} />
            </div>
            <div className="currentPlayText">
               <h1>Website Under Construction</h1>
               <h3>See you this summer!</h3>
               {/* <p>07/25/2020</p> */}
            </div>
         </div>

         {/* <div className="whatNext">
        <div className="whatNextImg">
          <img id="nextImage" src={Image2} />
        </div>
        <div className="whatNextText">
          <h2>MRV Performance Platform</h2>
          <p>08/08/2020- 08/09/2020</p>
        </div>
      </div> */}
      </div>
   );
}

export default Home;
