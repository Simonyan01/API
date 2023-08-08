const url = "https://jsonplaceholder.typicode.com";
const list = document.getElementById("list");
const pagination = document.getElementById("pagination");
const modal = document.getElementById("modal");

// const request = async (page) => {
//   const res = await fetch(`${url}/photos?_page=${page}`);
//   const data = await res.json();
//   return data;
// };

const request = (page) => {
  fetch(`${url}/photos?_page=${page}`)
    .then((res) => res.json())
    .then((data) => renderData(data));
};

request(1);

const openModal = (src) => {
  modal.innerHTML = "";
  const img = document.createElement("img");
  img.src = src;
  modal.style.display = "flex";
  modal.append(img);

  img.onclick = (e) => e.stopPropagation();
};

modal.onclick = () => {
  modal.style.display = "none";
};

const renderData = (data) => {
  list.innerHTML = "";
  data.forEach((obj) => {
    const parentBox = document.createElement("div");
    parentBox.classList.add("parent");

    const image = document.createElement("img");
    image.classList.add("image");
    image.src = obj.thumbnailUrl;

    const text = document.createElement("span");
    text.classList.add("text");
    text.innerText = obj.title;

    image.onclick = () => openModal(obj.url);

    parentBox.append(image, text);
    list.append(parentBox);
  });
};

for (let i = 1; i <= 10; i++) {
  const label = document.createElement("label");
  const input = document.createElement("input");

  if (i === 1) {
    input.checked = true;
  }
  input.type = "radio";
  input.name = "pagination_item";

  const pageLink = document.createElement("div");
  pageLink.onclick = () => request(i);

  label.append(input, pageLink);
  pageLink.innerText = i;
  pagination.append(label);
}
