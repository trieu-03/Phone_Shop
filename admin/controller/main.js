
const productSr = new ProductServices();
const validation = new Validation();

//! HIỂN THỊ


function showTablePro(dataArr) {
    var content = '';

    dataArr.map(function(product, index) {
        content += `
        <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>$ ${product.price.toLocaleString()}</td> 
        <td>${product.screen}</td>
        <td>${product.backCamera}</td>
        <td>${product.frontCamera}</td>
        <td>
            <img src=${product.img} 
        </td>
        <td>${product.desc}</td>
        <td>${product.type}</td> 
        <td>
        <button style="width:80px"; onclick="deletProduct('${product.id}')" class="btn btn-danger mb-3">Delete</button>

        <button style="width:80px"; data-toggle="modal" data-target="#myModal" onclick="seeProduct('${product.id}')" class="btn btn-info">Edit</button>
        </td>
        </tr>
        `
    })

    document.querySelector("#tableDanhSach").innerHTML = content;
}

function showProduct() {
    var axios = productSr.getProduct();
    axios.then(function (result) {
        showTablePro(result.data)
    })
        .catch(function (error) {
        })
}

showProduct();

//! THÊM
function addProduct() {
    var id = document.getElementById('id').value;
    var name = document.getElementById('phone_name').value;
    var price = document.getElementById('Price').value;
    var screen = document.getElementById('screen').value;
    var backCamera = document.getElementById('BackCame').value;
    var frontCamera = document.getElementById('FrCame').value;
    var img = document.getElementById('IMGlink').value;
    var desc = document.getElementById('descrip').value;
    var type = document.getElementById('SelectBrand').value;

    //TODO : Validation

    var isValid = true;

    //! name
    isValid &= validation.checkName(name,"tbPN", " This box cannot be left blank!");

    //! Price
    isValid &= validation.checkMoney(price,"tbPri", " This box cannot be left blank!");

    //! Screen
    isValid &= validation.checkScreen(screen,"tbScreen", " This box cannot be left blank!");

    //! BackCamera
    isValid &= validation.checkBackCame(backCamera,"tbBCame", " This box cannot be left blank!");

    //! FrontCamera
    isValid &= validation.checkFrontCame(frontCamera,"tbFrCame", " This box cannot be left blank!");

    //! IMG
    isValid &= validation.checkIMG(img,"tbImgLink", " This box cannot be left blank!");

    //! Desc
    isValid &= validation.checkDesc(desc,"tbdescrip", " This box cannot be left blank!");

    //! Type
    isValid &= validation.checkSelect("SelectBrand","tbSlBrand", "Please select one option!");


    if (isValid) {
        
    var product = new Product(id,name, price, screen, backCamera, frontCamera, img, desc, type);

        productSr.addProductSer(product)
        .then(function (result) {

            showProduct();
            swal({
                title: "Update Phone Success!",
                icon: "success",
                timer: 1000,    
              });

            document.querySelector('#myModal #btnClose').click();
        })
        .catch(function (error) {
            console.log(error)
        })
    }


  
}
document.getElementById('btnThem').onclick = function () {
    document.querySelector('#myModal .modal-footer').innerHTML = 
    `<button onclick='addProduct()' id="btnThemSP" type="button" class="btn btn-warning">Add Phone</button>
    <button id="btnClose" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`

    document.querySelector("#groud-form").reset();

}



//! XÓA
function deletProduct(id) {
    productSr.deletProductSer(id)
        .then(function (result) {

            showProduct();
            swal({
                title: "Update Phone Success!",
                icon: "success",
                timer: 1000,    
              });
        })
        .catch(function (error) {

        })
}

//! XEM

function seeProduct(id) {

    productSr.seeProductSer(id)
        .then(function (result) {

            document.getElementById('id').value = result.data.id;
            document.getElementById('phone_name').value = result.data.name;
            document.getElementById('Price').value = result.data.price;
            document.getElementById('screen').value = result.data.screen;
            document.getElementById('BackCame').value = result.data.backCamera;
            document.getElementById('FrCame').value = result.data.frontCamera;
            document.getElementById('IMGlink').value = result.data.img;
            document.getElementById('descrip').value = result.data.desc;
            document.getElementById('SelectBrand').value = result.data.type;

            document.querySelector('#myModal .modal-footer').innerHTML =
                `<button  class='btn btn-success' onclick='updateProduct("${result.data.id}")'>Update Product</button>
        <button id="btnClose" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`


        })
        .catch(function (error) {

        })
}


//! CẬP NHẬT

function updateProduct(id) {
    var name = document.getElementById('phone_name').value;
    var price = document.getElementById('Price').value;
    var screen = document.getElementById('screen').value;
    var backCamera = document.getElementById('BackCame').value;
    var frontCamera = document.getElementById('FrCame').value;
    var img = document.getElementById('IMGlink').value;
    var desc = document.getElementById('descrip').value;
    var type = document.getElementById('SelectBrand').value;

    var productUpdate = new Product(id,name, price, screen, backCamera, frontCamera, img, desc, type)

    productSr.updateProductSer(productUpdate,id)
        .then(function (result) {
            showProduct();
            swal({
                title: "Update Phone Success!",
                icon: "success",
                timer: 1000,    
              });

            document.querySelector('#myModal #btnClose').click();

        })
        .catch(function (error) {
            console.log(error)
        })

}

//! tìm kiếm 

document.getElementById("txtSearch").onkeyup = function () {
    var keyword = document.getElementById("txtSearch").value;
    var mangKQ = productSr.searchName(keyword);

    showTablePro(mangKQ);
}


//!TĂNG GIẢM DẦN

const ascCort = document.getElementById('SapXepTang')
const descCort = document.getElementById('SapXepGiam')


document.getElementById('SapXepTang').addEventListener('click', () => {
    ascCort.style.display = 'none';
    descCort.style.display = 'block';

    mangSP.sort((a, b) => a.price - b.price);

    showTablePro(mangSP);
})

document.getElementById('SapXepGiam').addEventListener('click', () => {
    ascCort.style.display = 'block';
    descCort.style.display = 'none';

    mangSP.sort((a, b) => b.price - a.price);

    showTablePro(mangSP);
})


