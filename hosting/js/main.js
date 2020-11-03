const card = {
    body: {
        selector: '.card',
        maxRotateX: '35',
        maxRotateY: '35'
    },
    like: {
        selector: '.card__like',
        maxZ: '60px',
        perspective: '1000px'
    },
    img: {
        selector: '.card__img',
        maxZ: '60px',
        perspective: '1000px'
    },
    name: {
        selector: '.card__name',
        maxZ: '60px',
        perspective: '1000px'
    },
    description: {
        selector: '.card__description',
        maxZ: '60px',
        perspective: '1000px'
    },
    price: {
        selector: '.card__price',
        maxZ: '60px',
        perspective: '1000px'
    },
    btn: {
        selector: '.btn-add-card',
        maxZ: '60px',
        perspective: '1000px'
    }
}

window.addEventListener('mousemove', moveHandler)

function moveHandler(e) {
    card1.recalcStyles(e.clientX, e.clientY)
}

class Card {
    constructor(params) {
        this.params = params
        this.elems = {}
        this.body = document.querySelector(params.body.selector)
        this.elems.like = document.querySelector(params.like.selector)
        this.elems.img = document.querySelector(params.img.selector)
        this.elems.name = document.querySelector(params.name.selector)
        this.elems.description = document.querySelector(params.description.selector)
        this.elems.price = document.querySelector(params.price.selector)
        this.elems.btn = document.querySelector(params.btn.selector)

        this.setElemsStyle()
    }

    recalcStyles(mouseX, mouseY) {
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

    setElemsStyle() {
        for (let elem in this.elems) {
            if (this.elems.hasOwnProperty(elem)) {
                this.elems[elem].style = `transform: perspective(${this.params[elem].perspective}) translateZ(${this.params[elem].maxZ});`
            }
        }
    }
}





function createCards(params) {
    const bodies = document.querySelectorAll(params.body.selector)
    return bodies.map(body => {
        return new Card()
    })
}

const card1 = new Card(card)