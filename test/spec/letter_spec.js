'use strict';

var ReactTestUtils;

describe("Letter", function() {
  var component;

  beforeEach(function() {
    ReactTestUtils = React.addons.TestUtils;
  });

  afterEach(function() {
    React.unmountComponentAtNode(document.body);
  });

  describe("render", function() {
    describe("When it hasn't been cleared", function() {
      beforeEach(function () {
        component = React.renderComponent(React.createElement(Letter, {row: 3, name: "a"}), document.body);
      });


      it("Renders the letter", function () {
        expect(component.getDOMNode().innerText).toEqual("a");
      });

      it("Adds the proper positioning styles to the letter", function () {
        component.setState({left: 50});
        expect(component.getDOMNode().style.cssText).toEqual("left: 50px; top: 3px;");
      });
    });

    describe("When it has been cleared", function() {
      beforeEach(function () {
        component = React.renderComponent(React.createElement(Letter, {row: 9, name: "b", cleared: true}), document.body);
      });

      it("Does not get rendered", function() {
        debugger;
        expect(component.getDOMNode()).toBeFalsy();
      });
    });
  });

});
