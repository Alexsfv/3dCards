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
    selector: ".card",
    maxRotateX: "45",
    maxRotateY: "45",
    perspective: "1000px"
  },
  like: {
    selector: ".card__like",
    maxZ: "61px"
  },
  img: {
    selector: ".card__img",
    maxZ: "60px"
  },
  name: {
    selector: ".card__name",
    maxZ: "50px"
  },
  description: {
    selector: ".card__description",
    maxZ: "40px"
  },
  price: {
    selector: ".card__price",
    maxZ: "30px"
  },
  btn: {
    selector: ".btn-add-card",
    maxZ: "1px"
  }
},
    mobileRangeAngel = 30,
    isMobile = window.navigator.maxTouchPoints > 0,
    startDegrees = {
  x: "",
  y: ""
};

var Card = /*#__PURE__*/function () {
  function Card(e) {
    _classCallCheck(this, Card);

    this.params = e, this.elems = {}, this.body = e.body.elem, this.getBodyChildren(), this.setElemsStyle();
  }

  _createClass(Card, [{
    key: "getBodyChildren",
    value: function getBodyChildren() {
      var _this = this;

      Object.keys(this.params).forEach(function (e) {
        "body" !== e && (_this.elems[e] = _this.body.querySelector(_this.params[e].selector));
      }, this);
    }
  }, {
    key: "recalcStyles",
    value: function recalcStyles(e, t) {
      if (isMobile) return;
      var a = this.getRotateY(e),
          o = this.getRotateX(t);
      this.body.style.transform = "perspective(1000px) rotateX(".concat(o, "deg) rotateY(").concat(a, "deg)");
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
    key: "recalcStylesMobile",
    value: function recalcStylesMobile(e, t) {
      var a = -this.getRotateXMobile(e),
          o = this.getRotateXMobile(t);
      this.body.style.transform = "perspective(1000px) rotateX(".concat(a, "deg) rotateY(").concat(o, "deg)");
    }
  }, {
    key: "getRotateXMobile",
    value: function getRotateXMobile(e) {
      var t = e / mobileRangeAngel * +this.params.body.maxRotateX;
      return Math.abs(t) > +this.params.body.maxRotateX ? Math.sign(t) * +this.params.body.maxRotateX : t;
    }
  }, {
    key: "getRotateYMobile",
    value: function getRotateYMobile(e) {
      var t = e / mobileRangeAngel * +this.params.body.maxRotateY;
      return Math.abs(t) > +this.params.body.maxRotateX ? Math.sign(t) * +this.params.body.maxRotateX : t;
    }
  }, {
    key: "setElemsStyle",
    value: function setElemsStyle() {
      for (var e in this.elems) {
        this.elems.hasOwnProperty(e) && (this.elems[e].style = "transform: perspective(".concat(this.params.body.perspective, ") translateZ(").concat(this.params[e].maxZ, ");"));
      }
    }
  }]);

  return Card;
}();

var cards = createCards(card);

function moveHandler(e) {
  isMobile || cards.forEach(function (t) {
    t.recalcStyles(e.clientX, e.clientY);
  });
}

function createCards(e) {
  var t = document.querySelectorAll(e.body.selector),
      a = [];
  return t.forEach(function (t) {
    var o = _objectSpread({}, e);

    o.body.elem = t, a.push(new Card(o));
  }), a;
}

function moveCardMobile(e) {
  var _ref = window.innerHeight > window.innerWidth ? [e.beta, e.gamma] : [-e.gamma, e.beta],
      _ref2 = _slicedToArray(_ref, 2),
      t = _ref2[0],
      a = _ref2[1];

  "" !== startDegrees.x && "" !== startDegrees.y && 0 !== startDegrees.x || (startDegrees.x = t, startDegrees.y = a);
  var o = t - startDegrees.x,
      s = a - startDegrees.y;
  cards.forEach(function (e) {
    e.recalcStylesMobile(o, s);
  });
}

isMobile ? window.addEventListener("deviceorientation", moveCardMobile) : window.addEventListener("mousemove", moveHandler);