<div align="center">
  <a href="#"><img src="./blog/static/semicolon.png" alt="Semicolon" width="200"></a>
  <h1>Semicolon</h1>
</div>

<h4 align="center">Full-Featured blog built-in by Django and Bootstrap.</h4>

<p align="center">
  <a href="https://python.org/downloads/">
    <img src="https://img.shields.io/pypi/pyversions/Django.svg" alt="python">
  </a>
  <a href="https://djangoproject.com/">
    <img src="https://img.shields.io/badge/django-4.0-success.svg" alt="django">
  </a>
  <a href="https://choosealicense.com/licenses/gpl-3.0/">
    <img src="https://img.shields.io/badge/license-GPL--3.0-green" alt="license">
  </a>
</p>
<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#describe">Describe folders</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#todo">TODO</a> •
  <a href="#author">Author</a> 
</p>

<!-- ![screenshot]() -->

<a name = "overview"></a>

## Overview

This is a project which was developed for the CS50 web course final project. The application contained within is a CMS-style blog site where developers can publish their blog posts and comment on other developers' posts in addition to other options.

<a name = "describe"></a>

## What’s contained in each folder

- accounts:
  - this app is manage users' accounts (login - logout - register - etc.)
  - [Django authentication system](https://docs.djangoproject.com/en/4.1/topics/auth/default/) was used to implement it.
  - (TODO) modify user profile.
- blog:
  - this app responsible for creating the articles and handling CRUD operations on them.

<a name = "key-features"></a>

## Key Features

- User Registration.
- User Login & Logout.
- Create, Read, Update & Delete Articles.
- Save an article with Markdown preview.
- Comments
- Search
- Customized admin panel
- Categories
- Bookmarks
- Vote system

<a name = "how-to-use"></a>

## How to use

- Create Virtual Environment

  ```
  $ pip install virtualenv
  $ virtualenv environment_name
  ```

  On Windows, run:

  ```
  $ environment_name\Scripts\activate.bat
  ```

  On Unix or MacOS, run:

  ```
  $ source environment_name\Scripts\activate
  ```

- clone this repository
  ```
  $ git clone https://github.com/AhmedBedeir/django-blog.git
  $ cd django-blog
  ```
- install dependencies
  ```
  $ pip install -r requirements.txt
  ```
- finally, You can run the project 🎉
  ```
  $ python manage.py runserver 
  ```
  Open http://localhost:8000 to view it in the browser. 

<a name = "todo"></a>

<!-- ## TODO (Future Implementations)

- -->
