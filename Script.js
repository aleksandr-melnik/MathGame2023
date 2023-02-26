const getRandomNumInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min).toFixed(0)
    return randomNum
}
const getTask = () => {
    const symbol = (Math.random() > 0.5) ? '+' : '-'
    const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`
    gameState.rightAnswer = eval(task)
    return task
}
const toggleGameState = () => {
    gameState.taskInProcess = !gameState.taskInProcess
}
const gameElements = document.getElementById('my_game').children
//console.log(gameElements)
const title = gameElements[0]
const userTask = gameElements[1]
const userAnswer = gameElements[2]
const btnGame = gameElements[3]
const gameState = {
    taskInProcess: false,
    rightAnswer: null,
}
const StartGameFunc = () => {
    if (!gameState.taskInProcess) {
        title.innerText = 'Игра началась!'
        userAnswer.value = null
        userTask.innerText = getTask()
        userAnswer.hidden = false
        btnGame.innerText = 'Проверить'
        toggleGameState()
    } else {
        const isRight = gameState.rightAnswer == userAnswer.value
        userTask.innerText = userTask.innerText + ' = ' + gameState.rightAnswer
        title.innerText = (isRight) ? 'Вы победили!' : 'Вы проиграли!'
        btnGame.innerText = 'Начать заново'
        toggleGameState()
    }
}
btnGame.addEventListener('click', StartGameFunc)
userAnswer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        StartGameFunc()
    } else if (e.key === 'Escape') {
        userAnswer.blur()
    }
})

const choosedEl = document.querySelectorAll('.choosed_block-container > div')
const counterEl = document.querySelector('.choosed_block span')
const choosedState = {
    countElements: 0,
}
const changeCount = (value) => {
    choosedState.countElements += value
    counterEl.innerText = choosedState.countElements
}
const eventFunc = (e) => {
    if (e.target.className === '') {
        e.target.className = 'choosed_element'
        changeCount(1)
    } else {
        e.target.className = ''
        changeCount(-1)
    }
}
for (let i = 0; i < choosedEl.length; i++) {
    choosedEl[i].addEventListener('click', eventFunc)
}
const postBlock = document.querySelector('.posts_block-container')
const showPostsBTN = document.querySelector('.posts_block button')
const func = () => 5

function addPost(title, body) {
    const postTitle = document.createElement('h3')
    const postBody = document.createElement('span')
    const postItem = document.createElement('p')

    postTitle.innerText = title
    postBody.innerText = body

    postItem.append(postTitle, postBody)
    postBlock.append(postItem)
}
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            for (item of data) {
                addPost(item.title, item.body)
            }
            // addPost(data[7].title, data[7].body)
        })
        .catch(err => console.log(err.message))
}
// function createPost(title, body, userId) {
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         body: JSON.stringify({
//             title: title,
//             body: body,
//             userId: userId,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8'
//         },
//     })
//         .then(res => res.json())
//         .catch(err => console.log(err.message))
// }

showPostsBTN.onclick = getPosts