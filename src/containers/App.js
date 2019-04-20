import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Rank from '../components/Rank/Rank';
import ImgLinkForm from '../components/ImgLinkForm/ImgLinkForm';
import ParticlesBg from '../components/Particles/ParticlesBg';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '7c0724e244e44b8b8fac3805020db584'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };
  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onInputSubmit = () =>{
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
    if(route === 'signin' || route === 'register'){
      this.setState({isSignedIn: false})      
    }else if(route === 'home'){
      this.setState({isSignedIn: true})      
    }
    this.setState({route})
    
  }
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg /> 
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>
        { route === 'home'
        ?<div>
          <Logo />
          <Rank />
          <ImgLinkForm 
            onInputChange ={this.onInputChange}
            onInputSubmit = {this.onInputSubmit}
          />
          <FaceRecognition
            box={box}
            imageUrl = {imageUrl}
          />
        </div>
        :( route === 'signin'
          ?<SignIn onRouteChange = {this.onRouteChange}/>
          :<Register onRouteChange = {this.onRouteChange}/>
        )
        }
      </div>
    );
  }
}

export default App;
