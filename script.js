const url = "https://jsonplaceholder.typicode.com";
const list = document.getElementById("list");
const paginationContainer = document.createElement("div");

const fetchData = async () => {
  const res = await fetch(`${url}/photos?_page=4`);
  const data = await res.json();
  console.log(data);
  return data;
};

fetchData().then((data) => {
  renderData(data);
  renderPagination();
});

function renderData(data) {
  data.forEach((obj) => {
    let parentBox = document.createElement("div");
    parentBox.classList.add("parent");
    const image = document.createElement("img");
    image.classList.add("image");
    const text = document.createElement("span");
    text.classList.add("text");

    image.src = obj.thumbnailUrl;
    text.innerText = obj.title;

    parentBox.onclick = () => {
      parentBox.style.transition = "all .3s linear";
      parentBox.style.transform = "scale(1.4)";
      parentBox.style.boxShadow = "0 0 15px 25px rgba(0, 0, 0, 0.3)";
      image.src = obj.url;
      image.style.maxWidth = "150px";
    };

    parentBox.onmouseleave = () => {
      parentBox.style.transition = "all .3s linear";
      parentBox.style.transform = "scale(1.0)";
      image.src = obj.thumbnailUrl;
    };

    parentBox.append(image, text);
    list.appendChild(parentBox);
  });
}

function renderPagination() {
  for (let i = 1; i <= 10; i++) {
    const pagination = document.getElementById("pagination");
    const pageLink = document.createElement("a");
    pageLink.textContent = i;
    pageLink.addEventListener("click", async () => {
      const res = await fetch(`${url}/photos?_page=${i}`);
      const data = await res.json();
      console.log(data);
      pageLink.href = data;
      return data;
    });
    paginationContainer.appendChild(pageLink);
    pagination.appendChild(paginationContainer);
    document.body.appendChild(pagination);
  }

  return paginationContainer;
}
