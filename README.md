# Learning Async JS and Fetch API

## About

### Fetch API

The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.

### `async` function

An async function is a function declared with the async keyword, and the await keyword is permitted within them. The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.

## [Fetch API Examples](static/js/home.js)

```js
document.getElementById('getText').addEventListener('click', getText);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getPosts').addEventListener('click', getPosts);
document.getElementById('addPost').addEventListener('submit', addPost);

function getText(){
    fetch('static/txt/sample.txt')
        .then((res) => res.text())
        .then((data) => {
            document.getElementById('output1').innerHTML = data;
        })
        .catch((err) => console.log(err))
}

function getUsers(){
    fetch('static/json/users.json')
        .then((res) => res.json())
        .then((data) => {
            let output = '<h2>Users</h2>';
            data.forEach((user) => {
                output += `
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${user.id}</li>
                        <li class="list-group-item">Name: ${user.name}</li>
                        <li class="list-group-item">Email: ${user.email}</li>
                    </ul>
                    <br>
                `;
            });
            document.getElementById('output1').innerHTML = output;
        })
        .catch((err) => console.log(err));
}

function getPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let output = '<h2>Posts</h2>';
            data.forEach((post) => {
                output += `
                    <div class="card card-body mb-3">
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                        <h4>User: ${post.id}</h4>
                    </div>
                    <br>
                `;
            });
            document.getElementById('output1').innerHTML = output;
        })
        .catch((err) => console.log(err));
}

function addPost(e){
    e.preventDefault();
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body:  JSON.stringify({
            title: title,
            body: body
        })
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
}
```


## [Callbacks](static/js/callbacks.js)

```js
const posts = [{title: 'Post One', body: 'One'}, {title: 'Post Two', body: 'Two'}];

function getPost(){
    setTimeout( () => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, callback){
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);
}
// it will take 2 seconds - not 3!
createPost({title: 'Post Tree', body: 'Three'}, getPost)
```

## [Promises](static/js/promises.js)

### Calling the function

```js
const posts = [{title: 'Post One', body: 'One'}, {title: 'Post Two', body: 'Two'}];

function getPost(){
    setTimeout( () => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, callback){
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        posts.push(post);
        const error = false;
        if(!error){
            resolve();
        } else {
            reject('Something went wrong');
        }
    }, 2000);
    })
}

createPost({title: 'Post Tree', body: 'Three'})
    .then(getPost)
    .catch(err => console.log(err));
```

###  Async / Await

```js
async function init(){
    await createPost({title: 'Post Tree', body: 'Three'});
    getPost();
}
init();
```

### Async / Await / Fetch

```js
async function fetchUsers(){
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    console.log(data);
}
fetchUsers();
```

### Promise.all

```js
const promise1 = Promise.resolve('Hello world!');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'Goodbye')
});
const promise4 = fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json());
Promise.all([promise1, promise2, promise3, promise4])
    .then(values => console.log(values));
```


## Credits

- [Fetch API Introduction](https://www.youtube.com/watch?v=Oive66jrwBs&ab_channel=TraversyMedia)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Mac: Cmd+Shift+R - hard refresh](https://stackoverflow.com/questions/41144565/flask-does-not-see-change-in-js-file)















