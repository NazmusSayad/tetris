const update__row_column = () => {
  mainElement.box_container.querySelectorAll("div").forEach((element, ind, arr) => {
    // Update row number
    const row = Math.ceil((ind + 1) / config.column_count);
    element.setAttribute("row", row);

    // Update column number
    const column = ind + 1 - config.column_count * (row - 1);
    element.setAttribute("column", column);
  });
};
const get_item = (row, column) => {
  // Get any item using row & clumn number
  return mainElement.box_container.querySelector(`[row="${row}"][column="${column}"]`);
};
const push_new_dot = (name) => {
  name = Object.keys(config.dots)[Math.floor(Math.random() * 7)];
  config.current_dotName = name;
  config.current_dotPosition = 0;
  const item = config.dots[name][0]; // Get current dot cords
  let gap;
  switch (name) {
    case "cyan":
      gap = 5;
      break;
    case "red":
      gap = 6;
      break;
    case "orange":
      gap = 4;
      break;
    case "blue":
      gap = 4;
      break;
    case "green":
      gap = 4;
      break;
    case "yellow":
      gap = 4;
      break;
    case "violet":
      gap = 4;
      break;
    default:
      return;
      break;
  } // Manage default gap
  const new_elements = [];
  item.forEach((element, ind, arr) => {
    // Get new dot e
    const new_item = get_item(element.row, element.column + gap);
    new_elements.push(new_item);
  });

  let game_end;
  new_elements.forEach((element, ind, arr) => {
    if (element.className) {
      // Check if new element already has a dot
      game_end = true;
    }
  });

  if (game_end) {
    return; // Game end
  }

  {
    for (let i = 2; i <= config.row_count; i++) {
      const elements = mainElement.box_container.querySelectorAll(`[row="${i}"]`); // All the elements of a row.

      const array = [];
      elements.forEach((element) => {
        if (element.className) {
          // row element has a dot
          array.push(true);
        } else {
          array.push(false);
        }
      });

      // If row is full of dots.
      if (!array.includes(false)) {
        elements.forEach((element) => {
          element.remove();
        });

        // prepend elements of the empty row
        for (let i = 1; i <= config.column_count; i++) {
          const element = document.createElement("div");
          mainElement.box_container.prepend(element);
        }

        update__row_column();
        // re-name all rows & columns ----- score +
        mainElement.score_text.innerHTML = Number(mainElement.score_text.innerHTML) + 1;
      }
    }
  }
  mainElement.current_elements().forEach((element, ind, arr) => {
    // remove old current items
    element.classList.remove("current");
  });
  new_elements.forEach((element, ind, arr) => {
    // add dot to new elements & add current class
    element.classList.add(name);
    element.classList.add("current");
  });
  config.interval = setInterval(interval_move_down, config.delay);
};

const move_dot = (param) => {
  const current_elements = mainElement.current_elements();
  const next_elements = [];
  let perfect = true;

  // get current elements
  current_elements.forEach((element, ind, arr) => {
    let row = Number(element.getAttribute("row"));
    let column = Number(element.getAttribute("column"));

    // Works Configs
    switch (param) {
      case "down":
        row++;
        break;
      case "right":
        column++;
        break;
      case "left":
        column--;
        break;
    }

    const next_element = get_item(row, column); // new element

    if (next_element) {
      if (next_element.className && !next_element.classList.contains("current")) {
        // check id next element already filled but not with current dot
        perfect = false;
      }
    } else {
      perfect = false;
    }
    next_elements.push(next_element);
  });

  if (perfect) {
    // remove dot & current class from previous element
    current_elements.forEach((element, ind, arr) => {
      element.className = "";
    });

    // add classnames to new element
    next_elements.forEach((element, ind, arr) => {
      element.classList.add(config.current_dotName);
      element.classList.add("current");
    });
  } else if (param === "down") {
    return true; // to manage push_new_dot()
  }
};

const arrow_up = () => {
  const current_elements = mainElement.current_elements();
  const next_elements = [];
  let perfect = true;

  // dot angle position
  if (config.current_dotPosition > 2) {
    config.current_dotPosition = -1;
  }
  const dot_position = config.current_dotPosition + 1;

  // Get start row and column
  let lowest_row = [];
  let lowest_column = [];
  current_elements.forEach((element, ind, arr) => {
    let column = Number(element.getAttribute("column"));
    let row = Number(element.getAttribute("row"));
    lowest_row.push(row);
    lowest_column.push(column);
  });
  lowest_row = Math.min(...lowest_row);
  lowest_column = Math.min(...lowest_column);

  // dot position update configs
  switch (config.current_dotName) {
    case "cyan":
      {
        switch (dot_position) {
          case 0:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 1:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 2:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 3:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
        }
      }
      break;
    case "red":
      {
        switch (dot_position) {
          case 0:
            lowest_row -= 1;
            lowest_column;
            break;
          case 1:
            lowest_row -= 1;
            lowest_column -= 2;
            break;
          case 2:
            lowest_row -= 1;
            lowest_column;
            break;
          case 3:
            lowest_row -= 1;
            lowest_column -= 2;
            break;
        }
      }
      break;
    case "orange":
      {
        switch (dot_position) {
          case 0:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 1:
            lowest_row -= 1;
            lowest_column;
            break;
          case 2:
            lowest_row;
            lowest_column -= 2;
            break;
          case 3:
            lowest_row -= 2;
            lowest_column -= 1;
            break;
        }
      }
      break;
    case "blue":
      {
        switch (dot_position) {
          case 0:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 1:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 2:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 3:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
        }
      }
      break;
    case "green":
      {
        switch (dot_position) {
          case 0:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 1:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 2:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 3:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
        }
      }
      break;
    case "yellow":
      {
        switch (dot_position) {
          case 0:
            lowest_row -= 1;
            lowest_column -= 2;
            break;
          case 1:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 2:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 3:
            lowest_row -= 1;
            lowest_column -= 0;
            break;
        }
      }
      break;
    case "violet":
      {
        switch (dot_position) {
          case 0:
            lowest_row -= 1;
            lowest_column -= 2;
            break;
          case 1:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 2:
            lowest_row -= 1;
            lowest_column -= 1;
            break;
          case 3:
            lowest_row -= 1;
            lowest_column -= 0;
            break;
        }
      }
      break;
  }

  current_elements.forEach((element, ind, arr) => {
    let row = Number(element.getAttribute("row"));
    let column = Number(element.getAttribute("column"));

    // new position config for current dot
    let new_data = config.dots[config.current_dotName][dot_position][ind];
    let a = new_data.row + lowest_row;
    let b = new_data.column + lowest_column;

    //get new items
    const next_element = get_item(a, b);
    next_elements.push(next_element);

    if (next_element) {
      if (next_element.className && !next_element.classList.contains("current")) {
        // check id next element already filled but not with current dot
        perfect = false;
      }
    } else {
      perfect = false;
    }
  });

  if (perfect) {
    // dot angle position  update
    config.current_dotPosition += 1;

    // reset olds dot classnames
    current_elements.forEach((element, ind, arr) => {
      element.className = "";
    });

    // add class names to new dots
    next_elements.forEach((element, ind, arr) => {
      element.classList.add(config.current_dotName);
      element.classList.add("current");
    });
  }
};

const interval_move_down = () => {
  config.timespan = Date.now();
  config.blur = false;
  if (move_dot("down")) {
    // If dot reached bottom
    clearInterval(config.interval);
    push_new_dot();
  }
};
