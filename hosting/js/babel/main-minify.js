"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var card = {
  body: {
    selector: ".card",
    maxRotateX: "35",
    maxRotateY: "35"
  },
  like: {
    selector: ".card__like",
    maxZ: "60px",
    perspective: "1000px"
  },
  img: {
    selector: ".card__img",
    maxZ: "60px",
    perspective: "1000px"
  },
  name: {
    selector: ".card__name",
    maxZ: "60px",
    perspective: "1000px"
  },
  description: {
    selector: ".card__description",
    maxZ: "60px",
    perspective: "1000px"
  },
  price: {
    selector: ".card__price",
    maxZ: "60px",
    perspective: "1000px"
  },
  btn: {
    selector: ".btn-add-card",
    maxZ: "60px",
    perspective: "1000px"
  }
};

function moveHandler(e) {
  card1.recalcStyles(e.clientX, e.clientY);
}

window.addEventListener("mousemove", moveHandler);

var Card = /*#__PURE__*/function () {
  function Card(e) {
    _classCallCheck(this, Card);

    this.params = e, this.elems = {}, this.body = document.querySelector(e.body.selector), this.elems.like = document.querySelector(e.like.selector), this.elems.img = document.querySelector(e.img.selector), this.elems.name = document.querySelector(e.name.selector), this.elems.description = document.querySelector(e.description.selector), this.elems.price = document.querySelector(e.price.selector), this.elems.btn = document.querySelector(e.btn.selector), this.setElemsStyle();
  }

  _createClass(Card, [{
    key: "recalcStyles",
    value: function recalcStyles(e, t) {
      var r = this.getRotateY(e),
          o = this.getRotateX(t);
      this.body.style.transform = "perspective(1000px) rotateX(".concat(o, "deg) rotateY(").concat(r, "deg)");
    }
  }, {
    key: "getRotateY",
    value: function getRotateY(e) {
      var t = Math.round(this.body.getBoundingClientRect().left + this.body.clientWidth / 2);
      return e < t ? -Math.floor((1 - e / t) * this.params.body.maxRotateX) : e === t ? 0 : e > t ? Math.floor((e - t) / (window.innerWidth - t) * this.params.body.maxRotateX) : void 0;
    }
  }, {
    key: "getRotateX",
    value: function getRotateX(e) {
      var t = Math.round(this.body.getBoundingClientRect().top + this.body.clientHeight / 2);
      return e < t ? Math.floor((1 - e / t) * this.params.body.maxRotateY) : e === t ? 0 : e > t ? -Math.floor((e - t) / (window.innerHeight - t) * this.params.body.maxRotateY) : void 0;
    }
  }, {
    key: "setElemsStyle",
    value: function setElemsStyle() {
      for (var e in this.elems) {
        this.elems.hasOwnProperty(e) && (this.elems[e].style = "transform: perspective(".concat(this.params[e].perspective, ") translateZ(").concat(this.params[e].maxZ, ");"));
      }
    }
  }]);

  return Card;
}();

function createCards(e) {
  return document.querySelectorAll(e.body.selector).map(function (e) {
    return new Card();
  });
}

var card1 = new Card(card);