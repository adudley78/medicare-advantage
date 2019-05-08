// Create class to be responsible for all API logic
class MedAdvAPI {
  constructor() {
    this.endpoint = 'https://csgapi.appspot.com/v1/medicare_advantage/open/companies.json'
  }

getCompanies() {
  fetch(this.endpoint, { mode: 'no-cors' })
  .then(response => response.json())
  .then(data => {
    data.items.forEach(company => {
      new MedAdvCompany(company.name)
    })
    MedAdvCompany.renderAll()
  })
  }
}

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
