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
            author: "Cris",
            content:`This is a fun blog created with Node.js, Express, EJS, HTML, CSS and Javascript.  Feel free to play around with it (:`
        } , 
        {
            postId: 5678,
            title: "What I’ve learned living in NYC",
            author: "Cris",
            content: `Hi! My name is Cristi, and I’ve been living in New York City for the last 5 years. As a New Yorker would say: “You are halfway to officially becoming a New Yorker!”. Why is 10 years the rule to becoming a New Yorker? I don’t know, but I guess I’m halfway!

Living in New York City is impossible to describe in words. The city gives everyone a different experience, but I’ve learned through hearing from others that whatever it gives you could possibly be what you currently need the most, and please note that it will most likely come in the tough love form.

The city will step on your ego if what you need is to bring it down. It will amplify your social anxiety with wild social interactions if what you need is to get over your fear and learn to get out there despite it. It will make you hustle through a bunch of different and hard jobs just so you can stumble upon that one job that will lead you to have a completely new career that you will love. It will make you live with different people who will test your patience and appreciate the times you lived at home because maybe you need to learn how to share a space and accept differences in others’ lifestyles. It will throw you a dating life that might be painful and embarrassing, but will make for a great story as well as lead you to learn more about yourself and what you want in a partner.

I love living in New York City. It’s like choosing to skip the easy levels of a game to just get thrown out in the middle of chaos at the most hardcore level. Every day, New York City will have the absolute extraordinary waiting for you, but it will not give it to you until you decide to get up and go get it for yourself.

If you recently moved to New York City and you are not having the best time, hold on to this: life here goes by fast, and change goes along with it. Life can take a complete 360-degree turn for the better any second in New York, and the best part is you can make it happen. I believe in you and so does New York, even though it might not feel like that sometimes.

I hope my story helps you in any way. If you found this helpful or enjoyable, please consider to Buy Me a Coffee so I can stay awake (or get anxiety lol) to write more!

Thank You for being here! (:

Cristi`,
        },
        {
            postId: 9101,
            title: "Lessons from a Bad Haircut",
            author: "Cris",
            content:`The last time I got a haircut, my hairstylist was running super late to a party. I had to deal with her friends staring at me as though that would make the clock move faster. It didn’t rush me, but it did rush the girl cutting my hair.

The result? An 80’s style haircut on a 23 year-old young adult without much knowledge (or interest) in 80’s music.

In other words, NOT WHAT I WANTED.

Want to know what came next? I had an identity crisis in front of the mirror. In my mind, all the style I once had was gone. Hell, I’d probably be called a catfish on dating apps if I used my pre-haircut photos. I didn’t recognize the person in the mirror, and judging from the expression on her face, she didn’t recognize me either.

Yep, my life was over.

Now, before you start calling me dramatic, let me explain why I believe that a haircut is such an important part of me. Even if you don’t do it unconsciously, you shape your hair the way you want to express yourself and your style. It plays a huge part on the first impression people get from you because it’s the first thing they notice.

Not your eyes. Not your smile. Your hair.

Regardless if the experience is negative or positive, I’m a firm believer that you learn from every challenge in your life. So, here’s what I learned from getting a bad haircut:

In life, you have complete control of what you consider a ‘good’ or ‘bad’ experience.

The moment a situation presents itself, the first decision you can make is how you react to it, and that will influence everything that happens after. Once I realized the haircut was not what I wanted at all, I decided to look at it on the bright side.

At least I still have hair!

As simple as it sounds, this thought made me lean more towards the positive side.

Sometimes things happen and we want to do nothing more than cry, and that’s okay. Not forever, though.

The truth is that most situations call for us to actively solve them. The time you spend complaining or crying about it is time you could put towards finding a solution. So, cry as much as you need so you can then get back on track to where you want to be.

Since I couldn’t change the haircut because I did not want my hair any shorter, I knew the only solution was to act on how I felt towards it. I googled famous people who had the same haircut as me, and you’d never guess the amount of big names I found.

Yes, they were all from the 80’s. But still GREAT names!

Own it.

Having control leads to confidence, making the right decisions, and it makes everything seem like your life is put together. The way you can bring yourself to get control is to own the problem, and the best way to own it is to fake it until you make it.

Whenever I felt insecure about my hair, I would stand taller, push my shoulders back, and tell myself that if I were to bump into Joan Jett, she would absolutely compliment my style.

I mean, who wouldn’t like that?

Know how to laugh at yourself.

By no means I mean bringing yourself down, but if you can learn how to find the funny side of anything, life suddenly becomes easier.

My haircut has become a great conversation-starter about what character from 80’s movies I like best. I joke around (not really, though) that my karaoke performances are now mainly rock songs like “Pour Some Sugar on Me”. It’s never been easier to get in character and rock my soul out. Sadly, my singing skills do not compare to Joan Jett level, but that’s fine.

Now, my hair is growing back and transitioning out of its great 80s style (see what I did there?). It’s unlikely that I will ever get the same style again, but I can look back at this experience and learn from it.

I still can’t believe that a “bad haircut” has taught me so much about dealing with situations outside of my control. It was an important lesson that, hair involved or not, will help me tackle the way I express myself in the future.

Also, I’m now convinced that I would have THRIVED as a young adult living in the 80s.

Just saying.`
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

  



