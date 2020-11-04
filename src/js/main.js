const card = {
    body: {
        selector: '.card',
        maxRotateX: '45',
        maxRotateY: '45',
        perspective: '1000px'
    },
    like: {
        selector: '.card__like',
        maxZ: '61px',
    },
    img: {
        selector: '.card__img',
        maxZ: '60px',
    },
    name: {
        selector: '.card__name',
        maxZ: '50px',
    },
    description: {
        selector: '.card__description',
        maxZ: '40px',
    },
    price: {
        selector: '.card__price',
        maxZ: '30px',
    },
    btn: {
        selector: '.btn-add-card',
        maxZ: '1px',
    }
}
const mobileRangeAngel = 30
/// setting end

const isMobile = window.navigator.maxTouchPoints > 0

const startDegrees = {
    x: '',
    y: ''
}

class Card {
    constructor(params) {
    
        this.params = params
        this.elems = {}
        this.body = params.body.elem

        this.getBodyChildren()
        this.setElemsStyle()
    }

    getBodyChildren() {
        Object.keys(this.params).forEach(elementName => {
            if (elementName === 'body') {
                return
            }
            this.elems[elementName] =  this.body.querySelector(this.params[elementName].selector)
        }, this)
    }

    recalcStyles(mouseX, mouseY) {
        if (isMobile) {
            return
        }
        const rotateY = this.getRotateY(mouseX)
        const rotateX = this.getRotateX(mouseY)
        this.body.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    getRotateY(mouseX) {
        const centerXBody = Math.round(this.body.getBoundingClientRect().left + this.body.clientWidth / 2)

        if (mouseX < centerXBody) {
            return - Math.floor( (1 - mouseX / centerXBody) * this.params.body.maxRotateX )
        } else if (mouseX === centerXBody){
            return 0
        } else if (mouseX > centerXBody) {
            return Math.floor( ( (mouseX - centerXBody) / (window.innerWidth - centerXBody) ) * this.params.body.maxRotateX )
        }
    }

    getRotateX(mouseY) {
        const centerYBody = Math.round(this.body.getBoundingClientRect().top + this.body.clientHeight / 2)

        if (mouseY < centerYBody) {
            return Math.floor( (1 - mouseY / centerYBody) * this.params.body.maxRotateY )
        } else if (mouseY === centerYBody){
            return 0
        } else if (mouseY > centerYBody) {
            return - Math.floor( ( (mouseY - centerYBody) / (window.innerHeight - centerYBody) ) * this.params.body.maxRotateY )
        }
    }

    recalcStylesMobile(deltaX, deltaY) {
        const rotateX = - this.getRotateXMobile(deltaX)
        const rotateY = this.getRotateXMobile(deltaY)

        this.body.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    getRotateXMobile(deltaX) {
        const rotationBody = (deltaX / mobileRangeAngel ) * +this.params.body.maxRotateX
        return Math.abs(rotationBody) > +this.params.body.maxRotateX ? Math.sign(rotationBody) * +this.params.body.maxRotateX : rotationBody
    }

    getRotateYMobile(deltaY) {
        const rotationBody = (deltaY / mobileRangeAngel ) * +this.params.body.maxRotateY
        return Math.abs(rotationBody) > +this.params.body.maxRotateX ? Math.sign(rotationBody) * +this.params.body.maxRotateX : rotationBody
    }

    setElemsStyle() {
        for (let elem in this.elems) {
            if (this.elems.hasOwnProperty(elem)) {
                this.elems[elem].style = `transform: perspective(${this.params.body.perspective}) translateZ(${this.params[elem].maxZ});`
            }
        }
    }
}

let cards = createCards(card)
if (isMobile) {
    window.addEventListener('deviceorientation', moveCardMobile)
} else {
    window.addEventListener('mousemove', moveHandler)
}

function moveHandler(e) {
    if (!isMobile) {
        cards.forEach(card => {
            card.recalcStyles(e.clientX, e.clientY)
        })
    }
}

function createCards(params) {
    const bodies = document.querySelectorAll(params.body.selector)
    const cards = []
    bodies.forEach(body => {
        const cardElements = {...params}
        cardElements.body.elem = body

        cards.push(new Card(cardElements))
    })
    return cards
}

function moveCardMobile(e) {
    let [axisX, axisY] = window.innerHeight > window.innerWidth ? [e.beta, e.gamma] : [-e.gamma, e.beta]

    if (startDegrees.x === '' || startDegrees.y === '' || startDegrees.x === 0) {
        startDegrees.x = axisX
        startDegrees.y = axisY
    }

    const deltaX = axisX - startDegrees.x
    const deltaY = axisY - startDegrees.y

    cards.forEach(card => {
        card.recalcStylesMobile(deltaX, deltaY)
    })
}
