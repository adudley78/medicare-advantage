fetch('https://csgapi.appspot.com/v1/medicare_advantage/open/companies.json', { mode: 'no-cors' })
  .then(function(response) {
    return response.json()
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson))
  })
