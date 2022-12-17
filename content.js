// set the initial message as false
let messageSent = false;
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {

  console.log("message called",messageSent)
  // if page is loaded and message is received;this is used to prevent the calling of the main function more than once
  if (!messageSent) {
    console.log("message received");
    // set the messageSent value as true to prevent multiple calls to main function
    messageSent = true;
    main();
  }

});


// function to check if element exists in the page
async function waitForElement(selector) {

  // create a new promise;promise is resolved when element is found
  return new Promise((resolve, reject) => {
    const checkExists = () => {
      console.log("check exist is called for element",selector)
      const element = document.querySelectorAll(selector)[0];
      if (element) {
        resolve(element);
      } else {
        // repeatedly call the checkExists function to check if element is found;promise is resolved if element is found
        requestAnimationFrame(checkExists);
      }
    };

    // call the function the first time
    checkExists();
  });
}

// main function
async function main() {

  // get the respective elements;
  let commentBox = await waitForElement("ytd-comments")
  let descriptionBox = await waitForElement("#bottom-row.ytd-watch-metadata")
  let videoRecommendations = await waitForElement("ytd-watch-flexy[flexy] #secondary.ytd-watch-flexy")

  // set the width of the comment box the same as video recommendation box 
  commentBox.style.width = `${videoRecommendations.offsetWidth}px`

  // add styles to comment box
  commentBox.classList.add("commentBox")

  // add styles to video recommendation box
  videoRecommendations.classList.add("videoRecommendations")

  // get the parent element of the video recommendation box
  let parent = videoRecommendations.parentNode
  
  // create a new parent element to hold comment box and recommendation box; the new parent element will be inside parent element for the video recommendation box
  let new_parent = document.createElement("div")

  // add styles to the new parent element
  new_parent.classList.add("new-parent")

  // add the new parent element to the parent element
  parent.appendChild(new_parent)
  // append video recommendation box to the new parent element 
  new_parent.appendChild(commentBox)
  
  //add video recommendation box to new parent element 
  new_parent.appendChild(videoRecommendations)

  // add comment box after videRecommendation
  // commentBox.before(videoRecommendations)
  // videoRecommendations.after(commentBox)

}


// custom function that can be used to wait for some time
function wait(amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, amount)
  })
}