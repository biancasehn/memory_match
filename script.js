let cards = ["🦊","🐰","🐸","🦁","🐯","🦄","🐲","🐷","🐺","🐼","🦊","🐰","🐸","🦁","🐯","🦄","🐲","🐷","🐺","🐼"].sort(() => Math.random() - 0.5)

const modal = document.getElementById("modal")
const modalWrap = document.querySelector(".modal-wrap")
const closeModal = document.querySelector("close-modal")
const board = document.querySelector(".board")

let compare = [];
let clicks = 0;


addEventListener("click",() => {    
    const target = event.target;
    // if click target is a card with "?" as content
    if (target.className === "zone" && target.innerHTML === "?") {
        
        target.classList.add("rotate")

        //Hiding call to action after first click - it means the user understood what should be done
        document.querySelector("main h4").style.visibility = "hidden"
        //Displaying number of attempts

        board.classList.add("displayBoard")

        //adding the id of the card to the array compare
        compare.push(target.id)

        //changing the content of the card to the respective animal
        target.innerHTML = cards[target.id]
        
        // when user clicks the 3rd card
        if (compare.length === 3) {
            // if the last 2 cards are NOT equal (different animals), change the content back to "?" 
            if (!(cards[compare[0]] === cards[compare[1]])) {
                //incrementing number of attemps (clicks)
                clicks ++;

                //Updating number of attempts display
                document.querySelector("main p").innerHTML = `Number of attempts: ${clicks}`

                //User got it wrong, change turn the card back

                document.getElementById(compare[0]).innerHTML = "?"
                document.getElementById(compare[0]).classList.remove("rotate")

                document.getElementById(compare[1]).innerHTML = "?"
                document.getElementById(compare[1]).classList.remove("rotate")
            }
            //clear compare array
            compare = [];
            // push the 3rd card ID to compare array
            compare.push(target.id)
        }
        // Creating an array of the contents
        let elementsContent = cards.map((card, i) => {
            return document.getElementById(i).innerHTML
        })

        // Testing if all the contents are animals (paired)
        if (elementsContent.every(item => item !== "?")) {
            modal.classList.add("myModal-open")
            document.querySelector(".modal-wrap h5").innerHTML = `Number of attempts: ${clicks}`

            //listeners for closing the modal (either by click outside the modal or key)
            addEventListener('keydown', () => modal.classList.remove("myModal-open"))
            addEventListener('click', (event) => {
                if(event.target !== modalWrap && event.target.parentElement !== modalWrap) {
                    modal.classList.remove("myModal-open")
                }
            })
        }
    }
})