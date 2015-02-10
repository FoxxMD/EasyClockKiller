var utils = require('utils');

casper.test.begin('Clock in to EasyClock', 4, function suite(test) {

    var company = casper.cli.raw.get('company');
    var username = casper.cli.raw.get('username');
    var password = casper.cli.raw.get('password');

    if(utils.isUndefined(username) || utils.isUndefined(password) || utils.isUndefined(company)){
        test.fail('Missing command line argument.');
        casper.die();
    }

    casper.options.verbose = true;
    casper.start('https://easyclocking.net/company/'+company, function () {
        test.assert(
            this.exists('#UserName') &&
            this.exists('#Password') &&
            this.exists('#form input[type=submit]'), 'Found login form elements');

        casper.fill('#form', {
            'UserName': username,
            'Password': password
        });
    });
    casper.then(function () {
        var formVals = casper.getFormValues('#form');

        test.assertEquals(formVals.UserName, username, 'UserName Filled');
        test.assertEquals(formVals.Password, password, 'Password Filled');

        casper.click('#login input[type=submit]');
    });

    casper.waitForUrl('https://easyclocking.net/employee/timecard', function () {
        test.info('Login successful!');

        test.assertExists('input#clocktime', 'Found Clock In/Out button');
        this.click('input#clocktime');
        test.info('Clock In/Out Triggered!');

    }, function () {
        test.fail('Did not navigate to timecard after login submission.');
    }, 5000);

    casper.run(function () {
        test.done();
    })
});