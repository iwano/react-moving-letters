/** @jsx React.DOM */
'use strict';
var Letter = React.createClass({
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
      <span style={{left: this.state.left}}>{this.props.name}</span>
      )
  }
});

var MovingLetters = React.createClass({
  getInitialState: function() {
    return {
      letterInterval: 1000,
      gameState: 'stopped',
      movingLetters: [],
      score: 0
    };
  },

  letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],

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
        letter = this.letters[Math.floor(Math.random() * (26 - 0))];
    letters.push({name: letter, cleared: false});
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
      var letterInterval = 1000 - (((this.state.score + value) / 20) * 100);
      this.setState({letterInterval: letterInterval, score: score + value});
      this.stopInterval(this.interval);
      this.startInterval();
    } else {
      this.setState({score: score + value});
    }
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
      <div>
        <h1>Moving Letters</h1>
        <div className="moving-letters-container">
          {
            self.state.movingLetters.map(function(letter) {
              if (!letter.cleared) {
                return (
                  <Letter name={letter.name} cleared={letter.cleared} onFinish={self.stopGame}/>
                  )
              }
            })
          }
        </div>
        <button id="start_game" ref="start" className={buttonClasses} onClick={this.startGame}>Start</button>
        <h1>Score: {this.state.score}</h1>
        <h2>Speed: {this.state.letterInterval}ms</h2>
        <textarea id="key_tracker" ref="input" onKeyDown={this.handleKeyPress}/>
      </div>
      )
  }
});

React.renderComponent(
  <MovingLetters />,
  document.getElementById('app')
);
