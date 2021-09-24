### My Solution to solve this problem

First, I learned how the canvas API works because I haven't worked with it a lot in my projects.
I started reading the documentation about it on MDN. I saw a crash course about it on youtube.
After that, I started reading the template code which you provided on Github. It seemed straightforward enough. After reading the source code, I had two options: start from scratch with a framework or a library like vue.js and react.js or just modify the existing source code. I chose the latter because I didn't want to over-engineer the project, and it was simple enough not to use any third-party libraries for it. At first, I wanted to add typescript to this project, but I figured there was no point in using typescript for a simple task like this, so I stuck with javascript.

The template gave me the images, so all I needed to do was these three things.

1. To make the images draggable.
2. Add a border around the images that are being dragged.
3. Set some limits on where the images can get dragged.

First, I added three event listers for my Mouse down, mouse move, and Mouse up.
I added an isDragging property to each image so I knew which image the user was dragging. Then I checked whether the user was clicking on an image. if that was the case, I set isDragging property to true and started rendering the canvas. When the Mouse was moving, I got the current mouse position, And I Added the offset to the images X and Y.

I thought of simply adding CSS classes works for adding borders, but then I realized we couldn't use css classes in a canvas, so I created strokeRect Around my image.

For setting the limitation on the draggable area, I added the condition that X and Y should be greater than 0, And they should be less than the canvas's width and height minus the width and height of the image.

When scrolling the page, the drag feature for images broke. All I needed to do to fix it was just calculate how much the user has scrolled and added it to my pointers X and Y.

## Answering the questions

- How long did it take you to complete this assignment?

  It took me almost 4 hours to finish this project.

- What about this assignment did you find most challenging?

  Working with canvas API was the most challenging part as I didn't have a lot of experience using it.

- What about this assignment did you find unclear?

  So I have worked with react, vue.js and angular, and it wasn't clear if using them would give me extra points.

- What challenges did you face that you did not expect?

  I thought adding a border should be easy, but I didn't expect I needed to use strokeRect Around my image.

- Do you feel like this assignment has an appropriate level of difficulty?

Yes, I do because a project requiring candidates to learn something new like canvas API and will give you better information about your candidate's abilities to learn new things.

- Briefly explain your decisions to use tools, frameworks and libraries like React, Vue, etc.

  So I didn't use any third-party libraries because I thought everything required in this task could be done with JavaScript. Adding libraries like React, Vue.js, or angular would simply overcomplicated the task. But if we were going to make it much more scalable and a little more performant, using a library would have made a lot more sense.
