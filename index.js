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
            content: `This is a fun blog created with Node.js, Express, EJS, HTML, CSS and Javascript.  Feel free to play around with it (:`
        } , 
        {
            postId: 5678,
            title: "Testing characters",
            author: "LoremIpsum",
            content:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra erat eu turpis accumsan, quis facilisis arcu aliquet. Quisque dapibus varius justo ut ultricies. Nunc congue commodo porta. Nulla quis nulla et dui bibendum tristique. Sed tristique felis et iaculis pretium. Sed bibendum turpis quis nibh bibendum tincidunt. Sed feugiat, turpis egestas gravida cursus, nibh ligula vestibulum augue, id convallis velit sem commodo augue. Suspendisse sit amet egestas tellus. Nunc eget lorem convallis, suscipit mi at, malesuada justo. Etiam sit amet enim quis nisl semper feugiat eu id tortor. Praesent egestas in lectus id ultrices. In maximus libero purus, pretium elementum nisi porta ut. Vestibulum porttitor vel sem at bibendum.
Suspendisse potenti. Aliquam dignissim eros velit, ut mollis justo tempus et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. In elit est, placerat id metus in, fringilla efficitur metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque eget eleifend risus. Vivamus facilisis, massa a malesuada dignissim, nulla lectus laoreet odio, nec viverra metus ex fringilla justo. Sed bibendum placerat blandit. Donec quis dui nibh. Sed libero mauris, tempor non dignissim a, varius et sapien. Suspendisse nibh ex, finibus eget suscipit sit amet, maximus eu ex. Duis rhoncus nulla eu turpis euismod dignissim. Vivamus eu facilisis sapien, sed vehicula ex. Curabitur elit enim, facilisis ac odio vel, dapibus auctor orci.
Nulla nibh odio, pellentesque accumsan arcu nec, vehicula ultrices neque. Aenean eu justo cursus, aliquet velit vel, efficitur tellus. Proin laoreet dolor venenatis turpis fermentum, sed suscipit elit ullamcorper. Mauris sed quam quis sapien placerat fermentum non vel lacus. Fusce at turpis nec dolor tristique gravida. Sed tempor interdum purus sit amet porttitor. Maecenas enim metus, lobortis rhoncus viverra quis, blandit nec lectus. Donec cursus, dui ac pretium malesuada, tortor purus sodales elit, sed lacinia tellus erat sit amet dui. Vestibulum luctus, est nec tempus interdum, mi libero aliquam lorem, eu tincidunt tellus elit et tellus. Morbi non ante sed sapien tempor interdum. Curabitur tristique, libero sit amet consectetur viverra, quam magna aliquet ante, et sagittis justo turpis euismod libero. Praesent vitae rhoncus sem, non mattis lectus. Donec feugiat dui est, id pellentesque orci mattis et.
Quisque laoreet eros pulvinar eleifend hendrerit. Sed sodales vehicula sapien ac suscipit. Aliquam gravida dignissim ligula ut imperdiet. Etiam libero felis, molestie eu accumsan non, tristique quis nisl. Etiam a tempus nulla. Etiam et elit eu ex convallis scelerisque. Quisque venenatis, mauris vel sagittis ultricies, elit nisi placerat massa, id hendrerit felis magna in ex. Morbi quis rutrum est. Nulla bibendum, diam id lacinia tincidunt, velit nibh ullamcorper sem, nec convallis mi lorem vitae augue. Vestibulum malesuada dictum nibh vitae rhoncus. Duis sodales risus id velit dapibus tristique ac ut magna. Praesent ut sodales neque.`
        }
    ]


//Home route
app.get("/", (req, res) => {
    res.render("index.ejs", { allPosts: allPosts });
}); 


//Create a new post
app.post("/", (req, res) => {
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


//READ MORE POSTS WITH MORE THAN 300 CHARACTERS IN HOME FEED
app.get("/postview/:id", (req, res) => {
    const targetPostId = req.params.id;
    const postToView = allPosts.find(post => post.postId === parseInt(targetPostId));

    if (postToView !== -1) {
        
       res.render('postview.ejs', { postView: postToView, allPosts: allPosts})
    } else {
        res.status(404).send('Post Not Found!');
    }
})


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

  



