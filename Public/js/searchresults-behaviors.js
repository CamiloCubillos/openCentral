const ocSorting = new OpenCentralSorting();
let ocPages;

function firstRender(data, searchKey) {
  ocPages = new OCPageCollection(data);
  let totalResults = ocPages.items.size();
  let totalPages = ocPages.pages.size();
  let items = ocPages.currentPage;
  let currentPageIndex = ocPages.index + 1;
  renderResultCards(
    items,
    totalResults,
    totalPages,
    currentPageIndex,
    searchKey
  );
  setPageControllListeners();
}

function render(searchKey) {
  console.log(ocPages);
  let totalResults = ocPages.items.size();
  let totalPages = ocPages.pages.size();
  let items = ocPages.currentPage;
  let currentPageIndex = ocPages.index + 1;
  renderResultCards(
    items,
    totalResults,
    totalPages,
    currentPageIndex,
    searchKey
  );
  setPageControllListeners();
}

function renderResultCards(
  data,
  totalResults,
  totalPages,
  currentPageIndex,
  key
) {
  console.log("results: " + totalResults);
  console.log("pages: " + totalPages);
  console.log("index " + currentPageIndex);
  let resultsSection = document.querySelector("#results-section");
  resultsSection.innerHTML = "";

  resultsSection.innerHTML = `<span class="text-primary fw-bold fs-3 mt-4">Resultados para <span class="fst-italic">${key}</span>: ${totalResults}</span>
                              <span class="text-primary fw-bold fs-5 border-bottom border-2 border-dark mb-4">Mostrando pagina ${currentPageIndex} de ${totalPages}
                              </span> 
                              <div class="d-flex flex-row justify-content-around">
                                <button id="btn_prevPage" class="btn btn-primary w-25 fs-3 d-inline ${
                                  currentPageIndex == 1 ? "disabled" : ""
                                }"><</button>
                                <button id="btn_nextPage" class="btn btn-primary w-25 fs-3 d-inline ${
                                  totalPages == currentPageIndex
                                    ? "disabled"
                                    : ""
                                }">></button>
                              </div>`;

  for (let i = 0; i < data.length; i++) {
    let resultCard = ` <div class="result-card col-12 d-flex flex-row  my-3 bg-light border-bottom border-5 border-dark shadow">
                        <div class="col-4">
                          <img src="img/test-icon.png" class="result-card__icon p-2">
                        </div>
                        <div class="col-8 d-flex flex-column justify-content-between p-4">
                          <div class="result-card__authordata d-flex flex-column h-25">
                            <span class="fw-bold fs-4">${
                              data[i].nombre.charAt(0).toUpperCase() +
                              data[i].nombre.slice(1) +
                              " " +
                              data[i].id
                            }</span>
                            <span class="fst-italic fw-light border-bottom border-dark pb-2">${
                              data[i].autor
                            }</span>
                          </div>
                          <div class="result-card__description d-flex h-50 mt-4">
                            <span class="">${data[i].descripcion}</span>
                          </div>
                          <div class="btn-section col-12 d-flex justify-content-end h-25">
                            <button class="btn btn-primary">View project</button>
                          </div>
                        </div>
                      </div>`;

    resultsSection.innerHTML = resultsSection.innerHTML + resultCard;
  }
}

function search(searchKey) {
  // Retrieve data from the database

  fetch("/getApps", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ keywords: searchKey }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let dataSortedByRelevance = ocSorting.sortByRelevance(data, searchKey);
      let dataList = new OCList(dataSortedByRelevance);
      firstRender(dataList, searchKey);
    })
    .catch(function (error) {
      throw error;
    });
}

function setListeners() {
  let searchFormInput = document.querySelector("#searchForm__input");
  let searchFormButton = document.querySelector("#searchForm__button");

  searchFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    search(searchFormInput.value);
  });
}

function setPageControllListeners() {
  let btn_prevPage = document.querySelector("#btn_prevPage");
  let btn_nextPage = document.querySelector("#btn_nextPage");

  btn_prevPage.addEventListener("click", (e) => {
    e.preventDefault();
    ocPages.prev();
    render();
  });

  btn_nextPage.addEventListener("click", (e) => {
    e.preventDefault();
    ocPages.next();
    render();
  });
}

function main() {
  setListeners();
}

main();
