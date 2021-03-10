document.querySelector(".control-buttons span ").onclick= function(){
    let yourName = prompt("What is your Name ?");
    if( yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = "unknown";
    }else{
        document.querySelector(".name span").innerHTML = yourName;


    }
    document.querySelector(".control-buttons").remove();
};
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-block");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);


// add style css
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

// add click event
block.addEventListener('click',function(){

    //trigger the flip block funaction
    flipBlock(block);
});
});

//flip block
function flipBlock(selectBlock){

    // add class is-flipped
    selectBlock.classList.add('is-flipped');
    // COLLECT all flip cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    // if theres two selected blocks
    if (allFlippedBlocks.length == 2){
        

        // stop click funcation
        stopClicking ();


    // check matched block funcation
    checkMatchBLock(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
    
}
// stop clicking funcation
function stopClicking(){
    // add vlass no clicking on main container
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        // remove class no clicking after duration
        blocksContainer.classList.remove ('no-clicking');


    }, duration);
}
//check matched block
function checkMatchBLock (fristBlcok , SecondBLock){
    let triesElemnt = document.querySelector('.tries span');
    if (fristBlcok.dataset.tech === SecondBLock.dataset.tech){

        fristBlcok.classList.remove('is-flipped');
        SecondBLock.classList.remove('is-flipped');

        fristBlcok.classList.add('has-match');
        SecondBLock.classList.add('has-match');
        document.getElementById("success").play();
   } else {
       triesElemnt.innerHTML = parseInt(triesElemnt.innerHTML) + 1 ;
       setTimeout(() => {
        fristBlcok.classList.remove('is-flipped');
        SecondBLock.classList.remove('is-flipped');

       },duration);
       document.getElementById("fail").play();

   }
}
// shuffle funcation
function shuffle(array){
    // settings var
    let current = array.length,
        temp,
        random;
    while(current >0){
        //Get rondom Number
        random = Math.floor(Math.random()*current);
        // Decrease length by one
        current--;
        //[1] save current in stash
        temp = array[current];
        //[2] current element = random element
        array[current]= array[random];
        //[3] random  element = get elemnt form stash
        array[random] = temp;
    }
    return array
}