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
import { BACK_END } from './constants.js';

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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.mail,
      entries: data.entries,
      joined: data.joined
    }})
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
      fetch(BACK_END + 'imageUrl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ input: this.state.input })
      }).then(response => response.json())
        .then( response => {
          console.log(response);
          if (response) {
            fetch( BACK_END +'image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(rank => {
              this.setState(Object.assign(this.state.user, {entries: rank}))
            })
            .catch(console.log);
          }
          this.displayBoundingBox(this.calculateFaceLocation(response))
        })
        .catch( err => console.log(err))
    });
    
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({route})
    } else if (route === 'signout') {
      this.setState(initialState)
    } else {
      this.setState({route}) ;
    }
  }

  render() {
    const { route, box, imageUrl, user} = this.state;
    const isSignedin = user.id ? true : false;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin} />
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </div>
          : ( route === 'signin' 
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
