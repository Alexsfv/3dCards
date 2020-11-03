"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var card = {
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
};
window.addEventListener('mousemove', moveHandler);

function moveHandler(e) {
  card1.recalcStyles(e.clientX, e.clientY);
}

var Card = /*#__PURE__*/function () {
  function Card(params) {
    _classCallCheck(this, Card);

    this.params = params;
    this.elems = {};
    this.body = document.querySelector(params.body.selector);
    this.elems.like = document.querySelector(params.like.selector);
    this.elems.img = document.querySelector(params.img.selector);
    this.elems.name = document.querySelector(params.name.selector);
    this.elems.description = document.querySelector(params.description.selector);
    this.elems.price = document.querySelector(params.price.selector);
    this.elems.btn = document.querySelector(params.btn.selector);
    this.setElemsStyle();
  }

  _createClass(Card, [{
    key: "recalcStyles",
    value: function recalcStyles(mouseX, mouseY) {
      var rotateY = this.getRotateY(mouseX);
      var rotateX = this.getRotateX(mouseY);
      this.body.style.transform = "perspective(1000px) rotateX(".concat(rotateX, "deg) rotateY(").concat(rotateY, "deg)");
    }
  }, {
    key: "getRotateY",
    value: function getRotateY(mouseX) {
      var centerXBody = Math.round(this.body.getBoundingClientRect().left + this.body.clientWidth / 2);

      if (mouseX < centerXBody) {
        return -Math.floor((1 - mouseX / centerXBody) * this.params.body.maxRotateX);
      } else if (mouseX === centerXBody) {
        return 0;
      } else if (mouseX > centerXBody) {
        return Math.floor((mouseX - centerXBody) / (window.innerWidth - centerXBody) * this.params.body.maxRotateX);
      }
    }
  }, {
    key: "getRotateX",
    value: function getRotateX(mouseY) {
      var centerYBody = Math.round(this.body.getBoundingClientRect().top + this.body.clientHeight / 2);

      if (mouseY < centerYBody) {
        return Math.floor((1 - mouseY / centerYBody) * this.params.body.maxRotateY);
      } else if (mouseY === centerYBody) {
        return 0;
      } else if (mouseY > centerYBody) {
        return -Math.floor((mouseY - centerYBody) / (window.innerHeight - centerYBody) * this.params.body.maxRotateY);
      }
    }
  }, {
    key: "setElemsStyle",
    value: function setElemsStyle() {
      for (var elem in this.elems) {
        if (this.elems.hasOwnProperty(elem)) {
          this.elems[elem].style = "transform: perspective(".concat(this.params[elem].perspective, ") translateZ(").concat(this.params[elem].maxZ, ");");
        }
      }
    }
  }]);

  return Card;
}();

function createCards(params) {
  var bodies = document.querySelectorAll(params.body.selector);
  return bodies.map(function (body) {
    return new Card();
  });
}

var card1 = new Card(card);