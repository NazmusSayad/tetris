const mainElement = {
  box_container: document.querySelector(".box-container"),
  current_elements: () => {
    return mainElement.box_container.querySelectorAll(".current");
  },
  score: document.querySelector("#score"),
  score_text: document.querySelector("#score span"),
};
