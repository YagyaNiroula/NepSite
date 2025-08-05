# Vue.js Blog Application

A modern, multi-page blog application built with Vue 3 and Vue Router.

## Features

- **Multi-page Application**: Home, Posts, and About pages
- **Blog Post Management**: Create, read, and delete blog posts
- **JSON Data Storage**: Posts stored in `public/posts.json`
- **Responsive Design**: Modern UI that works on all devices
- **Professional Styling**: Beautiful gradients and animations

## Pages

### Home Page

- Hero section with call-to-action
- Featured posts display
- Statistics dashboard
- Professional design with gradients

### Posts Page

- Display all blog posts
- Create new posts with form validation
- Edit and delete functionality
- Responsive grid layout

### About Page

- Mission statement
- Team information
- Contact details
- Professional presentation

## Blog Post Structure

Each blog post contains:

- `id`: Unique identifier
- `title`: Post title
- `category`: Post category
- `content`: Post content

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Technologies Used

- Vue 3.2.13
- Vue Router 4
- Vue CLI
- Modern CSS with Grid and Flexbox
- Fetch API for data loading

## File Structure

```
src/
├── components/
│   ├── Navigation.vue
│   └── CreatePost.vue
├── views/
│   ├── Home.vue
│   ├── Posts.vue
│   └── About.vue
├── router/
│   └── index.js
├── App.vue
└── main.js

public/
└── posts.json
```
# NepSite
