const blessed = require('blessed');
const axios = require('axios');
const queryService = 'http://queryservice.jamesframpton.com:5000'

// http://queryservice.jamesframpton.com:5000/posts
const getPosts = () => {
  return axios.get(queryService + '/posts')
    .catch((e) => {
      console.log(e);
    });
};

// let posts = getPosts();

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true,
  cursor: {
    blink : true,
    color: 'yellow'
  }
});

screen.title = 'Client - micro services test';

let postList = blessed.list({
  keys: 'vi',
  style: {
    bg: 'red'
  },
  left: '50%',
  width: '50%'
});

postList.key('r', async (ch, key) => {
  let listArray = [];
  let posts = await getPosts();
  posts = posts.data;
  for ( var key in posts ) {
    listArray.push(posts[key].title);
    postList.addItem(posts[key].title);
    screen.render();
  }
  // postList.setItems( listArray );
  // postList.items(postList);
  screen.render();
});

let form = blessed.form({
  keys: 'vi',
  style: {
    bg: 'blue'
  },
  width: '50%'
});

let formLabel = blessed.text({
  parent: form,
  style: {
    bg: 'blue'
  },
  top: 3,
  left: 5,
  content: 'SUBMISSION:'
});

var postTitle = blessed.textbox({
    parent: form,
    name: 'Title',
    top: 4,
    left: 5,
    height: 3,
    inputOnFocus: true,
    content: 'title goes here',
    style: { fg: 'red'},
    border: {
          type: 'line'
        },
    focus: {
          fg: 'white'
        }
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// append list to screen
screen.append(postList);
screen.append(form);

// Focus our element.
postList.focus();

// Render the screen.
screen.render();
