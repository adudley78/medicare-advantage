// Create class to be responsible for all API logic
class MedAdvAPI {
  constructor() {
    this.endpoint = 'https://csgapi.appspot.com/v1/medicare_advantage/open/companies.json'
  }

getCompanies(query) {
  fetch(this.endpoint, { mode: 'no-cors' })
  .then(response => response.json())
  .then(data => {
    data.items.forEach(company => {
      new MedAdvCompany(company.name)
    })
    MedAdvCompany.renderAll()
})

// Create class to represent one company
class MedAdvCompany {
  static all = []

  constructor(name) {
    this.name
    MedAdvCompany.all.push(this)
  }

render(i) {
  let tbody = document.querySelector('tbody')
  let html = `
  <tr>
  <td>${i + 1}. ${this.name}</td>
  </tr>
  `
  tbody.innerHTML += html
}

static clearAll() {
    MedAdvCompany.all = [];
  }

static renderAll() {
  let tbody = document.querySelector('tbody')
  tbody.innerHTML = ''
  MedAdvCompany.all.forEach((company, i) => {
    company.reder(i)
  })
 }
}

function searchMedAdvAPI(e) {
  // prevent link from sending us to a refresh
  e.preventDefault();
  // find query value
  let query = document.querySelector('#query').value
  // delete all searched repositories
  MedAdvCompany.clearAll();
  // create a new github api instance
  let medadvAPI = new MedAdvAPI();
  // call the search repos instance passing in our query
  medadvAPI.getCompanies(query);
}

window.addEventListener('load', function(){
  // add the searchGithub function as a listener for a submit of the form
  document.querySelector('form').addEventListener("submit", searchMedAdvAPI)
})
