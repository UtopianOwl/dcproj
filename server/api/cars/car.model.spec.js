"use strict";
let expect = require('expect.js');
let car = require('./car.model').Car;

describe('Car Model', () => {
  it('the name property should be required', () => {
    let model = car.schema.tree;
    expect(model).to.have.property('name');
    expect(model.name).to.have.property('required');
    expect(model.name.required).to.be(true);
  });
  describe('age property', () => {
    it('should have a min of 0', () => {
      let model = car.schema.tree;
      expect(model).to.have.property('age');
      expect(model.age).to.have.property('min');
      expect(model.age.min).to.be(0);
    });
    it('should have a max of 30', () => {
      let model = car.schema.tree;
      expect(model).to.have.property('age');
      expect(model.age).to.have.property('max');
      expect(model.age.max).to.be(30);
    });
  });
});
