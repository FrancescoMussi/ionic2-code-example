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
  <li>100 + possible rhymes: insert in the Easy array</li>
  <li>40 - 100 possible rhymes: insert in the Medium array</li>
  <li>10 - 40 possible rhymes: insert in the Hard array</li>
</ul>

<h2>App structure</h2>

There is one main component: the <b>Home component</b>.
From this component is possible to access two modals: <b>InfoModal</b> and <b>GameModal</b>.
All the Get requests (local and remote) are handled by the <b>ApiProvider</b>.

<h2>Topics</h2>





