import { loadImage } from "./helpers/loaders.js";
import Paddle from "./logic/paddle.js";
import InputHandler from "./logic/input.js";

var config = require("./config.json");

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var images = {};
var sounds = {};
var fonts = {};

let aiPaddle;
let userPaddle;

function load() {
  // load assets
  Promise.all([
    // loadImage('backgroundImage', config.images.backgroundImage),
    // loadImage('ballImage', config.images.ballImage),
    loadImage("paddleImage", config.images.paddleImage)
    // loadImage('brickImage', config.images.brickImage),
    // loadSound('backgroundMusic', config.sounds.backgroundMusic),
    // loadSound('winSound', config.sounds.winSound),
    // loadSound('gameoverSound', config.sounds.gameoverSound),
    // loadSound('scoreSound', config.sounds.scoreSound),
    // loadSound('dieSound', config.sounds.dieSound),
    // loadFont(config.style.fontFamily)
  ]).then(assets => {
    assets.forEach(({ type, key, value }) => {
      // set images
      if (type === "image") {
        images[key] = value;
      }

      // set sounds
      if (type === "sound") {
        sounds[key] = value;
      }

      // set font
      if (type === "font") {
        fonts[key] = value;
      }
    });

    wait();
  });
}

function playSound(sound) {
  if (!sound) {
    return;
  }

  sound.currentTime = 0;
  if (!muted) {
    sound.play();
  } else {
    sound.pause();
  }
}

function wait() {
  let gameWidth = canvas.width;
  let gameHeight = canvas.height;

  ctx.clearRect(0, 0, gameWidth, gameHeight); //clear screen
  //  drawBackground();
  //  drawBricks();
  initPaddles(gameWidth, gameHeight);

  new InputHandler(canvas, userPaddle);

  draw();
}

function initPaddles(gameWidth, gameHeight) {
  userPaddle = new Paddle(images.paddleImage, gameHeight, gameWidth, false);
  aiPaddle = new Paddle(images.paddleImage, gameHeight, gameWidth, true);
}

function draw() {
  let gameWidth = canvas.width;
  let gameHeight = canvas.height;

  ctx.clearRect(0, 0, gameWidth, gameHeight);

  drawPaddles(gameWidth, gameHeight);

  requestAnimationFrame(draw);
}

function drawPaddles() {
  userPaddle.draw(ctx);
  aiPaddle.draw(ctx);
}

// load game and wait to start
load();
