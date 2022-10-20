const saveBtns = document.querySelectorAll('.save');
const voteBts = document.querySelectorAll('.vote');
const searchBtn = document.querySelector('.search');
const inputSearch = document.querySelector('.input-search');
const deleteBtns = document.querySelectorAll('.delete');
const commentBtn = document.getElementById('add-comment');
const noComment = document.getElementById('no-comment');
const comments = document.querySelector('.all-comments');

// to save Article
saveBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const url = `save/${btn.id}`;
    console.log(url);
    fetch(url, {
      method: 'post',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'removed') {
          btn.classList.remove('saved');
          btn.querySelector('.save-txt').innerHTML = 'Save';
        } else {
          btn.classList.add('saved');
          btn.querySelector('.save-txt').innerHTML = 'Saved';
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
    console.log(commentBtn.dataset.comment)
    fetch(`comment/${commentBtn.dataset.comment}`, {
      method: 'post',
      body: JSON.stringify({
        comment: commentContent.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
          <small style="color: var(--bs-cyan);">${created}</small>
        </div>
        <div class="content">
          <p>${content}</p>
        </div>
      </div>
  `;
}
