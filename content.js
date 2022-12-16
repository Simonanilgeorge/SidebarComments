
function wait(amount){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Wait over")
        },amount)
    })
}

main()
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

async function main(){

    let commentBox=await waitForElement("ytd-comments")
    let descriptionBox=await waitForElement("#bottom-row.ytd-watch-metadata")
    let videoRecommendations=await waitForElement("ytd-watch-flexy[flexy] #secondary.ytd-watch-flexy")
    videoRecommendations.style.border="3px solid white"
    videoRecommendations.style.height="30em"
    videoRecommendations.style.overflow="auto"
    // descriptionBox.style.border="2px solid red"
    videoRecommendations.after(commentBox)
    videoRecommendations.remove()
    // descriptionBox.before(commentBox)
    commentBox.style.height="50em"
    // commentBox.style.border="3px solid white"
    commentBox.style.overflow="auto"

    // setInterval(()=>{
    //     commentBox.scrollBy({
    //         top: 1000,
    //         left: 0,
    //         behavior: 'smooth'
    //       });
    // },1000)
}


// #bottom-row.ytd-watch-metadata {
//     margin-top: 0px;
//     margin-right: -12px;
//     display: flexbox;
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//     border: 1px solid red;
// }



// async function waitForElement(selector) {
//     return new Promise((resolve, reject) => {
//       const checkExists = () => {
//         const element = document.querySelector(selector);
//         if (element) {
//           resolve(element);
//         } else {
//           requestAnimationFrame(checkExists);
//         }
//       };
//       checkExists();
//     });
//   }
  
//   async function main() {
//     const element = await waitForElement('#my-element');
//     // Element has been loaded, so we can do something with it
//     element.style.color = 'red';
//   }
  
//   main();
  