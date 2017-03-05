# ionic2 example application

This is just a small game app built to show an example of a Ionic 2 mobile app.

<h2>How it works?</h2>

The game is pretty simple.
10 words are given.
For each word you have 30 seconds to write a word that rhymes with it.
At the end it will be shown the total points you have made.

Before starting the game you will have to choose between 4 different levels: Easy - Medium - Hard - Random.

For the level <b> Random </b> it will be taken a word with a Get request to the Wordnik API.

For the levels <b> Easy - Medium - Hard </b> there are pre-populated array with around 1k words. 
These array are pre-populated in this way: A loop that make a Get request for a random word to the <b>Wordnik API</b>. 
For each word a request is made to the <b>Datamuse API</b> to check the total amount of possible rhymes for the given word.
<ul>
  <li>100+ possible rhymes: insert in the Easy array</li>
  <li>40 - 100 possible rhymes: insert in the Medium array</li>
  <li>10 - 40 possible rhymes: insert in the Hard array</li>
</ul>

<h2>App structure</h2>

There is one main component: the <b>Home component</b>. <br/>
From this component is possible to access two modals: <b>InfoModal</b> and <b>GameModal</b>.<br/>
All the Get requests (local and remote) are handled by the <b>ApiProvider</b>.

<h2>Topics</h2>

It's a rather small app. Yet it gave the possibility to handle several topics:

<ul>
  <li>Basic navigation - passing data to other components</li>
  <li>Use of services to deal with API or local requests and return a Promise</li>
  <li>Modals - Info and Game modals</li>
  <li>Animations - On the home element to make them fade in at the beginning and on the levels buttons </li>
  <li>Validation - The word inserted is required and must be a word (regex validation)</li>
  <li>Basic use of theming</li>
  <li>Css animation - the countdown clock</li>
  <li>Conditional class (active class on level buttons)</li>
  <li>Conditional style (on the countdown clock animation)</li>
  <li>Use of ion-spinner - before the random word is ready from the API</li>
  <li>Use of timeout - to remove error or success message after 3 seconds</li>
  <li>Basic game logic - handling seconds, words, points, levels</li>
  <li>Basic app styling - custom css to give some nice flat design</li>
</ul>

<h2>Demo</h2>

Here is a plunker of the app:

http://plnkr.co/edit/3MZ2pnG5z7zCfkQgPUpI?p=preview

Note: for simplicity sake the style has been put all in one file: app.css and has been slightly modified for the plunker. </br>
Use Github as code reference.


