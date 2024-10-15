//VARIABLES
var newPostText = document.getElementById('newp-body');
var newPostBTN = document.getElementById('newpost-btn');
var newPostForm = document.getElementById('newpost-form');
var newPostClose = document.getElementById('close-form');
var overlay = document.getElementById('overlay');
var submitBTN = document.getElementById('np-submit');

//NEW POST BUTTON: 
newPostBTN.addEventListener('click', () => {
    newPostForm.classList.add('showform');
    newPostForm.classList.remove('closeForm');
    overlay.classList.add('show-overlay');
    console.log('clicked')
})

//NEW POST FORM CLOSE
newPostClose.addEventListener('click', () => {
    newPostForm.classList.add('closeForm');
    overlay.classList.remove('show-overlay');
    if (newPostForm.classList.contains('closeForm' === true)) {
        newPostForm.classList.remove('showform');
    }
})

//NEW POST TEXTAREA: DETECT LINE BREAKS

newPostText.addEventListener('keypress', function(event) {
    console.log(event)
    if (event.key === 'Enter') {
        // Insert a line break 
        let textAbreak = newPostText.value += '\n';
        //Replace with </br> for p tag when pushing into array
        textAbreak.replace(/\n/g, '<br>');

        // Prevent the default action of moving the cursor to the next line
        event.preventDefault();
    }
})
