import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let games_scenes = [
  {
    name: "leaf_collector",
    type: "game",
    cost: 0,
    model: "tree.glb",
  },
];

let shop_items = [
  {
    name: "wooden_key",
    type: "shop_item",
    cost: 100,
    model: "wooden_key1.glb",
  },
];

let chests = [
  {
    name: "wooden_chest",
    type: "chest",
    model: "wooden_chest1.glb",
  },
];

let gems = [];

let gems_models = [
  "gem_emerald.glb",
  "gem_ruby.glb",
  "gem_kite.glb",
  "gem_trilliant.glb",
  "gem_radiant.glb",
  "gem_diamond.glb",
  "gem_sphere1.glb",
  "gem_sphere2.glb",
];

for (let i = 0; i < 100; i++) {
  let gem = {
    name: `gem ${i}`,
    type: "gem",
    // model: "",
    // colors: ["black", "white", "white", "black"],
  };

  let colors = [];

  for (let col = 0; col < 4; col++) {
    colors[col] = get_random_color();
  }

  gem.colors = colors;

  gem.model = gems_models[Math.floor(Math.random() * gems_models.length)]

  gems[i] = gem;
}

let models_to_load = [
  "tree.glb",
  "wooden_key1.glb",
  "wooden_chest1.glb",
  "gem_emerald.glb",
  "gem_ruby.glb",
  "gem_kite.glb",
  "gem_trilliant.glb",
  "gem_radiant.glb",
  "gem_diamond.glb",
  "gem_sphere1.glb",
  "gem_sphere2.glb",
];

let models = {};

const geometries = [
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.SphereGeometry(0.5, 12, 8),
  new THREE.DodecahedronGeometry(0.5),
  new THREE.CylinderGeometry(0.5, 0.5, 1, 12),
];

let canvas = document.getElementById("three_js_canvas");

let renderer;

let scenes_to_render = [];
let game_cards = [];

window.scenes_to_render = scenes_to_render;

let cards = games_scenes.concat(shop_items).concat(chests).concat(gems);

const manager = new THREE.LoadingManager();
manager.onLoad = function () {
  console.log("loaded");
  add_cards();
};

const loader = new GLTFLoader(manager).setPath("res/3D/");

load_all_models();

function add_cards() {
  for (const card_number in cards) {
    let card = cards[card_number];
    add_card(card);
  }
}

function add_card(card) {
  const scene = new THREE.Scene();

  let card_div = document.createElement("div");
  card_div.className = "card";

  let label_holder = document.createElement("div");

  let label = document.createElement("h1");
  label.textContent = card.name.replaceAll("_", " ");
  label.style.color = "white";
  label.style.textAlign = "center";
  label.style.background = "#80808029";
  label.style.padding = "10px";
  label.style.borderRadius = "5px";
  label.style.maxWidth = "150px";

  label_holder.appendChild(label);
  label_holder.style.display = "flex";
  label_holder.style.alignItems = "center";

  let render_region = document.createElement("div");
  render_region.style.height = "200px";
  render_region.style.width = "200px";
  render_region.style.background = "#5fabffb0";
  render_region.style.borderRadius = "12px";
  render_region.style.padding = "2px";

  let play_button, cost_label, info_button, buy_button, open_button;

  info_button = document.createElement("div");
  info_button.innerHTML =
    '<svg viewBox="0 0 24 24" length="50" width="50"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#1C274C"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>';

  info_button.style.width = "50px";
  info_button.style.height = "50px";
  info_button.style.background = "white";
  info_button.style.borderRadius = "100px";
  info_button.style.marginLeft = "10px";
  info_button.style.cursor = "pointer";

  label_holder.appendChild(info_button);

  info_button.addEventListener("click", function () {
    show_info(card);
  });

  if (card.type == "game") {
    play_button = document.createElement("button");
    let play_button_shadow = document.createElement("span");
    let play_button_edge = document.createElement("span");
    let play_button_front = document.createElement("span");
    let play_button_icon = document.createElement("span");
    let play_button_text = document.createElement("h1");

    play_button.className = "pushable";
    play_button_shadow.className = "shadow";
    play_button_edge.className = "edge";
    play_button_front.className = "front";

    play_button_front.style.background = "orange";
    play_button_front.style.display = "flex";
    play_button_front.style.flexDirection = "row";
    play_button_front.style.alignItems = "center";
    play_button_edge.style.background = "#7d6d22";

    play_button_text.textContent = "PLAY";
    play_button_icon.innerHTML =
      '<svg viewBox="0 0 24 24" length="50" width="50"  fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"></path> </g></svg>';

    play_button.appendChild(play_button_shadow);
    play_button.appendChild(play_button_edge);
    play_button.appendChild(play_button_front);
    play_button_front.appendChild(play_button_icon);
    play_button_front.appendChild(play_button_text);

    play_button.addEventListener("click", function () {
      launch_game(card.name);
    });
  } else if (card.type == "shop_item") {
    cost_label = document.getElementById("leaf_counter").cloneNode(true);
    cost_label.removeAttribute("id");
    cost_label.querySelector("h2").textContent = card.cost;

    buy_button = document.createElement("button");
    let buy_button_shadow = document.createElement("span");
    let buy_button_edge = document.createElement("span");
    let buy_button_front = document.createElement("span");
    let buy_button_text = document.createElement("h1");

    buy_button.className = "pushable";
    buy_button_shadow.className = "shadow";
    buy_button_edge.className = "edge";
    buy_button_front.className = "front";

    buy_button_front.style.background = "orange";
    buy_button_edge.style.background = "#7d6d22";
    buy_button_text.textContent = "BUY";
    buy_button_text.style.margin = "0px";
    buy_button.style.marginTop = "30px";

    buy_button.appendChild(buy_button_shadow);
    buy_button.appendChild(buy_button_edge);
    buy_button.appendChild(buy_button_front);
    buy_button_front.appendChild(buy_button_text);

    buy_button.addEventListener("click", function () {
      alert("Not implemented");
    });
  } else if (card.type == "chest") {
    open_button = document.createElement("button");
    let open_button_shadow = document.createElement("span");
    let open_button_edge = document.createElement("span");
    let open_button_front = document.createElement("span");
    let open_button_text = document.createElement("h1");

    open_button.className = "pushable";
    open_button_shadow.className = "shadow";
    open_button_edge.className = "edge";
    open_button_front.className = "front";

    open_button_front.style.background = "orange";
    open_button_edge.style.background = "#7d6d22";
    open_button_text.textContent = "OPEN";
    open_button_text.style.margin = "0px";
    open_button.style.marginTop = "30px";

    open_button.appendChild(open_button_shadow);
    open_button.appendChild(open_button_edge);
    open_button.appendChild(open_button_front);
    open_button_front.appendChild(open_button_text);

    open_button.addEventListener("click", function () {
      alert("Not implemented");
    });
  }

  set_up_scene(scene, render_region, card.model);

  const model_clone = models[card.model].clone();

  if (card.model.startsWith("gem")) {
    let outline_model = model_clone.clone();

    let geometry = model_clone.children[0].geometry;

    var material = new THREE.ShaderMaterial({
      uniforms: {
        color1: {
          value: new THREE.Color(card.colors[0]),
        },
        color2: {
          value: new THREE.Color(card.colors[1]),
        },
        color3: {
          value: new THREE.Color(card.colors[2]),
        },
        color4: {
          value: new THREE.Color(card.colors[3]),
        },
        bboxMin: {
          value: geometry.boundingBox.min,
        },
        bboxMax: {
          value: geometry.boundingBox.max,
        },
      },
      vertexShader: `
    uniform vec3 bboxMin;
    uniform vec3 bboxMax;
  
    varying vec2 vUv;

    void main() {
      vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
      fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    uniform vec3 color4;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(mix(color1, color2, vUv.y), mix(color3, color4, vUv.y), vUv.y), 1.0);
    }
  `,
    });

    model_clone.children[0].material = material;

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    line.scale.set(1.01, 1.01, 1.01);
    model_clone.add(line);
  }

  scene.add(model_clone);

  const geometry = geometries[(geometries.length * Math.random()) | 0];

  card_div.appendChild(render_region);
  card_div.appendChild(label_holder);
  if (card.type == "game") {
    card_div.appendChild(play_button);
    game_cards.push(card_div);
  } else if (card.type == "shop_item") {
    card_div.appendChild(cost_label);
    card_div.appendChild(buy_button);
  } else if (card.type == "chest") {
    card_div.appendChild(open_button);
  }
  get_cards_holder_by_card_type(card.type).appendChild(card_div);
}

function set_up_scene(scene, render_region, model) {
  scene.userData.element = render_region;

  const camera = new THREE.PerspectiveCamera(50, 1, 1, 100);

  scene.userData.camera = camera;

  const controls = new OrbitControls(
    scene.userData.camera,
    scene.userData.element
  );

  switch (model) {
    case "tree.glb":
      camera.position.set(0, 3, 10);
      controls.target.set(0, 2, 0);
      break;
    case "wooden_key1.glb":
      camera.position.set(0, 0, 11);
      controls.target.set(0, 0, 0);
      break;
    case "wooden_chest1.glb":
      camera.position.set(0, 3, 7);
      controls.target.set(0, 0, 0);
      break;

    default:
      if (model.startsWith("gem")) {
        camera.position.set(0, 0, 3);
        controls.target.set(0, 0, 0);
      }
      break;
  }

  controls.update();

  controls.minDistance = 1.5;
  controls.maxDistance = 50;
  controls.enablePan = true;
  controls.enableZoom = true;
  scene.userData.controls = controls;

  scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444, 3));

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(200, 180, 100); //default; light shining from top
  light.castShadow = true; // default false

  const SHADOW_MAP_WIDTH = 4048,
    SHADOW_MAP_HEIGHT = 2024;

  light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
  light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

  scene.add(light);

  scenes_to_render.push(scene);
}

function load_all_models() {
  for (const model_number in models_to_load) {
    let model_to_load = models_to_load[model_number];

    loader.load(model_to_load, function (gltf) {
      models[model_to_load] = fix_model(gltf.scene);
      // models[model_to_load] = gltf.scene;
    });
  }
}

function get_cards_holder_by_card_type(type) {
  switch (type) {
    case "game":
      return document.getElementById("games_holder");
    case "shop_item":
      return document.getElementById("items_holder");
    case "chest":
      return document.getElementById("chests_holder");
    case "gem":
      return document.getElementById("gems_holder");
    default:
      console.log(`ERROR: item type not found: ${type}`);
      break;
  }
}

renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(animate);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

function updateSize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
  }
}

function animate() {
  updateSize();

  //   canvas.style.transform = `translateY(${window.scrollY}px)`;

  renderer.setClearColor(0x000000, 0);
  renderer.setScissorTest(false);
  renderer.clear();
  renderer.setScissorTest(true);

  scenes_to_render.forEach(function (scene) {
    // so something moves
    if (scene.children.length >= 3) {
      scene.children[2].rotation.y = Date.now() * 0.001;
    }

    // get the element that is a place holder for where we want to
    // draw the scene
    const element = scene.userData.element;

    // get its position relative to the page's viewport
    const rect = element.getBoundingClientRect();

    // check if it's offscreen. If so skip it
    if (
      rect.bottom < 0 ||
      rect.top > renderer.domElement.clientHeight ||
      rect.right < 0 ||
      rect.left > renderer.domElement.clientWidth
    ) {
      // console.log("off")
      return; // it's off screen
    }

    // set the viewport
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    const left = rect.left;
    const bottom = renderer.domElement.clientHeight - rect.bottom;

    renderer.setViewport(left, bottom, width, height);
    renderer.setScissor(left, bottom, width, height);

    let camera = scene.userData.camera;

    // camera.aspect = width/height;

    // camera.aspect = width / height; // not changing in this example
    // camera.updateProjectionMatrix();

    //scene.userData.controls.update();

    renderer.render(scene, camera);
  });
}

function launch_game(game_name) {
  switch_all_play_buttons(false);
  document.getElementById("viewer").src = "games/leaf_collector.html";
  // document.getElementById("viewer").src = "https://threejs.org/examples/games_fps.html"
  document.getElementById("background").style.transform = "scaleY(0)";

  setTimeout(function () {
    document.getElementById("viewer").style.transform = "scaleY(1)";
  }, 1000);
}

function close_game(restart) {
  switch_all_play_buttons(true);
  if (restart) {
    document.getElementById("viewer").contentWindow.location.reload();
  } else {
    document.getElementById("viewer").style.transform = "scaleY(0)";
    document.getElementById("background").style.transform = "scaleY(1)";
    setTimeout(function () {
      document.getElementById("viewer").src = "about:blank";
    }, 1000);
  }
}

function show_info(card) {

  let info_div = document.getElementById("info").querySelector("div");

  document.getElementById("info").querySelector("h1").textContent = card.name.replaceAll("_", " ");
  if (card.type == "gem"){
    let colors_label = document.createElement("h2");
    colors_label.textContent = "Colors:";
    let colors_list = document.createElement("ol");

    for (let color_number = 3; color_number >= 0; color_number--) {
      let li = document.createElement("li");
      let color_div = document.createElement("div");

      let hex_color = card.colors[color_number];
      let color = hexToRgb(hex_color);
      li.textContent = `Red: ${color.r}, Green: ${color.g}, Blue: ${color.b}`

      color_div.style.width = "20px";
      color_div.style.height = "20px";
      color_div.style.background = hex_color;
      color_div.style.border = "1px solid black";

      colors_list.appendChild(li);
      li.appendChild(color_div);
    }

    if (infos.hasOwnProperty(card.model)){
      info_div.innerHTML = infos[card.model];
    } else {
      info_div.innerHTML = "";
    }
    info_div.prepend(colors_list);
    info_div.prepend(colors_label);
    
  } else {
    info_div.innerHTML = infos[card.name];
  }

  document.getElementById("info_holder").style.transform = "translateY(0px)";
}

function close_info() {
  document.getElementById("info_holder").style.transform = "translateY(-200%)";
}

function switch_all_play_buttons(state) {
  for (const game_card_number in game_cards) {
    let game_card = game_cards[game_card_number];
    switch_play_button_state(game_card.querySelector(".pushable"), state);
  }
}

window.close_game = close_game;
window.close_info = close_info;

function switch_play_button_state(button, is_active) {
  if (is_active) {
    button.querySelector(".edge").style.background = "rgb(125, 109, 34)";
    button.querySelector(".front").style.background = "orange";
    button.disabled = false;
  } else {
    button.querySelector(".edge").style.background = "rgb(97 97 97)";
    button.querySelector(".front").style.background = "#9b9b9b";
    button.disabled = true;
  }
}

function fix_model(model) {
  for (let obj_number in model.children) {
    let obj = model.children[obj_number];

    let mesh;

    if (obj.type == "Mesh") {
      mesh = obj;
    } else if (obj.type == "Group") {
      mesh = obj.children[0];
    } else {
      continue;
    }
    if (mesh.material.map !== null) {
      const targetMaterial = new THREE.MeshPhongMaterial({
        map: mesh.material.map,
      });
      targetMaterial.map.needsUpdate = true;
      mesh.material = targetMaterial;
    } else {
      mesh.material = new THREE.MeshPhongMaterial({
        color: mesh.material.color,
      });
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }

  return model;
}

function get_random_color() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}