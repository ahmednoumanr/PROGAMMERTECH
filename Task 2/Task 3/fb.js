function createPost() {
    const content = document.getElementById('post-content').value;
    if (content.trim() === '') {
        alert('Post content cannot be empty');
        return;
    }

    const post = document.createElement('div');
    post.className = 'post';
    post.innerText = content;

    const feed = document.getElementById('feed');
    feed.insertBefore(post, feed.firstChild);

    document.getElementById('post-content').value = '';
}

let likeCount = 0;

    function toggleLike() {
        const likeButton = document.getElementById('likeButton');
        const likeCountElement = document.getElementById('likeCount');

        if (likeButton.classList.contains('liked')) {
            likeCount--;
            likeButton.classList.remove('liked');
        } else {
            likeCount++;
            likeButton.classList.add('liked');
        }

        likeCountElement.innerText = likeCount;
    }

    function toggleComment() {
        const commentSection = document.getElementById('commentSection');
        commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
    }

    function addComment() {
        const commentInput = document.getElementById('commentInput');
        const commentList = document.getElementById('commentList');
        
        if (commentInput.value.trim() !== '') {
            const newComment = document.createElement('li');
            newComment.innerText = commentInput.value;
            commentList.appendChild(newComment);
            commentInput.value = '';
        }
    }