
function wait(amount){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Wait over")
        },amount)
    })
}

main()

async function main(){
    await wait(5*1000)


    let commentBox=document.querySelectorAll("ytd-comments")[0]
    
    commentBox.style.height="20em"
    commentBox.style.border="3px solid white"
    commentBox.style.overflow="auto"

    // setInterval(()=>{
    //     commentBox.scrollBy({
    //         top: 1000,
    //         left: 0,
    //         behavior: 'smooth'
    //       });
    // },1000)
}



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
  