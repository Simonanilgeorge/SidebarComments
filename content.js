
chrome.runtime.onMessage.addListener((req,sender,senderResponse)=>{
  console.log("message received")
  main()
})


async function waitForElement(selector) {
  return new Promise((resolve, reject) => {
    const checkExists = () => {
      const element = document.querySelectorAll(selector)[0];
      if (element) {
        resolve(element);
      } else {
        requestAnimationFrame(checkExists);
      }
    };
    checkExists();
  });
}

async function main() {

  let commentBox = await waitForElement("ytd-comments")
  let descriptionBox = await waitForElement("#bottom-row.ytd-watch-metadata")
  let videoRecommendations = await waitForElement("ytd-watch-flexy[flexy] #secondary.ytd-watch-flexy")
  commentBox.style.width = `${videoRecommendations.offsetWidth}px`
  commentBox.classList.add("commentBox")

  videoRecommendations.classList.add("videoRecommendations")


  let parent = videoRecommendations.parentNode
  let new_parent = document.createElement("div")
  new_parent.classList.add("new-parent")

  parent.appendChild(new_parent)
  new_parent.appendChild(videoRecommendations)

  // add comment box after videRecommendation
  videoRecommendations.after(commentBox)


}
