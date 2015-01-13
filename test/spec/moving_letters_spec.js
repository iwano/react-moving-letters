"use strict";

var ReactTestUtils;

describe("MovingLetters", function() {

  beforeEach(function() {
    ReactTestUtils = React.addons.TestUtils;
  });

  afterEach(function() {
    React.unmountComponentAtNode(document.body);
  });

  describe("Start button", function() {
    var component, startButton, typingInput;
    beforeEach(function() {
      component = React.renderComponent(React.createElement(MovingLetters, null), document.body);
      startButton = component.refs.start.getDOMNode();
      typingInput = component.refs.input.getDOMNode();
      ReactTestUtils.Simulate.click(startButton);
    });

    it("Focus the input when clicking start", function () {
      expect(document.activeElement).toEqual(typingInput);
    });

    it("Hides start button after clicking it", function() {
      expect(startButton.className).toEqual("hidden");
    });

    it("Show the start button after clicking esc", function() {
      ReactTestUtils.Simulate.keyDown(typingInput, {keyCode: 27});
      expect(startButton.className).toEqual("visible");
    });
  });

});
