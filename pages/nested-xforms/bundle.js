/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Camera = __webpack_require__(1);
	
	var _Camera2 = _interopRequireDefault(_Camera);
	
	var _Group = __webpack_require__(2);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	var _Scene = __webpack_require__(3);
	
	var _Scene2 = _interopRequireDefault(_Scene);
	
	var _Rectangle = __webpack_require__(4);
	
	var _Rectangle2 = _interopRequireDefault(_Rectangle);
	
	var _Ticker = __webpack_require__(5);
	
	var _Ticker2 = _interopRequireDefault(_Ticker);
	
	var _Viewport = __webpack_require__(6);
	
	var _Viewport2 = _interopRequireDefault(_Viewport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	    var size = 512;
	    var rectSize = 64;
	    var rectSizeHalf = rectSize / 2;
	
	    /* for logging coordinates */
	    var output = document.querySelector("#output");
	    /* for logging coordinates */
	
	    var viewport = new _Viewport2.default(size, size, {
	        parent: document.querySelector("#spritewerk"),
	        fitToWindow: false
	    });
	    var camera = new _Camera2.default(0, 0, size, size);
	    var scene = new _Scene2.default(viewport.canvas, camera, { debug: true });
	    var ticker = new _Ticker2.default(viewport.screen);
	
	    var rect1 = new _Rectangle2.default(-rectSizeHalf, -rectSizeHalf);
	    var rect2 = new _Rectangle2.default(-rectSizeHalf, -rectSizeHalf);
	    var rect3 = new _Rectangle2.default(-rectSizeHalf, -rectSizeHalf);
	
	    var grp2 = new _Group2.default();
	    grp2.collection.add(rect2);
	    grp2.sprite.x = rectSize;
	    grp2.sprite.y = rectSize;
	
	    var grp3 = new _Group2.default();
	    grp3.collection.add(rect3);
	    grp3.sprite.x = rectSize * 2;
	    grp3.sprite.y = rectSize * 2;
	
	    var grp1 = new _Group2.default();
	    grp1.collection.add(rect1, grp2, grp3);
	    grp1.sprite.x = size / 2;
	    grp1.sprite.y = size / 2;
	
	    ticker.onTick = function () {
	        scene.clear("#ccc");
	
	        grp1.sprite.rotation += 1;
	        grp2.sprite.rotation -= 1;
	        grp3.sprite.rotation += 1;
	
	        /* for logging coordinates */
	        output.innerHTML = "rect 1 { x: " + Math.round(rect1.gx) + ", y: " + Math.round(rect1.gy) + " }\nrect 2 { x: " + Math.round(rect2.gx) + ", y: " + Math.round(rect2.gy) + " }\nrect 3 { x: " + Math.round(rect3.gx) + ", y: " + Math.round(rect3.gy) + " }";
	        /* for logging coordinates */
	
	        scene.startRender(grp1);
	    };
	}).call(undefined);

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * @class Camera
	 * @param {Integer} [x=0] - The x coordinate
	 * @param {Integer} [y=0] - The y coordinate
	 * @param {Integer} [width=800] - The viewport width
	 * @param {Integer} [height=600] - The viewport height
	 */
	export default class Camera {
	    constructor (x=0, y=0, width=800, height=600) {
	        /**
	         * @member {Integer} Camera#x - The camera's x position
	         */
	        this.x = x;
	        /**
	         * @member {Integer} Camera#y - The camera's y position
	         */
	        this.y = y;
	        /**
	         * @member {Integer} Camera#width - The viewport width
	         */
	        this.width = width;
	        /**
	         * @member {Integer} Camera#height - The viewport height
	         */
	        this.height = height;
	        /**
	         * @member {Float} Camera#rotation - The camera's rotation
	         */
	        this.rotation = 0;
	        /**
	         * @member {Float} Camera#zoom - The camera's zoom value
	         */
	        this.zoom = 1;
	    }
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	import Collection from "./Collection";
	import Sprite from "./Sprite";
	
	/**
	 * Composes Sprite and Collection
	 * @class Group
	 * @requires Collection
	 * @requires Sprite
	 */
	export default class Group {
	    constructor () {
	        /**
	         * @member {Collection} Group#collection - The group's collection
	         */
	        this.collection = new Collection();
	        /**
	         * @member {Sprite} Group#sprite - The group's display object
	         */
	        this.sprite = new Sprite();
	        /**
	         * @member {Boolean} Group#isGroup - Denote's the object as a group
	         */
	        this.isGroup = true;
	    }
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	import { degreesToRadians } from "./util/math";
	import Transform from "./lib/Transform";
	
	let defaults = {
	    debug: false
	};
	
	/**
	 * Handles rendering entities onto the canvas element
	 * @class Scene
	 * @requires Transform
	 * 
	 * @param {HTMLElement} canvas - The active canvas element
	 * @param {Camera} camera - The camera instance
	 * @param {Object} [options]
	 * @param {Boolean} [options.debug=false] - If true, renders debug objects
	 */
	export default class Scene {
	    constructor (canvas, camera, options=defaults) {
	        /**
	         * @member {HTMLElement} Scene#canvas - The active canvas element
	         */
	        this.canvas = canvas;
	        /**
	         * @member {Camera} Scene#camera - The camera instance
	         */
	        this.camera = camera;
	        /**
	         * @member {HTMLElement} Scene#options - The Scene's options
	         */
	        this.options = options;
	        /**
	         * @member {CanvasRenderingContext2D} Scene#ctx - The canvas rendering object
	         */
	        this.ctx = canvas.getContext("2d");
	        /**
	         * @member {Transform} Scene#transform - The transformation matrix tracker
	         */        
	        this.transform = new Transform();
	
	        this.xformOffset = null;
	        this.cameraXformOffset = null;
	    }
	    
	    /**
	     * Applies the camera's transforms to the Transform > context
	     * @method Scene#_applyCameraTransforms
	     * @param {Camera} cam - The camera instance
	     */
	    _applyCameraTransforms (cam) {
	        this.transform.translate(-cam.x, -cam.y);
	        
	        if (cam.rotation !== 0) {
	            let rotationOffsetWidth = cam.width / 2;
	            let rotationOffsetHeight = cam.height / 2;
	            this.transform.translate(rotationOffsetWidth, rotationOffsetHeight);
	            this.transform.rotate(degreesToRadians(cam.rotation));
	            this.transform.translate(-rotationOffsetWidth, -rotationOffsetHeight);
	        }
	        
	        if (cam.zoom !== 1) {
	            let scaleOffsetWidth = (cam.width / 2) * (cam.zoom - 1);
	            let scaleOffsetHeight = (cam.height / 2) * (cam.zoom - 1);
	            this.transform.translate(-scaleOffsetWidth, -scaleOffsetHeight);
	            this.transform.scale(cam.zoom, cam.zoom);
	        }
	
	        this.cameraXformOffset = this.transform.transformPoint();
	        
	        this.ctx.setTransform.apply(
	            this.ctx, Array.prototype.slice.call(this.transform.matrix)
	        );
	    }
	
	    /**
	     * Applies a Sprite's transforms to the Transform > context
	     * @method Scene#_applyTransforms
	     * @param {Sprite} item - The sprite
	     */
	    _applyTransforms (item) {
	        this.transform.translate(item.x, item.y);
	        this.transform.rotate(degreesToRadians(item.rotation));
	        this.transform.scale(item.sx, item.sy);
	
	        this.xformOffset = this.transform.transformPoint();
	
	        this.ctx.setTransform.apply(
	            this.ctx, Array.prototype.slice.call(this.transform.matrix)
	        );
	    }
	
	    clear (fill) {
	        let canvas = this.canvas;
	
	        if (fill) {
	            this.ctx.fillStyle = fill;
	            this.ctx.fillRect(0, 0, canvas.width, canvas.height);
	        } else {
	            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	        }
	    }
	
	    /**
	     * [startRender description]
	     * @method Scene#startRender
	     * @param {Group} group The group to render
	     */
	    startRender (group) {
	        this.ctx.save();
	        this.transform.save();
	        
	        this._applyCameraTransforms(this.camera);
	        this._applyTransforms(group.sprite);
	        
	        group.sprite.render(this.ctx);
	
	        group.collection.each((item)=> {
	            this.renderItem(item);
	        });
	
	        this.ctx.restore();
	        this.transform.restore();
	    }
	
	    /**
	     * [renderItem description]
	     * @method Scene#renderItem
	     * @param  {Sprite|Group} item The item to render
	     */
	    renderItem (item) {
	        this.ctx.save();
	        this.transform.save();
	
	        if (item.isGroup) {
	
	            this._applyTransforms(item.sprite);
	
	            if (this.options.debug) {
	                this.ctx.fillRect(-8, -1, 16, 2);
	                this.ctx.fillRect(-1, -8, 2, 16);
	            }
	
	            item.sprite.render(this.ctx);
	            
	            item.collection.each((item)=> {
	                this.renderItem(item);
	            });
	        } else {
	
	            item.parentTransforms = this.transform.transformPoint();
	            // assign parent transforms before applying sprite's transforms
	            this._applyTransforms(item);
	            item.render(this.ctx);
	        }
	
	        this.ctx.restore();
	        this.transform.restore();
	    }
	
	    /**
	     * [startUpdate description]
	     * @method Scene#startUpdate
	     * @param  {Group} group [description]
	     * @param  {Float} factor [description]
	     */
	    startUpdate (group, factor) {
	        group.collection.each((item)=> {
	            this.updateItem(item, factor);
	        });
	    }
	
	    /**
	     * [updateItem description]
	     * @method Scene#updateItem
	     * @param  {Sprite|Group} item [description]
	     * @param  {Float} factor [description]
	     */
	    updateItem (item, factor) {
	        if (item.isGroup) {
	            item.collection.each((item)=> {
	                this.updateItem(item, factor);
	            });
	        } else {
	            item.update(factor);
	        }
	    }
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	import Sprite from "../Sprite";
	
	/**
	 * @class Rectangle
	 */
	export default class Rectangle extends Sprite {
	    constructor (x, y, w, h) {
	        super(x, y, w, h);
	        
	        this.fill = "#000";
	    }
	
	    render (context) {
	        super.render(context);
	
	        context.fillStyle = this.fill;
	        context.fillRect(0, 0, this.width, this.height);
	    }
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	import { broadcast } from "./util/radio";
	
	const defaults = {
	    start: true
	};
	
	/**
	 * @class Ticker
	 * @description Executes callback based on given fps and requestAnimationFrame
	 * @author Chris Peters
	 * 
	 * @param {Object} [opts] The Ticker's options
	 * @param {Boolean} [opts.start=true] Starts timer on instantiation
	 */
	export default class Ticker {
	    constructor(screen, opts=defaults) {
	        this.screen = screen;
	        this.ticks = 0;
	        this.then = null;
	
	        this._update = this._update.bind(this);
	
	        if (opts.start) {
	            this.start();
	        }
	    }
	
	    /**
	     * dispatches events and executes callbacks
	     * @method Ticker#_update
	     */
	    _update() {
	        const now = Date.now();
	        const delta = (now - this.then) / 1000;
	
	        this.then = now;
	        this.ticks += 1;
	
	        const detail = {
	            delta,
	            ticks: this.ticks
	        };
	
	        // create and fire tick events and execute callbacks
	        this.onPreTick(delta, this.ticks);
	        broadcast(this.screen, "pretick", detail);
	
	        this.onTick(delta, this.ticks);
	        broadcast(this.screen, "tick", detail);
	
	        this.onPostTick(delta, this.ticks);
	        broadcast(this.screen, "tick", detail);
	
	        requestAnimationFrame(this._update);
	    }
	
	    /**
	     * A callback executed pre each tick.
	     *
	     * @method Ticker#onPreTick
	     * @param {Integer} delta The time elapsed between ticks
	     * @param {Integer} ticks The amount of ticks that have accumulated
	     */
	    onPreTick() {}
	
	    /**
	     * A callback executed on each tick.
	     *
	     * @method Ticker#onTick
	     * @param {Integer} delta The time elapsed between ticks
	     * @param {Integer} ticks The amount of ticks that have accumulated
	     */
	    onTick() {}
	
	    /**
	     * A callback executed post tick.
	     * @method Ticker#onPostTick
	     * @param {Integer} delta The time elapsed between ticks
	     * @param {Integer} ticks The amount of ticks that have accumulated
	     */
	    onPostTick() {}
	
	    /**
	     * Starts the ticker
	     * @method Ticker#start
	     */
	    start() {
	        this.then = Date.now();
	        requestAnimationFrame(this._update);
	    }
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* eslint-disable */
	import index from "./";
	/* eslint-enable */
	
	import { applyStyles, fitToWindow } from "./util/domHelpers";
	import { tuneIn } from "./util/radio";
	
	const defaults = {
	    fitToWindow: true
	};
	
	/**
	 * @class Viewport
	 * @requires util/domHelpers
	 * @requires util/radio
	 *
	 * @param {Integer} width The game width
	 * @param {Integer} height The game height
	 * @param {Object} options
	 * @param {HTMLElement} [options.parent=document.body] - The parent element
	 * @param {Boolean} [options.fitToWindow=true] - If true, the viewport will fill the screen while maintaining aspect ratio
	 */
	export default class Viewport {
	    constructor (width, height, options=defaults) {
	        options = Object.assign(defaults, options);
	
	        // can't set as defaults; throw errors in test env
	        if (options.window === undefined) {
	            options.window = window;
	        }
	        if (options.document === undefined) {
	            options.document = document;
	        }
	        if (options.parent === undefined) {
	            options.parent = options.document.body;
	        }
	
	        /**
	         * @member {Integer} Viewport#width - The viewport's width
	         */
	        this.width = width;
	        /**
	         * @member {Integer} Viewport#height - The viewport's height
	         */
	        this.height = height;
	        /**
	         * @member {Integer} Viewport#options - The viewport's options
	         */
	        this.options = options;
	        /**
	         * @member {HTMLElement} Viewport#canvas - The canvas element
	         */
	        this.canvas = options.document.createElement("canvas");
	        /**
	         * @member {HTMLElement} Viewport#video - The video element
	         */        
	        this.video = options.document.createElement("video");
	        /**
	         * @member {HTMLElement} Viewport#screen - The topmost element to handle UI. Events are also triggered from this element
	         */        
	        this.screen = options.document.createElement("canvas");
	
	        this.canvas.id = "canvas";
	        this.video.id = "video";
	        this.screen.id = "screen";
	
	        this.canvas.width = this.screen.width = width;
	        this.canvas.height = this.screen.height = height;
	
	        const viewportStyles = {
	            height: this.height,
	            left: 0,
	            position: "absolute",
	            top: 0,
	            width: this.width
	        };
	    
	        applyStyles(this.canvas, viewportStyles);
	        applyStyles(this.video, viewportStyles);
	        applyStyles(this.screen, viewportStyles);
	
	        options.parent.appendChild(this.canvas);
	        options.parent.appendChild(this.video);
	        options.parent.appendChild(this.screen);
	
	        if (options.fitToWindow) {
	            tuneIn(options.window, "resize", this._onResize, this);
	            tuneIn(options.window, "orientationchange", this._onResize, this);
	            this._onResize();
	        }
	    }
	
	    /**
	     * @method Viewport#_onResize
	     */
	    _onResize () {
	        const posCoords = fitToWindow(
	            this.width, this.height, this.options.window.innerWidth, this.options.window.innerHeight
	        );
	
	        applyStyles(this.canvas, posCoords);
	        applyStyles(this.video, posCoords);
	        applyStyles(this.screen, posCoords);
	    }
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map