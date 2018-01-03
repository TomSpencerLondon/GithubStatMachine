# Github Stat Machine

## The Brief
Design a piece of research to gather some quantitative data in order to understand whether the coding habits of 
software engineers change over the winter holiday period (in comparison to the rest of the year).

## My Approach
I felt that using the Github API was something that would provide me with some worthwhile and useable data as 
well as challenge me to learn which is something I value. I considered using the form to compile a more 
standard questionnaire to gather the quantifiable data and if I had more time I would use this to supliment the Github data.

I began by exploring what possible data points I could gather using API calls and decided to use weekly commits:
```
GET http://api.github.com//repos/:owner/:repo/stats/participation
```  
and measure activity via weekly additions and deletions:
```
GET http://api.github.com//repos/:owner/:repo/stats/code_frequency
```  

Again, with more time I could use the language_url link, to compare the different languages used, and the collaborators_url 
link to compare the number of unique collaborators.
```
GET http://api.github.com/repos/:owner/:repo/languages
GET http://api.github.com/repos/:owner/:repo/collaborators
```

Once I had decided on the data points I created a single page web app that took in a Github user name and performed the API
calls in a series of asynchronous HTTP (Ajax) requests. For each data point I created a JavaScript class to perform the neccessary
calculations returning the averages to be displayed in the app. 

At first I had each subsequent users repositories added to the averages and my classes account for multiple users and repositories however in
it's current iteration the app displays unique stats for each user. This can be easily edited.

I decided that I wanted to display the data in this way as I am a very visual person and seeing the comparisons easily showed me that there
is a marked difference in the averages. For me, this fulfilled the brief, however I am aware that for others a more thorough collection of the
data and more detailed analysis of the data is possible. I also thoroughly enjoyed creating the application.

## How To Use

The application can be found here: https://github-stat-machine.herokuapp.com/

You can also:

```
$ git clone https://github.com/haletothewood/GithubStatMachine
$ cd GithubStatMachine
$ open index.html
```

I have written tests using Jasmine for the classes and you can see these by running:
```
$ open SpecRunner.html
```

## Technology Used

* JavaScript  
* Jasmine  
* jQuery  
* Bootstrap
* Heroku

