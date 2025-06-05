if (localStorage.getItem("shiny_leaves") == null) {
  localStorage.setItem("shiny_leaves", 0);
}

update_leaf_counter();

let is_menu_open = false;

let infos_to_load = ["leaf_collector", "gem_radiant.glb", "gem_emerald.glb", "wooden_chest", "wooden_key"];
let infos = {};

load_all_infos();

window.is_menu_open = is_menu_open;

if (localStorage.getItem("current_page") == null) {
  localStorage.setItem("current_page", 1);
}

let current_page = parseInt(localStorage.getItem("current_page"));
let pages_position = 0;

switch_button_state(get_button_by_number(current_page), true);
move_pages(current_page);

for (let i = 1; i <= 5; i++) {
  void get_page_by_number(i).offsetWidth;
  get_page_by_number(i).style.transition = "transform 1s";
}

function switch_page(page_number) {
  if (current_page != page_number) {
    let active_button = get_button_by_number(page_number);
    let previous_button = get_button_by_number(current_page);

    move_pages(page_number);

    switch_button_state(active_button, true);
    switch_button_state(previous_button, false);

    current_page = page_number;
    localStorage.setItem("current_page", current_page);
  }
}

function switch_button_state(button, is_active) {
  if (is_active) {
    button.querySelector(".edge").style.background = "grey";
    button.querySelector(".front").style.background = "#f2f2f2";
    button.querySelector(".icon").style.filter = "invert(1)";
    button.querySelector(".icon_label").style.filter = "invert(1)";
  } else {
    button.querySelector(".edge").style.background = "#5e4473";
    button.querySelector(".front").style.background = "#6a5bcd";
    button.querySelector(".icon").style.filter = "invert(0)";
    button.querySelector(".icon_label").style.filter = "invert(0)";
  }
}

function move_pages(page_number) {
  for (let i = 1; i <= 5; i++) {
    get_page_by_number(i).style.transform = `translate(${
      (page_number * -1 + i) * 100
    }%)`;
  }
}

function get_button_by_number(number) {
  let button_name = "";
  switch (number) {
    case 1:
      button_name = "home";
      break;
    case 2:
      button_name = "games";
      break;
    case 3:
      button_name = "chests";
      break;
    case 4:
      button_name = "shop";
      break;
    case 5:
      button_name = "gems";
      break;

    default:
      break;
  }

  return document.getElementById(`button_${button_name}`);
}

function get_page_by_number(number) {
  let page_name = "";
  switch (number) {
    case 1:
      page_name = "home";
      break;
    case 2:
      page_name = "games";
      break;
    case 3:
      page_name = "chests";
      break;
    case 4:
      page_name = "shop";
      break;
    case 5:
      page_name = "gems";
      break;

    default:
      break;
  }

  return document.getElementById(`${page_name}`);
}

function load_all_infos() {
  for (const info_number in infos_to_load) {
    let info_name = infos_to_load[info_number];
    console.log(`Loading: ${info_name}`);
    fetch(`infos/${info_name}.info`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        infos[info_name] = text;
      });
  }
}

function update_leaf_counter() {
  document.getElementById("leaf_counter").querySelector("h2").textContent =
    localStorage.getItem("shiny_leaves");
}

window.update_leaf_counter = update_leaf_counter;
