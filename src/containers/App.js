import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Rank from '../components/Rank/Rank';
import ImgLinkForm from '../components/ImgLinkForm/ImgLinkForm';
import ParticlesBg from '../components/Particles/ParticlesBg';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    }
  

  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(data => console.log(data));  // == .then(console.log);
  // }

  loadUser = (info) => {
    this.setState({user: {
      id: info.id,
      name: info.name,
      email: info.email,
      entries: info.entries,
      joined: info.joined
    }})
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
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            // this.setState({user: {
            //   entries: count
            // }})
            this.setState(Object.assign(this.state.user,{ // updating user object
              entries: count
            }))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }
  
  onRouteChange = (route) => {
    if(route === 'signin' || route === 'register'){
      this.setState(initialState)      
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
          <Rank 
            name={this.state.user.name}
            entries={this.state.user.entries}
          />
          <ImgLinkForm 
            onInputChange ={this.onInputChange}
            onImageSubmit = {this.onImageSubmit}
          />
          <FaceRecognition
            box={box}
            imageUrl = {imageUrl}
          />
        </div>
        :( route === 'signin'
          ?<SignIn 
            loadUser = {this.loadUser}
            onRouteChange = {this.onRouteChange}
          />
          :<Register 
            loadUser = {this.loadUser} 
            onRouteChange = {this.onRouteChange}
          />
        )
        }
      </div>
    );
  }
}

export default App;
