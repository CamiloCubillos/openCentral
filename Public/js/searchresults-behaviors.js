const ocSorting = new OpenCentralSorting();

function createResultCards(data) {
  let resultsSection = document.querySelector("#results-section");
  resultsSection.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let resultCard = `<div class="result-card col-12 d-flex flex-row  my-3 bg-light border-bottom border-5 border-dark shadow">
    <div class="col-4">
         <img src="img/test-icon.png" class="result-card__icon p-2">
     </div>
     <div class="col-8 d-flex flex-column justify-content-between p-4">
         <div class="result-card__authordata d-flex flex-column h-25">
             <span class="fw-bold fs-4">${
               data[i].nombre.charAt(0).toUpperCase() + data[i].nombre.slice(1)
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
      createResultCards(dataSortedByRelevance);
    })
    .catch(function (error) {
      throw error;
    });
}

let searchFormInput = document.querySelector("#searchForm__input");
let searchFormButton = document.querySelector("#searchForm__button");

searchFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  search(searchFormInput.value);
});
