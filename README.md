# WE ARE LIVE WITH THE NEW CODEBASE - THIS REPO IS NOW RETIRED

# NEW CODE BASE FOR MOBILE & WEB APPS WITH NEW DESIGN!!
Want to help us? Check it out, see if you can help.
See the [greenbook-app](https://github.com/spicygreenbook/greenbook-app) repo! 

# WE ARE LIVE WITH THE NEW CODEBASE - THIS REPO IS NOW RETIRED

# greenbook
Code base for the website [spicygreenbook.com](https://spicygreenbook.com) which is a directory of local black-owned businesses that users can find to support

## Want to report a bug or issue with the website?
Use the [issues](https://github.com/spicygreenbook/greenbook-app/issues) section on this page to let us know!

## How To Contribute Code
The app is built with [React](https://reactjs.org/) + [NextJS](https://nextjs.org/) and is hosted/deployed on [Vercel](https://www.vercel.com) (formerly now.sh)

## What do I need to know to contribute code?
**Absolutely Critical**: JavaScript

**Helps a lot**: Git/GitHub, React, NextJS, CSS, HTML, Understanding fetching JSON data from an API

## How to get started coding on this app
```sh
    # clone the repo
    git clone git@github.com:spicygreenbook/greenbook.git

    # change your directory into the greenbook repo
    cd greenbook

    # install node modules
    npm install

    # run the dev server
    # this should make http://localhost:3000 available in your web browser
    npm run dev

```

### Get familiar with the file and data structure with NextJS
 - All front-end page end-points are in the pages folder. Making file at `pages/hello.js` will create the spicygreenbook.com/hello page on the site.
 - All static files go into the public folder. Creating a file in `public/my-file.jpg` will create the spicygreenbook.com/my-file.jpg url resolve to that file.
 - We get data from prismic.io using the `utils/getListings.js` helper function that you can look at to figure out how to retreive content from the CMS
 - You will see `filename.module.css` in the `css/` folder which is css that you can write and include in a component. See any page for an example of usage.
 - Files in the `pages/api` folder will automatically become lambda functions that provide a simple request/response promise as the primary function export. See [Vercel Serverless Functions](https://vercel.com/docs/v2/serverless-functions/introduction)
 - We use [Feather Icons](https://feathericons.com/) for the icons at the moment. Look at `components/Icons.js` to see how to add each individually needed Icon
 - **The entire site is statically built upon deployment. Every page/listing is a static html file delivered straight from the CDN. Any time a new commit is pushed to master, or a document is published in prismic, a new deployment is created and the whole site is updated at once.**

## Pretty new to github?
You can read [this tutorial](https://codeburst.io/a-step-by-step-guide-to-making-your-first-github-contribution-5302260a2940) on how to fork a project, make changes, and get those changes accepted to a repository.

## I'm ready to send you code
For your first patch you can make a PR and if we like it we'll merge it.

## Want to make regular contributions? Join our volunteer team
We will invite you to the volunteer team on github and you will be able to have write access to this repository in order to be able to more conveniently provide updates and handle issues.

## Slack
Our slack is at [spicy-green-book.slack.com](https://spicy-green-book.slack.com) if you want to be part of the community.

## Trello
We have a public trello board at [https://trello.com/b/2hUKxisJ/spicy-green-book](https://trello.com/b/2hUKxisJ/spicy-green-book) if you're looking for tasks to help us out with.
