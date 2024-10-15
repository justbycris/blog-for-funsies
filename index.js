import express from "express";
import bodyParser from "body-parser"; 
import methodOverride from "method-override";

//Find the index of my array item
//Once i have the index, if I click on delete, I should delete that index item
//

const app = express();
const port = 3000;
// const methodOverride = require('method-override');

app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }));

  //Posts Array
    let allPosts = [
        {   
            postId: 1234,
            title: "Welcome to Bloggy (:",
            author: "OG",
            content: `This is a fun blog created with Node.js, Express, EJS, HTML, CSS and Javascript. 
Feel free to play around with it (:`
        }   
    ]


//Home route
app.get("/", (req, res) => {
    res.render("index.ejs", { allPosts: allPosts });
}); 

//Create a new post
app.post("/allposts", (req, res) => {
     //Assign random ID to each post
     function generateID() {
        return Math.floor(Math.random() * 10000);
    }
    //Access the form data from the request body
      const postId = generateID();
      const title = req.body.title;
      const author = req.body.author;
      const content = req.body.content;

      allPosts.push({
        postId,
        title,
        author,
        content
      });
      console.info("My current array: " + allPosts)
   
    res.render("index.ejs", {
        allPosts: allPosts,
    });
});

//EDIT POSTS ROUTES 

//Identify pots to edit
app.get('/edit/:id', (req, res) => {
    const targetPostId = req.params.id;
    // Find the post by its ID
    const postToEdit = allPosts.find(post => post.postId === parseInt(targetPostId));

    if (postToEdit) {
        // Render the edit form and pass the post data to the EJS template
        res.render('edit.ejs', { post: postToEdit, editPage: 'edit.ejs' });
    } else {
        res.status(404).send('Post not found');
    }
})

//SEND NEW DATA TO EDITED POST
app.post('/edit/:id', (req, res) => {
    const targetPostId = req.params.id;
    const updateTitle = req.body.title;
    const updateContent = req.body.content;

    const postIndexToUpdate = allPosts.findIndex(post => post.postId === parseInt(targetPostId));
    console.log('PostIndexToUpdate: ' + postIndexToUpdate + "TargetPostId: " + targetPostId);
    console.log('Update Title: ' + JSON.stringify(updateTitle))

    if (postIndexToUpdate !== -1) {
            allPosts[postIndexToUpdate].title = updateTitle;
            allPosts[postIndexToUpdate].content = updateContent;
            
            console.log("Login Title : " + JSON.stringify(allPosts[0]))
        
        res.redirect('/')
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});



//DELETE ROUTE
app.use(methodOverride('_method'));

app.delete('/delete/:id', (req, res) => {
    //Access post ID to delete
    const targetPostId = req.params.id;

    //Look for a postId match in the allPosts array 
    const postIndexToDelete = allPosts.findIndex(post => post.postId === parseInt(targetPostId));

    //If there is a match
    if (postIndexToDelete !== -1) {
        //Delete post from array
        allPosts.splice(postIndexToDelete, 1);
        res.redirect('/')
    } else {
        res.status(404).json({ error: 'Post not found' });
    }

})
  
//Server 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  



