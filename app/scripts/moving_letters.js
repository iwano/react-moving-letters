/** @jsx React.DOM */
'use strict';
var Letter = React.createClass({displayName: "Letter",
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
      React.createElement("span", {style: {left: this.state.left, top: this.props.row}}, this.props.name)
      )
  }
});

var MovingLetters = React.createClass({displayName: "MovingLetters",
  getInitialState: function() {
    return {
      letterInterval: 1000,
      gameState: 'stopped',
      movingLetters: [],
      score: 0
    };
  },

  letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  rows: [10, 45, 80],

  componentWillUnmount: function() {
    this.stopInterval();
  },

  stopInterval: function() {
    clearInterval(this.interval);
  },

  startInterval: function() {
    this.interval = setInterval(this.pushLetter, this.state.letterInterval);
  },

  pushLetter: function() {
    var letters = this.state.movingLetters,
        letter = this.letters[Math.floor(Math.random() * (26 - 0))],
        row = Math.floor(Math.random() * (3 - 0));
    letters.push({name: letter, cleared: false, row: this.rows[row]});
    this.setState({movingLetters: letters});
  },

  startGame: function() {
    this.refs.input.getDOMNode().focus();
    this.setState({gameState: 'on', score: 0});
    this.startInterval();
  },

  stopGame: function() {
    clearInterval(this.interval);
    this.setState({movingLetters: [], gameState: 'stopped', letterInterval: 1000});
  },

  updateScore: function(value) {
    var score = this.state.score;
    if (score + value > 0 && (score + value) % 20 === 0) {
      this.setState({letterInterval: this.calculateNewInterval(value), score: score + value});
      this.stopInterval(this.interval);
      this.startInterval();
    } else {
      this.setState({score: score + value});
    }
  },

  calculateNewInterval: function(value) {
    var quotient = (this.state.score + value) / 20,
        result = 1000;
    for (var i = 1; i <= quotient; i++) {
      result = result - 10 * result / 100;
    }
    return result;
  },

  handleKeyPress: function(e) {
    var key = e.keyCode || e.which;
    if (key === 27) {
      this.stopGame();
    }

    if (key >= 65 && key <= 90) {
      var letters = this.state.movingLetters,
          letterPressed = this.letters[key - 65],
          letter = _.findWhere(letters, {name: letterPressed, cleared: false});
      if (letter) {
        letter.cleared = true;
        this.updateScore(1);
      } else {
        this.updateScore(-1);
      }
    }
  },

  render: function() {
    var self = this,
        buttonClasses = React.addons.classSet({
          'visible': this.state.gameState == 'stopped',
          'hidden': this.state.gameState == 'on'
        });
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Moving Letters"), 
        React.createElement("div", {className: "moving-letters-container"}, 
          
            self.state.movingLetters.map(function(letter) {
              if (!letter.cleared) {
                return (
                  React.createElement(Letter, {name: letter.name, cleared: letter.cleared, onFinish: self.stopGame, row: letter.row})
                  )
              }
            })
          
        ), 
        React.createElement("button", {id: "start_game", ref: "start", className: buttonClasses, onClick: this.startGame}, "Start"), 
        React.createElement("h1", null, "Score: ", this.state.score), 
        React.createElement("h2", null, "Speed: ", this.state.letterInterval, "ms"), 
        React.createElement("textarea", {id: "key_tracker", ref: "input", onKeyDown: this.handleKeyPress})
      )
      )
  }
});

React.renderComponent(
  React.createElement(MovingLetters, null),
  document.getElementById('app')
);
