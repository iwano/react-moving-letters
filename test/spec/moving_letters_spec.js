"use strict";

var ReactTestUtils;

describe("Label Test",function(){
  beforeEach(function() {
    ReactTestUtils = React.addons.TestUtils;
  });

  it("Check Text Assignment", function () {
    var component = React.createElement(MovingLetters);
    var container = ReactTestUtils.renderIntoDocument(component, document.body);
    expect(container.refs.start).toBeDefined();
    expect(container.refs.input).toBeDefined();
  });

});
