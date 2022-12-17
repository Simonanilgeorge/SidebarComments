// set the initial message as false
let messageSent = false;
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {

  // if page is loaded and message is received;this is used to prevent the calling of the main function more than once
  if (!messageSent) {
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
  let commentBox = await waitForElement("ytd-comments#comments")
  let descriptionBox = await waitForElement("#bottom-row.ytd-watch-metadata")
  let videoRecommendations = await waitForElement("ytd-watch-flexy[flexy] #secondary.ytd-watch-flexy")

  // set the width of the comment box the same as video recommendation box; you need to use await because sometimes width gets assigned before the value gets loaded into videoRecommendations
  commentBox.style.width = `${await checkWidth(videoRecommendations)}px`
  // commentBox.style.width = `${videoRecommendations.offsetWidth}px`

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

  //add video recommendation box to new parent element 
  new_parent.appendChild(videoRecommendations)

  // append comment box to the new parent element 
  new_parent.appendChild(commentBox)





}

// function to check if width of an element is greater than 0; if width is greater than 0 then resolve
async function checkWidth(element) {

  // create a new promise
  return new Promise((resolve, reject) => {
    const check = () => {
      if (element.offsetWidth > 0) {
        // if element has a width greater than 0 then resolve
        resolve(element.offsetWidth)
      }
      else {
        // if width is still 0 use requestAnimationFrame to check until width is not 0 
        requestAnimationFrame(check)
      }
    }
    // call the check function initially
    check()
  })
}

// custom function that can be used to wait for some time
function wait(amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, amount)
  })
}