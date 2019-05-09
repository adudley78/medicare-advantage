class MedAdvAPI {
  constructor() {
    this.endpoint = 'https://csgapi.appspot.com/v1/medicare_advantage/open/companies.json'
  }

getCompanies() {

  const proxyurl = 'https://immense-wildwood-59567.herokuapp.com/'

  fetch(proxyurl + this.endpoint)
    // method: 'GET',
    // headers: "Access-Control-Allow-Origin: *"
    // mode: 'no-cors'
    // cache: 'default',
    // body: JSON.stringify(data)
    // })
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => {
      data.forEach(company => {
        new MedAdvCompany(company.organization_name)
      })
        MedAdvCompany.renderAll()
      }).catch(err => console.error(err))
    }
  }

class MedAdvCompany {
  static all = []

  constructor(organization_name) {
    this.organization_name = organization_name
    MedAdvCompany.all.push(this)
  }

render(i) {
  let tbody = document.querySelector('tbody')
  let html = `
  <tr>
  <td>${i + 1}. ${this.organization_name}</td>
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
    company.render(i)
  })
 }
}

window.addEventListener("load", function() {
  new MedAdvAPI().getCompanies()
})
