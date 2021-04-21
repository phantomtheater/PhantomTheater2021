//------------Imports -----------
import React, { useState, useEffect } from "react";
import app, { firestore } from './reactComponents/firebase/firebase';
import "./App.css";
import Nav from "./reactComponents/home/Nav";
import Home from "./reactComponents/home/Home";
import Footer from "./reactComponents/home/Footer";
import About from "./reactComponents/home/About";
import Artist from "./reactComponents/home/Artist";
import AllArtist from "./reactComponents/home/AllArtist"
import Reserve from "./reactComponents/home/Reserve";
import Season from "./reactComponents/home/Season";
import Burger from "./reactComponents/home/Burger.js";
import AddShow from "./reactComponents/forms/AddShow";
import AllShows from "./reactComponents/forms/AllShows";
import Login from "./reactComponents/forms/Login";
import ArtistForm from "./reactComponents/forms/ArtistForm";
import ProposalForm from "./reactComponents/forms/ProposalForm";
import EditShow from "./reactComponents/forms/EditShow";
import { AuthProvider } from "./reactComponents/forms/AuthContext";
// import PrivateRoute from "../src/reactComponents/forms/PrivateRoute";

import Dashboard from "./reactComponents/forms/Dashboard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Function containing the route paths  to all components
function App() {
  let [rightNow, setRightNow] = useState(new Date())
  let [allShows, setAllShows] = useState("")

  async function archiveShowsDone() {
    console.log("Fired")
    // get all data from shows collection
    const showsRef = firestore.collection('shows')
    // query for booked shows
    const showSnapshot = await showsRef.where('status', '==', 'Booked').get()
    // create array of all Booked shows
    const allShowsArray = showSnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })

    let stillPlaying = allShowsArray.map(doc => {

      // get system date
      let today = rightNow;
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let time = today.getTime()
      today = yyyy + '-' + mm + '-' + dd + "T" + time;
      let date = today

      let lastShow = doc.dates[doc.dates.length - 1]

      if (lastShow < date) {
        doc.status = "Done"
        updateDB(doc.id, doc.status)
      }

      async function updateDB(showId, showStatus) {
        await firestore.collection("shows").doc(showId).update({ status: showStatus })
      }
      return (doc)
    })

    setAllShows(stillPlaying)

  }

  // if (!allShows) archiveShowsDone()
  useEffect(() => {
    setRightNow(new Date())
    archiveShowsDone()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setRightNow(new Date()), 10000)

    return () => {
      clearInterval(timer)
    }
  })

  useEffect(() => {
    console.log("right now is ", rightNow)
    archiveShowsDone()

  }, [rightNow])

  return (
    <Router>
      <div className="App">
        <Burger />
        <Nav />
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <Home />
              {/* <CurrentShow /> */}
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/adminDash" component={Dashboard} />
            <Route path="/proposalForm" component={ProposalForm} />
            <Route path="/editShow" component={EditShow} />
            <Route path="/addShow" component={AddShow} />
            <Route path="/artistForm" component={ArtistForm} />
            <Route path="/allShows" component={AllShows} />
            <Route path="/Season" component={Season} />
            <Route path="/About" component={About} />
            <Route path="/Artist" component={Artist} />
            <Route path="/AllArtist" component={AllArtist} />
            <Route path="/Reserve" component={Reserve} />
          </Switch>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

//------export the component---------
export default App;