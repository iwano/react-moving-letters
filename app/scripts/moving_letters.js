/** @jsx React.DOM */
'use strict';
var Letter = React.createClass({displayName: 'Letter',
  getInitialState: function() {
    return {
      left: 0,
      moveInterval: 100
    };
  },

  componentDidMount: function() {
    this.interval = setInterval(this.move, this.state.moveInterval);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  move: function() {
    var left = this.state.left;
    this.setState({left: left + 10});
    if (this.state.left >= 1000) {
      this.props.onFinish();
    }
  },

  render: function() {
    return (
      React.DOM.span( {style:{left: this.state.left}}, this.props.name)
      )
  }
});

var MovingLettersContainer = React.createClass({displayName: 'MovingLettersContainer',
  render: function() {
    return (
      React.DOM.div( {className:"moving-letters-container"})
      )
  }
});



var MovingLetters = React.createClass({displayName: 'MovingLetters',
  getInitialState: function() {
    return {
      letterInterval: 1000,
      movingLetters: [],
      score: 0,
      gameState: 'stopped'
    };
  },

  letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

  componentWillUnmount: function() {
    this.stopInterval();
  },

  stopInterval: function() {
    clearInterval(this.interval);
  },

  pushLetter: function() {
    var letters = this.state.movingLetters,
        letter = this.letters[Math.floor(Math.random() * (26 - 0))];
    letters.push(letter);
    this.setState({movingLetters: letters});
    console.log('new letter ** ' + letter + ' **');
  },

  startGame: function() {
    this.refs.input.getDOMNode().focus();
    this.setState({gameState: 'on', score: 0});
    this.interval = setInterval(this.pushLetter, this.state.letterInterval);
  },

  stopGame: function() {
    clearInterval(this.interval);
    this.setState({movingLetters: [], gameState: 'stopped'});
  },

  handleKeyPress: function(e) {
    var key = e.keyCode || e.which;
    if (key === 27) {
      this.stopGame()
    }
    console.log(e.which);
  },

  render: function() {
    var self = this,
        buttonClasses = React.addons.classSet({
          'visible': this.state.gameState == 'stopped',
          'hidden': this.state.gameState == 'on'
        });
    return (
      React.DOM.div(null, 
        React.DOM.h1(null, "Moving Letters"),
        React.DOM.div( {className:"moving-letters-container"}, 
          
            self.state.movingLetters.map(function(letter) {
              return (
                Letter( {name:letter, onFinish:self.stopGame})
                )
            })
          
        ),
        React.DOM.textarea( {id:"key_tracker", ref:"input", onKeyDown:this.handleKeyPress}),
        React.DOM.button( {id:"start_game", ref:"start", className:buttonClasses, onClick:this.startGame}, "Start"),
        React.DOM.h1(null, "Score: ", this.state.score)
      )
      )
  }
});

React.renderComponent(
  MovingLetters(null ),
  document.getElementById('app')
);
