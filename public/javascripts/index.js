// Class responsible for getting and operating on a list of companies from a Medicare Advantage API
class MedAdvAPI {
  constructor() {
    this.endpoint = 'https://csgapi.appspot.com/v1/medicare_advantage/open/companies.json'
  }

getCompanies() {
  // Work around for CORS issue that inhibited response
  const proxyurl = 'https://immense-wildwood-59567.herokuapp.com/'

  // Make request to API endpoint for list of companies
  fetch(proxyurl + this.endpoint)
    // Translate response to JSON
    .then(response => response.json())
    // Iterated through the returned JSON items
    .then(data => {
      data.forEach(company => {
        // Create a new Medical Advantage company for each JSON item
        new MedAdvCompany(company.organization_name)
      })
      // Render all items to the tbody element in the DOM
        MedAdvCompany.renderAll()
      }).catch(err => console.error(err))
    }
  }

// Class responsible for represent companies
class MedAdvCompany {
  static all = []

  constructor(organization_name) {
    this.organization_name = organization_name
    if (this.organization_name != "") {
      MedAdvCompany.all.push(this)
    }
  }

  // Render each <tr> (a company) to the tobody in the DOM
  render(i) {
    let tbody = document.querySelector('tbody')
    let html = `
    <tr>
      <td>${i + 1}. ${this.organization_name}</td>
    </tr>
    `
    tbody.innerHTML += html
  }

  // Clear array before showing a new list of retrieved companies
  static clearAll() {
      MedAdvCompany.all = [];
  }

  // Render all the companies
  static renderAll() {
    let tbody = document.querySelector('tbody')
    tbody.innerHTML = ''
    MedAdvCompany.all.forEach((company, i) => {
      company.render(i)
    })
  }
}

// Filter all the companies
const list = document.querySelector('#company-list tbody')
const forms = document.forms

// Create refererence to search form
const searchBar = forms['search-companies'].querySelector('input')
// Listen for keyboard event
searchBar.addEventListener('keyup', (e) => {
  // Store user input
  const term = e.target.value.toLowerCase()
  // Store all <tr> (companies) in the list of companies
  const companies = list.getElementsByTagName('tr')
  // Iterate over a new array of companies to find names that match user search
  Array.from(companies).forEach((company) => {
    // Store text of company name
    const organization_name = company.firstElementChild.textContent
    // Get position of term within string
    if(organization_name.toLowerCase().indexOf(e.target.value) != -1){
      company.style.display = 'block'
    } else {
      company.style.display = 'none'
    }
  })
})

// Instantiate a new instance of MedAdvAPI upon page load
window.addEventListener("load", function() {
  new MedAdvAPI().getCompanies()

})
