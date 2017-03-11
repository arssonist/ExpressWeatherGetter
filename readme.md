This is an attempt to satisfy developer challenge number 2.

As I was not able to complete the assignment in Koa, with the variation between 1 and 2 I could not learn the Koa in time, I thought I might as well do the assignment in express.

After clone, `git checkout make_home_page` to swtich to branch with best content.
First: `npm install`

To Run: `DEBUG=express_test3:* npm start`

Navigate to `localhost:3000/enter`

I was able to create a simple UI where the user enters the data themselves.   The input only accepts correctly spelled city names, or ip address with four decimals, i.e. `1.11.22.33` or, if you would rather the browser do it, just click the auto link.

If you don't want to use the auto button, you can navigate yourself to `localhost:3000`

To Note:
- localhost does not supply an ip so one is hardcoded, however should a real ip be present it is written to (hopefully)
take the real ip fist.
- up until the development of the UI, I worked alone but with the UI and post route using an input field I had help from a friend more advanced than me.
- The section surrounding the IP and API I completed, but certain sections of the code, where it deals with regex, and using functions inside of routes, these where sections I had help with.
- I sought help to try and make my assignment more appealing, considering I did not use Koa as instructed.
