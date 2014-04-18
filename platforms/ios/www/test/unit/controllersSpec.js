'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('craigSearch.controllers'));


  it('should ....', inject(function($controller) {
    //spec body
    var homeController = $controller('HomeController');
    expect(homeController).toBeDefined();
  }));

  it('should ....', inject(function($controller) {
    //spec body
    var myCtrl2 = $controller('SearchesController');
    expect(myCtrl2).toBeDefined();
  }));
});
