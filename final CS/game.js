let startButton = document.querySelector('#start')
let takeOrders = document.querySelector('#take-orders')
let customer = document.querySelector('#customer')
let order = document.querySelector('#order')
let customers = ['images/moira.png', 'images/kayla.png', 'images/muhan.png',
    'images/kamala.png', 'images/jinx.png', 'images/timothee.png'
]
let orders = ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png', 'images/6.png']
let setOrders = new Map()
let chosenCustomers = []
let chosenOrders = []
let directions = document.querySelector('#directions');
let image = document.querySelector('#image')
let realDirections = document.querySelector('#real-directions')
let promo = document.querySelector('#promo')
let grid = document.querySelector('#grid')
let status = document.querySelector('#status')
let orderup = document.querySelector('#orderup')
let playview = document.querySelector('#play')
let gameover = document.querySelector('#gameover')
let numbercorrect = 0
let bobst = document.querySelector('#bobst')
let layout = document.querySelector('#layout')
let speech = document.querySelector('#speech')

startButton.addEventListener('click', startGame)

function startGame() {
    takeOrders.style.display = 'block'
    speech.style.display = 'block'
    startButton.style.display = 'none'
    realDirections.style.display = 'none'
    promo.style.display = 'none'
    randomOrder()
}

function randomOrder() {
    directions.innerHTML = "Click on the customer take their order. Careful, you can't go back!"    

    for (let i=0; i<3; i++) {
        let randNum = parseInt(Math.random()*customers.length)
        let choice = customers[randNum]
        customers.splice(randNum, 1)
        // console.log(choice)

        // let newOrder = new Object()
        // newOrder.name = choice
        chosenCustomers.push(choice)

        let randNum2 = parseInt(Math.random()*orders.length)
        let choice2 = orders[randNum2]
        orders.splice(randNum2, 1)
        // newOrder.order = choice2
        chosenOrders.push(choice2)

        setOrders.set(choice, choice2)
    }

    console.log(setOrders)

    let i=0
    displayCustomer()
    function displayCustomer() {

        if (i < chosenOrders.length) {
            image.removeEventListener('click', displayCustomer)
            customer.src = chosenCustomers[i]
            order.src = chosenOrders[i]
            i++
            image.addEventListener('click', displayCustomer)
        } else {
            play()
            customer.src = ''
            order.src = ''
            return
        }
    }
    
  
    function play() {
        speech.style.display = 'none'

        directions.innerHTML = 'Orders are ready! Click on the customer whose order is ready.'

        let shuffledCustomers = shuffleArray(chosenCustomers)
        let shuffledOrders = shuffleArray(chosenOrders)
    
        function shuffleArray(pairs) {
            // console.log(pairs)

            for (let i=pairs.length-1; i>0; i--) {
                const j = Math.floor(Math.random()*(i+1));
                [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
            }
            return pairs
        }

        orderup.src = shuffledOrders[0]

        let clickCounter = 0
        let miniCustomer
        
        for (let i=0; i<3; i++) {
            miniCustomer = document.createElement('img')
            miniCustomer.src = shuffledCustomers[i]
            miniCustomer.width = 250;
            miniCustomer.dataset.secret = shuffledCustomers[i]
            grid.appendChild(miniCustomer)

            miniCustomer.onclick = compare
        }

        

        function compare(event) {
            clickCounter++
            console.log(clickCounter)

            console.log(event.currentTarget.dataset.secret, shuffledOrders[clickCounter-1])
            let name = event.currentTarget.dataset.secret
            let order = shuffledOrders[clickCounter-1]
            if (setOrders.get(name) == order) {
                correct()
            } else {
                incorrect()
            }
            
        }

        function timeout() {
            if (clickCounter > 2) {
                console.log('gameover')
                gameOver()
                return;
            }

            status.style.display = 'none'
            orderup.style.display = 'inline'
            orderup.src = shuffledOrders[clickCounter]
        }

        function correct() {
            status.style.display = 'block'
            status.innerHTML = 'Correct'
            status.style.color = 'green'
            orderup.style.display = 'none'
            setTimeout(timeout, 1200)
            numbercorrect++
        }

        function incorrect() {
            status.style.display = 'block'
            status.innerHTML = 'Incorrect'
            status.style.color = '#E31837'
            orderup.style.display = 'none'
            setTimeout(timeout, 1200)
        }


    }

    function gameOver() {
        playview.style.display = 'none'
        layout.style.display = 'none'
        gameover.classList.remove('hide')

        let paragraph = document.createElement('p')
        if (numbercorrect < 2) {
            paragraph.innerHTML = 'You got ' + numbercorrect + ' out of 3 correct. You won 10% off!'
        } else if (numbercorrect < 3) {
            paragraph.innerHTML = 'You got ' + numbercorrect + ' out of 3 correct. You won 20% off!'
        } else if (numbercorrect == 3) {
            paragraph.innerHTML = 'You got ' + numbercorrect + ' out of 3 correct. You won 30% off!'
        }

        let code = ''
        let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        for (i=0; i<6; i++) {
            let randNum = parseInt(Math.random()*alphabet.length)
            let letter = alphabet[randNum]
            code += letter
        }

        paragraph.innerHTML += '<br>Use code <strong>' + code + '</strong> at checkout.'
        paragraph.innerHTML += '<br><br><a href="home.html" class="tryagain">Back to Home</a>'

        gameover.appendChild(paragraph)
        bobst.style.display = 'none'
        
    }

}