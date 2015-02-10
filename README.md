Easy Clock Killer
===

A simple script to automate clocking in and out on easyclock.net. The script will log in a given user and click the **Clock In/Out** on the timecard page. To complete one day(clock in and out) you will need to run the script twice as it only toggles the button.

Prerequisites
====

* [PhantomJS](http://phantomjs.org/)
* [CasperJS](http://casperjs.org/)

Usage
====

Run `app.js` from the command line using `casperjs` in `test` mode and include all three command line arguments.

 Arguments:

 * `--company=[companyId]` -- The ID for your company (usually numbers)
 * `--username=[username]` -- Username used to login
 * `--password=[password]` -- Password to login

**Example**

`casperjs test app.js --company=1234 --username=joe --password=joePass`

License
====

MIT