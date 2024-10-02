<<<<<<< HEAD
# Library Management System 📚

Its a Project related to Books management for a Libraries 📜.

**_NOTE : This isn't an Ecommerce Website (There is no Payment System here)_**

FrontEnd is divided into two parts (ADMIN && CLIENT)

ADMIN can do -  
`1.manage books i.e. add/remove/update/delete books.`

`2.Check user' details i.e. name/id/borrowed book/etc`

`3.Confirm user's book request && Confirm book Return`

`4.Manage Book Charges(Extra fee's for not returing book in time)`

CLIENT can do -  
`1.Basic book surfing's and checking availablities`

`2.Request for a book`

`3.Viewing/CRUD Operations on Profile || Dashboard`

## Version Specifications :

1. NodeJS : v18.16.0
2. Express : v4.18.2
3. ReactJS : v18.2.0
4. Using MongoDB: v6.0.6
   Using Mongosh: v2.0.2

## Demo

![](https://mraalu.pythonanywhere.com/media/project/LMS.gif)

## Documentation

[Documentation Coming Soon!](https://www.github.com/MrAalu)

## How to run Project locally :

1. Clone the project

```bash
  git clone git@github.com:MrAalu/LibraryManagementSystem_MERN.git
```

2. Goto Both 'Frontend' and 'Backend' folder

```bash
  cd frontend , cd backend
```

3. Install dependencies on Both Frontend & Backend

```bash
  npm install
```

**NOTE : In 'backend' make sure to create a '.env' file and copy paste the values of '.env.example' into newly created '.env' file**

4. Start the Frontend and Backend

```bash
  npm run dev
```

5. Once you Run Backend(Server), database will be created automatically on Mongodb & You just have to Import the TABLE Data which is Stored in folder 'mongoDatabase'

```bash
Import respective .JSON file into database Collection
```

## How to run Project using Docker :

- Populate localhost mongodb database (explained in Step5 above).
- goto .env and make sure to use correct 'CONNECTION_URL'
- then, goto main folder location i.e. cd LIBRARYMANAGEMENTSYSTEM_MERN/ and use command :

```
docker-compose up
```

## Login Credentials

Starter Login Credentials :

ADMIN :

```
 Email : admin@gmail.com , Password : admin
```

## Lessons Learned

1. Code Comments are Loveletter's you leave behind for your future self.
2. If you cant Solve it, address it for your Future Self. He sure can!

## Feedback && Queries

If you have any feedback, feel free to reach out :)  
Email : amit.kc240@gmail.com

## Tech Stack

**Frontend :** React, Bootstrap

**Backend :** Node, Express, MongoDB

#### Developed By :- [@MrAalu](https://www.github.com/MrAalu)
=======
Example plain HTML site using GitLab Pages.

Learn more about GitLab Pages at https://pages.gitlab.io and the official
documentation https://docs.gitlab.com/ce/user/project/pages/.

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [GitLab CI](#gitlab-ci)
- [GitLab User or Group Pages](#gitlab-user-or-group-pages)
- [Did you fork this project?](#did-you-fork-this-project)
- [Troubleshooting](#troubleshooting)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## GitLab CI

This project's static Pages are built by [GitLab CI][ci], following the steps
defined in [`.gitlab-ci.yml`](.gitlab-ci.yml):

```
image: busybox

pages:
  stage: deploy
  script:
  - echo 'Nothing to do...'
  artifacts:
    paths:
    - public
    expire_in: 1 day
  rules:
    - if: $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH
```

The above example expects to put all your HTML files in the `public/` directory.

## GitLab User or Group Pages

To use this project as your user/group website, you will need one additional
step: just rename your project to `namespace.gitlab.io`, where `namespace` is
your `username` or `groupname`. This can be done by navigating to your
project's **Settings**.

Read more about [user/group Pages][userpages] and [project Pages][projpages].

## Did you fork this project?

If you forked this project for your own use, please go to your project's
**Settings** and remove the forking relationship, which won't be necessary
unless you want to contribute back to the upstream project.

## Troubleshooting

1. CSS is missing! That means that you have wrongly set up the CSS URL in your
   HTML files. Have a look at the [index.html] for an example.

[ci]: https://about.gitlab.com/gitlab-ci/
[index.html]: https://gitlab.com/pages/plain-html/blob/master/public/index.html
[userpages]: https://docs.gitlab.com/ce/user/project/pages/introduction.html#user-or-group-pages
[projpages]: https://docs.gitlab.com/ce/user/project/pages/introduction.html#project-pages
>>>>>>> 7e14d7545918b9167dd65bea8da454d2e389df5b
