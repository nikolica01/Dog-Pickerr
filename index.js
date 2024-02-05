import {dogData} from "./export.js"
const emotionRadios=document.getElementById("emotion-radios")
const gifsOnlyOption=document.getElementById("gifs-only-option")
const getImageBtn=document.getElementById("get-imgBtn")
const memModalInner=document.getElementById("meme-modal-inner")
const memModal=document.getElementById("meme-modal")
const BtnCloseImg=document.getElementById("btn-closeImg")
let emotionsArray=[]
getImageBtn.addEventListener("click",renderDog) 
BtnCloseImg.addEventListener("click",closeBtnImg)
function closeBtnImg(){
    memModal.style.display="none"
}
function renderDog(){
    let DogObject=getSingleDogObject()
    memModalInner.innerHTML=`
    <img 
    class="img-dogs"
    src="./images/${DogObject.Image}"
    alt="${DogObject.alt}"
    >
    
    `
    memModal.style.display="flex"

}

function getSingleDogObject(){
    let dogsArray=getMatchingDogsArray()
    if(dogsArray.length === 1){
        return dogsArray[0]
    }else{
        const randomNumber=Math.floor(Math.random()*dogsArray.length)
        return dogsArray[randomNumber]
    }
    
}


function getMatchingDogsArray(){
if(document.querySelector('input[type="radio"]:checked')){
    let selectedEmotion=document.querySelector('input[type="radio"]:checked').value
    console.log(selectedEmotion)
    const isGif=gifsOnlyOption.checked
   
    const matchingDogArray = dogData.filter(function(dog){
        if(isGif){
           return dog.emotionTags.includes(selectedEmotion) && dog.isGif
        }
        else{
            return dog.emotionTags.includes(selectedEmotion)
        }
    })
    return matchingDogArray 
}

}


function getEmotionsArray(dog) {
  for (let dogs of dogData){
     for(let emotiontags of dogs.emotionTags){
 if(!emotionsArray.includes(emotiontags)){
    emotionsArray.push(emotiontags)
    }
  }
  
}
return emotionsArray
}
function renderEmotionsRadios(dog){
    let radioItems=""
  const emotions=getEmotionsArray()
  for (let emotion of emotions){
         radioItems +=`
         <div class="radio">
         
         <label for="${emotion}">${emotion}</label>
         <input 
         type="radio"
         id="${emotion}"
         value="${emotion}"
         name="emotions">
         </div>
         `   
  }
  emotionRadios.innerHTML=radioItems
}
renderEmotionsRadios(dogData)