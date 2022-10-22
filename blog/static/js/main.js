const saveBtns = document.querySelectorAll('.save');
const voteBts = document.querySelectorAll('.vote');
const searchBtn = document.querySelector('.search');
const inputSearch = document.querySelector('.input-search');
const deleteBtns = document.querySelectorAll('.delete');
const commentBtn = document.getElementById('add-comment');
const noComment = document.getElementById('no-comment');
const comments = document.querySelector('.all-comments');
const commentCounts = document.getElementById('comment-count');
let current = new Date();
let cDate =
  current.getFullYear() +
  '-' +
  (current.getMonth() + 1) +
  '-' +
  current.getDate();
let cTime =
  current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
// let dateTime1 = cDate + ' ' + cTime;
var dateTime = current.toLocaleString([], {
  hour: '2-digit',
  minute: '2-digit',
});
// to save Article
saveBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const url = `save/${btn.id}`;
    fetch(url, {
      method: 'post',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'removed') {
          btn.classList.remove('saved');
          btn.querySelector('.save-txt').innerHTML = 'Save';
          showMessage('Article Removed from Bookmarks');
        } else {
          btn.classList.add('saved');
          btn.querySelector('.save-txt').innerHTML = 'Saved';
          showMessage('Article saved in Bookmarks');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
});
// end Save Article

// start vote
voteBts.forEach((btn) => {
  btn.addEventListener('click', () => {
    fetch(`vote/${btn.dataset.vote}`, {
      method: 'put',
    })
      .then((res) => res.json())
      .then((data) => {
        let votedTxt = btn.querySelector('.vote-num');
        if (data.messege == 'downvote') {
          btn.classList.remove('voted');
          votedTxt.innerHTML = data.count;
        } else {
          btn.classList.add('voted');
          votedTxt.innerHTML = data.count;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
});
// end Vote

// Start delete
deleteBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const parent = document.querySelector(
      `article[data-card="${btn.dataset.delete}"]`
    );
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this article file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = `delete/${btn.dataset.delete}`;
        fetch(url, {
          method: 'post',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === 'deleted') {
              swal('Poof! Your article file has been deleted!', {
                icon: 'success',
              }).then(() => parent.remove());
            } else {
              swal('Try again..', {
                icon: 'error',
              });
            }
          })
          .catch((e) => {
            swal('Try again..', {
              icon: 'error',
            });
          });
      } else {
        swal('Your article file is safe!');
      }
    });
  });
});

// Start Comment
commentBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const commentContent = document.getElementById('comment-content');
  if (noComment) {
    noComment.remove();
  }
  if (commentContent.value !== '') {
    fetch(`comment/${commentBtn.dataset.comment}`, {
      method: 'post',
      body: JSON.stringify({
        comment: commentContent.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const prettyData = data;
        comments.innerHTML =
          createComment(prettyData.content, dateTime, prettyData.owner) +
          comments.innerHTML;
        commentCounts.innerHTML = prettyData.numbComments;
        showMessage('Comment Added Successfully');
      })
      .catch((e) => {
        console.log(e);
      });
  }
  commentContent.value = '';
});

function createComment(content, created, owner) {
  return `
  <div class="one-comment">
        <div class="header-comment">
          <h4>@${owner}</h4>
          <small style="color: var(--bs-cyan);">${cDate}, ${created}</small>
        </div>
        <div class="content">
          <p>${content}</p>
        </div>
      </div>
  `;
}

// for message
function showMessage(message) {
  const x = document.getElementById('snackbar');
  x.className = 'show';
  x.innerHTML = message;
  setTimeout(function () {
    x.className = x.className.replace('show', '');
  }, 3000);
}
