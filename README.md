
# ShortenMyURL

A Url Shortener That Can Be Used to Shorten Any Link You May Want To Shorten!
## Description
Want to share a link but find it the URL, so horrendously big that you can't even take it?

Introducing ShortenMyURL, A Website that does exactly what I mentioned above....

But how does it work, Saul???

Well, let me explain, first you input a link into the search bar; then it gets shortened by a package called "shortid", which shortens a string while giving it a unique identifier.
Then both the original and the newly generated shortenlink get saved into MongoDB, which the website will return a new url which you can use to navigate to your original link!.

But how does it know to go to mines and not someone else's url link?

The explanation is simple really; when you navigate to the shorten link from ShortenMyURL, it checks to see if the shorten url exists within the database and redirects you to the original link that you gave us.
## Run Locally

Clone the project

```bash
  git clone https://github.com/Saul-RobotPenguin/ShortenMyURL.git
```

Go to the project directory

```bash
  cd ShortenMyURL/
```

Then simply run 

```bash
 node index.js
```

## Demo
https://sauls-shorten-my-url.herokuapp.com/