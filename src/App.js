import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import { API_KEY } from'./constants.js'

const app = new Clarifai.App({
  apiKey: API_KEY
});

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedin: false
    }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayBoundingBox( box ) {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}, () => {
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.imageUrl)
        .then( response => this.displayBoundingBox(this.calculateFaceLocation(response)))
        .catch( err => console.log(err))
    });
    
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignedin: true})
    } else {
      this.setState({isSignedin: false})
    }
    // this.setState({route: route});
    this.setState({route}) ;
  }

  render() {
    const { route, box, imageUrl, isSignedin} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin} />
        { route === 'signin' ? 
          <Signin onRouteChange={this.onRouteChange} />
        : ( route === 'register' ? 
            <Register onRouteChange={this.onRouteChange} />
          : 
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
