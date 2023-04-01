

function ProductServices() {

    this.mangSP = []; 

fetch('https://640802678ee73db92e364443.mockapi.io/Cyber_Phone')
  .then(response => response.json()) 
  .then(json => {

    mangSP = json;
  })
  .catch(error => console.error(error));

 

    this.getProduct = function () {
        // https://640802678ee73db92e364443.mockapi.io/Cyber_Phone

        return axios({
            method: 'get',
            url: 'https://640802678ee73db92e364443.mockapi.io/Cyber_Phone',
        })

    }


    this.addProductSer = function (product) {
        return axios({
            method: 'post',
            url: 'https://640802678ee73db92e364443.mockapi.io/Cyber_Phone',
            data: product,
        })

    }



    this.deletProductSer = function (id) {
        return axios({
            method: 'delete',
            url: `https://640802678ee73db92e364443.mockapi.io/Cyber_Phone/${id}`,
        })

    }

    this.seeProductSer = function (id) {
        return axios({
            method: 'get',
            url: `https://640802678ee73db92e364443.mockapi.io/Cyber_Phone/${id}`,
        })

    }

    this.updateProductSer = function (productUpdate, id) {
        return axios({
            method: 'put',
            url: `https://640802678ee73db92e364443.mockapi.io/Cyber_Phone/${id}`,
            data: productUpdate
        })
    }


}


ProductServices.prototype.searchName = function (keyword) {

    var mangKQ = [];

var keywordLowerCase = keyword.toLowerCase();

keywordLowerCase = keywordLowerCase.replace(/\s/g, "")

mangSP.map(function (sp) {
 var nameLowerCase = sp.name.toLowerCase().replace(/\s/g, "");    

 if (nameLowerCase.indexOf(keywordLowerCase) > -1) {
    mangKQ.push(sp);
 }

});
return mangKQ;

}
