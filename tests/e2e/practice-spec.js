'use strict';


describe('launch homepage and fill controls', function () {
    beforeEach(function () {
        browser.get('http://localhost:8080');
    });

    it('should have known page title', function () {
        //var label_text = element(by.id('cont_title'));
        //expect(label_text.getText()).toEqual('Some text');
        expect(browser.getTitle()).toEqual('Testing AngularJS!!');
    });

    //it('should add username', function() {
    //    console.log('**test : * Login from ctest ');
    //    browser.debugger();
    //    element(by.id('username')).sendKeys('ranadasxxxxxx');
    //    element(by.id('password')).sendKeys('developmentdependency:');
    //});
});

describe('angularjs homepage', function () {
    beforeEach(function (done) {
        //window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            console.log('inside timeout');
            done();
        }, 500);
    });

    it('should greet the named user', function (done) {
        browser.get('http://www.angularjs.org');

        element(by.model('yourName')).sendKeys('Julie');

        var greeting = element(by.binding('yourName'));

        expect(greeting.getText()).toEqual('Hello Julie!');
        //expect(browser.getTitle()).toEqual('Testing AngularJS!!');
        done();
    });
})
;
