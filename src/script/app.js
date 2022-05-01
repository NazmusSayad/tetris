update__row_column();

push_new_dot();

document.addEventListener("keydown", () => {
  switch (event.key) {
    case "ArrowLeft":
      move_dot("left");
      break;
    case "ArrowRight":
      move_dot("right");
      break;
    case "ArrowDown":
      // Move down until dot reached bottom
      while (!move_dot("down")) {}
      clearTimeout(config.timeout);
      config.timeout = setTimeout(() => {
        push_new_dot();
      }, 200);
      clearInterval(config.interval);
      break;
    case "ArrowUp":
      arrow_up();
      break;
  }
});

window.addEventListener("blur", () => {
  // stop interval for blur window
  if (config.blur) {
    return;
  }
  config.timespan_blur = Date.now();
  clearInterval(config.interval);
  config.blur = true;
});

window.addEventListener("focus", () => {
  // Window get focus and start interval again
  setTimeout(() => {
    interval_move_down();
    config.interval = setInterval(interval_move_down, config.delay);
  }, config.timespan_blur - config.timespan);
});
