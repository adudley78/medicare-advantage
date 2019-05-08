function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}

// get company data
// const ul = document.getElementById('companies')
const endpoint = 'https://csgapi.appspot.com/v1/medicare_advantage/open/companies.json'

fetch(endpoint, { mode: 'no-cors' })
  .then(function(response) {
    return response.json()
  })
  .then(function(myJson) {
    // console.log(JSON.stringify(myJson))
    let companies = myJson.results;
    return companies.map(function(company) {
      let li = createNode('li'),
          span = createNode('span')
      span.innerHTML = `${company.name}`;
      append(li, span);
      append(ul, li);
  })
  .catch(function(error) {
    console.log(error)
  })

// create company objects
