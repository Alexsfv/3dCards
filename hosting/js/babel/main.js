"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var card = {
  body: {
    selector: '.card',
    maxRotateX: '45',
    maxRotateY: '45',
    perspective: '1000px'
  },
  like: {
    selector: '.card__like',
    maxZ: '61px'
  },
  img: {
    selector: '.card__img',
    maxZ: '60px'
  },
  name: {
    selector: '.card__name',
    maxZ: '50px'
  },
  description: {
    selector: '.card__description',
    maxZ: '40px'
  },
  price: {
    selector: '.card__price',
    maxZ: '30px'
  },
  btn: {
    selector: '.btn-add-card',
    maxZ: '1px'
  }
};
var mobileRangeAngel = 30; /// setting end

var isMobile = window.navigator.maxTouchPoints > 0;
var startDegrees = {
  x: '',
  y: ''
};

var Card = /*#__PURE__*/function () {
  function Card(params) {
    _classCallCheck(this, Card);

    this.params = params;
    this.elems = {};
    this.body = params.body.elem;
    this.getBodyChildren();
    this.setElemsStyle();
  }

  _createClass(Card, [{
    key: "getBodyChildren",
    value: function getBodyChildren() {
      var _this = this;

      Object.keys(this.params).forEach(function (elementName) {
        if (elementName === 'body') {
          return;
        }

        _this.elems[elementName] = _this.body.querySelector(_this.params[elementName].selector);
      }, this);
    }
  }, {
    key: "recalcStyles",
    value: function recalcStyles(mouseX, mouseY) {
      if (isMobile) {
        return;
      }

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
    key: "recalcStylesMobile",
    value: function recalcStylesMobile(deltaX, deltaY) {
      var rotateX = -this.getRotateXMobile(deltaX);
      var rotateY = this.getRotateXMobile(deltaY);
      this.body.style.transform = "perspective(1000px) rotateX(".concat(rotateX, "deg) rotateY(").concat(rotateY, "deg)");
    }
  }, {
    key: "getRotateXMobile",
    value: function getRotateXMobile(deltaX) {
      var rotationBody = deltaX / mobileRangeAngel * +this.params.body.maxRotateX;
      return Math.abs(rotationBody) > +this.params.body.maxRotateX ? Math.sign(rotationBody) * +this.params.body.maxRotateX : rotationBody;
    }
  }, {
    key: "getRotateYMobile",
    value: function getRotateYMobile(deltaY) {
      var rotationBody = deltaY / mobileRangeAngel * +this.params.body.maxRotateY;
      return Math.abs(rotationBody) > +this.params.body.maxRotateX ? Math.sign(rotationBody) * +this.params.body.maxRotateX : rotationBody;
    }
  }, {
    key: "setElemsStyle",
    value: function setElemsStyle() {
      for (var elem in this.elems) {
        if (this.elems.hasOwnProperty(elem)) {
          this.elems[elem].style = "transform: perspective(".concat(this.params.body.perspective, ") translateZ(").concat(this.params[elem].maxZ, ");");
        }
      }
    }
  }]);

  return Card;
}();

var cards = createCards(card);

if (isMobile) {
  window.addEventListener('deviceorientation', moveCardMobile);
} else {
  window.addEventListener('mousemove', moveHandler);
}

function moveHandler(e) {
  if (!isMobile) {
    cards.forEach(function (card) {
      card.recalcStyles(e.clientX, e.clientY);
    });
  }
}

function createCards(params) {
  var bodies = document.querySelectorAll(params.body.selector);
  var cards = [];
  bodies.forEach(function (body) {
    var cardElements = _objectSpread({}, params);

    cardElements.body.elem = body;
    cards.push(new Card(cardElements));
  });
  return cards;
}

function moveCardMobile(e) {
  var _ref = window.innerHeight > window.innerWidth ? [e.beta, e.gamma] : [-e.gamma, e.beta],
      _ref2 = _slicedToArray(_ref, 2),
      axisX = _ref2[0],
      axisY = _ref2[1];

  if (startDegrees.x === '' || startDegrees.y === '' || startDegrees.x === 0) {
    startDegrees.x = axisX;
    startDegrees.y = axisY;
  }

  var deltaX = axisX - startDegrees.x;
  var deltaY = axisY - startDegrees.y;
  cards.forEach(function (card) {
    card.recalcStylesMobile(deltaX, deltaY);
  });
}