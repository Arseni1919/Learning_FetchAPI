const posts = [
    {title: 'Post One', body: 'One'},
    {title: 'Post Two', body: 'Two'}
];

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
