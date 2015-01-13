"use strict";

var ReactTestUtils;

describe("MovingLetters",function(){
  var component;

  beforeEach(function() {
    ReactTestUtils = React.addons.TestUtils;
    component = React.renderComponent(React.createElement(MovingLetters, null), document.body);
  });

  it("Focus the input when clicking start", function () {
    var startButton = component.refs.start.getDOMNode();
    var typingInput = component.refs.input.getDOMNode();

    ReactTestUtils.Simulate.click(startButton);
    expect(document.activeElement).toEqual(typingInput);
  });

});
