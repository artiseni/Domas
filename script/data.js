
const submit = document.getElementById('btnSubmit')
const data = document.getElementsByClassName('data')
const gender = document.getElementsByClassName('gender')
const civil = document.getElementsByClassName('civil')

let gen = 'gen', civ = 'civ'
let path = window.location.pathname;
let page = path.split("/").pop();
page = page.replace('.html', '')
let uri = 'http://localhost:3000/' + page
// console.log(uri)// console.log(page)


for (let i = 0; i < gender.length; i++) {
    checked(gender, gen, i)
    checked(civil, civ, i)
}

function checked(clas, word, i){
    clas[i].checked = false 
    clas[i].addEventListener('click', () => {
        let str = clas[i].value
        sessionStorage.setItem(word, str)
        switch (i) {
            case 0:
                clas[1].checked = false 
            break;
            case 1:
                clas[0].checked = false 
            break;
        }
    })
}


// interaction to beckend

async function beckendGet(url) {
    const response = await fetch (url, {
        method  : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
    })
    return response.json()
}

async function beckendPost(url, data) {
    const response = await fetch (url, {
        method  : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    return response.json()
}

async function beckendPut(url, data) {
    const response = await fetch (url, {
        method  : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body    : JSON.stringify(data)
    })
    return response.json()
}

async function beckendDelete(url, data) {
    const response = await fetch (url, {
        method  : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    return response.json()
}

// Insert multiple values into an array

function insert(array, index, items) {
    let subArray = array.slice.call(items)
    // set what you wanna start
    array.splice.apply(array, [index, 1].concat(subArray))
    // console.log(array)
}

// tbody

function generateTable(data) {

    // console.log(data)

    let addKey = null
    let key = null

    if (data.length > 1) {
        addKey = Object.keys(data[0]['address'])
        data.every( i => {
            key = Object.keys(i)
            return false
        })
        insert(key, 7, addKey)
        // console.log(data)
        allResult(data)
    } else {
        addKey = Object.keys(data['address'])
        key = Object.keys(data)
        insert(key, 7, addKey)
        
        const table = document.getElementsByClassName('table_showData')
        const tbody = document.createElement('tbody')
        tbody.className = 'allDataDb'
            
        let row = document.createElement('tr')
        let col = []
        let colText = []

        for (let j = 0; j < key.length; j++) {
    
            const letMeTry = data[key[j]]
            // console.log(letMeTry)
            col[j] = document.createElement('td')
    
            if (j === 0) {
                colText[j] = document.createTextNode(1)
            } else if (j === 7 || j === 8 || j === 9 || j === 10) {
                const rootAddress = data['address'][key[j]]
                colText[j] = document.createTextNode(rootAddress)
                // console.log(rootAddress)
            } else {
                colText[j] = document.createTextNode(letMeTry)
                // console.log(letMeTry)
            }
    
            col[j].appendChild(colText[j])
            col[j].setAttribute('data', key[j])
            row.appendChild(col[j])
        }

        row.className = 'dataRow'
        tbody.appendChild(row)
        
        return table[0].appendChild(tbody)
    }

    // console.log(key)

    
    function allResult(data) {

        const table = document.getElementsByClassName('table_showData')
        const tbody = document.createElement('tbody')
        tbody.className = 'allDataDb'
            
        let row = []
        let col = []
        let colText = []

        for (let i = 0; i < data.length; i++) {
            row[i] = document.createElement('tr')
    
            for (let j = 0; j < key.length; j++) {
    
                const letMeTry = data[i][key[j]]
                // console.log(letMeTry)
                col[j] = document.createElement('td')
    
                if (j === 0) {
                    colText[j] = document.createTextNode(i+1)
                } else if (j === 7 || j === 8 || j === 9 || j === 10) {
                    const rootAddress = data[i]['address'][key[j]]
                    colText[j] = document.createTextNode(rootAddress)
                    // console.log(rootAddress)
                } else {
                    colText[j] = document.createTextNode(letMeTry)
                    // console.log(letMeTry)
                }
    
                col[j].appendChild(colText[j])
                col[j].setAttribute('data', key[j])
                row[i].appendChild(col[j])
            }
            row[i].className = 'dataRow'
            tbody.appendChild(row[i])
        }
    
        return table[0].appendChild(tbody)
    }
}


// show all data
beckendGet(uri).then(response => {
    // console.log(response)
    generateTable(response)
    dataAllRow()
    searchMethod(response)
})

// search

function searchMethod(response) {
    const allDataDb = document.getElementsByClassName('allDataDb')
    const searchText = document.getElementsByClassName('inputSearch')
    const btnSearch = document.getElementById('btnSearch')
    const btnSearchKK = document.getElementById('btnSearchKK')

    btnSearch.addEventListener('click', async () => {
        const text = {nik : searchText[0].value}
        // console.log(text)
        allDataDb[0].remove()
        await beckendPost(uri, text).then(res => {
            // console.log(res)
            const message = Object.keys(res).length
            if (message === 1) {
                alert(res.message)
                generateTable(response)
                dataAllRow()
            } else {
                generateTable(res)
                dataAllRow()
            }  
        })
    })

    btnSearchKK.addEventListener('click', async () => {
        const text = {no_kk : searchText[1].value}
        // console.log(text)
        allDataDb[0].remove()
        await beckendPost(uri, text).then(res => {
            // console.log(res)
            const message = Object.keys(res).length
            if (message === 1) {
                alert(res.message)
                generateTable(response)
                dataAllRow()
            } else {
                generateTable(res)
                dataAllRow()
            }  
        })
    })

}

// event dataRow
function dataAllRow() {
    const dataRow = document.getElementsByClassName('dataRow')
    const divUpdate = document.getElementsByClassName('updateDiv')
    const updateButton = document.getElementById('updateData')
    const cencelPop = document.getElementById('cencelPop')
    const infoEdit = document.getElementsByClassName('infoEdit')
    const updateText = document.getElementsByClassName('updateText')
    
    // cencel edit

    for (let i = 0; i < dataRow.length; i++) {
        const node = dataRow[i].childNodes
        const nik = node[1].innerHTML
        // hover
        node[0].addEventListener('mouseover', () => node[0].innerHTML = 'Hapus')
        node[0].addEventListener('mouseout', () => node[0].innerHTML = i+1)

        for (let j = 0; j < node.length; j++) {

            node[j].addEventListener('click', () => {
                // count++
                const data = node[j].innerHTML
                const dataAttr = node[j].getAttribute('data')
                const text = document.createTextNode(data)   
  
                if (j != 0) {
                    divUpdate[0].style.display = 'block'
                }

                updateText[0].appendChild(text)

                // check data attribute

                switch (dataAttr) {
                    case 'nik':
                        infoEdit[0].innerHTML = 'NIK'
                    break;
                    case 'no_kk':
                        infoEdit[0].innerHTML = 'NO. KK'
                    break;
                    case 'nama':
                        infoEdit[0].innerHTML = 'NAMA'
                    break;
                    case 'tempat_tggl_lahir':
                        infoEdit[0].innerHTML = 'TEMPAT TANGGAL LAHIR'
                    break;
                    case 'kelamin':
                        infoEdit[0].innerHTML = 'JENIS KELAMIN'
                    break;
                    case 'gol_darah':
                        infoEdit[0].innerHTML = 'GOL. DARAH'
                    break;
                    case 'rt_rw':
                        infoEdit[0].innerHTML = 'RT/RW'
                    break;
                    case 'kel_desa':
                        infoEdit[0].innerHTML = 'Kel/Desa'
                    break;
                    case 'kec':
                        infoEdit[0].innerHTML = 'Kec'
                    break;
                    case 'agama':
                        infoEdit[0].innerHTML = 'AGAMA'
                    break;
                    case 'status':
                        infoEdit[0].innerHTML = 'STATUS PERKAWINAN'
                    break;
                    case 'pekerjaan':
                        infoEdit[0].innerHTML = 'PEKERJAAN'
                    break;
                    case 'kewarganegaraan':
                        infoEdit[0].innerHTML = 'KEWARGANEGARAAN'
                    break;
                    case 'berlaku':
                        infoEdit[0].innerHTML = 'BERLAKU HINGGA'
                    break;
                }

                // objects 

                let passData = [
                    {nik : nik},
                    {[dataAttr] : data}
                ]

                let passAddress = [
                    {nik : nik},
                    { address : {[dataAttr] : data}}
                ]

                if (j === 0) {
                    beckendDelete(uri, passData[0]).then(response => {
                        console.log(response)
                        location.reload()
                    })
                } else if (j === 7 || j === 8 || j === 9 || j === 10) {
                    updateButton.addEventListener('click', () => {

                        // let textValue = updateText[1].value
                        // let newData = { [dataAttr] : textValue}
                        let address = {address : {[dataAttr] : updateText[1].value}}
                        
                        if (passAddress != null) {
                            passAddress.push(address)
                            // console.log(passAddress)
    
                            beckendPut(uri, passAddress).then(response => {
                                console.log(response)
                                location.reload()
                            })
                        }
                    })
                } else {
                    // update popup
                    updateButton.addEventListener('click', () => {     

                        let textValue = updateText[1].value
                        let newData = {[dataAttr] : textValue}
                        // console.log(passData) -->> params update data
                        if (passData != null) {
                            passData.push(newData)
                            beckendPut(uri, passData).then(response => {
                                console.log(response)
                                location.reload()
                            })
                        }
                    })
                }
                cencelPop.addEventListener('click', () => {
                    passData = null
                    passAddress = null
                    updateText[0].innerHTML = ''
                    divUpdate[0].style.display = 'none'
                })
            })
        }
    }
}



// btn submit

submit.addEventListener('click', e => {

    e.preventDefault()
    let strGen = sessionStorage.getItem(gen)
    let strCiv = sessionStorage.getItem(civ)

    const data_desa = {
        nik  : data[0].value, 
        no_kk: data[1].value,
        nama : data[2].value.toUpperCase(), 
        tempat_tggl_lahir: data[3].value,
        kelamin  : strGen, 
        gol_darah: data[4].value.toUpperCase(), 
        address  : {
            alamat  : data[5].value.toUpperCase(),
            rt_rw   : data[6].value.toUpperCase(),
            kel_desa: data[7].value.toUpperCase(),
            kec     : data[8].value.toUpperCase() 
        },
        agama           : data[9].value.toUpperCase(), 
        status          : data[10].value.toUpperCase(),
        pekerjaan       : data[11].value.toUpperCase(),
        kewarganegaraan : strCiv,
        berlaku         : data[12].value.toUpperCase()
    }

    let ket = null

    // is all inputs are empty?
    if (data[0].value === '' || data[1].value === '' || data[2].value === '' || data[3].value === '' || data[4].value === '' || data[5].value === '' || 
        data[6].value === '' || data[7].value === '' || data[8].value === '' || data[9].value === '' || data[10].value === '' || data[11].value === '')
    {
        for (let i = 0; i < data.length; i++) {
            if (data[i].value === '') {
                data[i].style.border = '1px solid red'
            } else {
                data[i].style.border = '1px solid black'
            }
        }
        ket = `Penuhi data`
        console.log(ket)
    // Nik check
    } else if (isNaN(data[0].value)) {
        data[0].style.border = '1px solid red'
        ket = `NIK harus angka!`
        console.log(ket)
    } else if (data[0].value.length < 14) {
        data[0].style.border = '1px solid red'
        ket = `Jumlah digit NIK kurang!`
        console.log(ket)
    // KK check
    } else if (isNaN(data[1].value)) {
        data[1].style.border = '1px solid red'
        ket = `Nomor KK harus angka!`
        console.log(ket)
    } else if (data[1].value.length < 14) {
        data[1].style.border = '1px solid red'
        ket = `Jumlah no digit KK kurang!`
        console.log(ket)
    // Name
    } else if (!isNaN(data[2].value)) {
        data[2].style.border = '1px solid red'
        ket = `Nama tidak boleh angka!`
        console.log(ket)
    } else if (data[2].value.length < 2) {
        data[2].style.border = '1px solid red'
        ket = `Nama tidak valid!`
        console.log(ket)
    // Gol darah
    } else if (!isNaN(data[4].value)) {
        data[4].style.border = '1px solid red'
        ket = `Gol darah tidak boleh boleh angka!`
        console.log(ket) 
    } else if (data[4].value.length > 3) {
        data[2].style.border = '1px solid red'
        ket = `Jumlah karakter terlalu banyak`
        console.log(ket)
    } else {
        beckendPost(uri, data_desa).then(response => {
            console.log(response)
        })
        location.reload()
    }

})


// show form
const showForm = document.getElementById('showForm')
const inputData = document.getElementsByClassName('inputData')
let hideCount = 0
showForm.addEventListener('click', () => {
    hideCount++
    if (hideCount === 1) {
        inputData[0].style.display = 'block'
        showForm.innerHTML = 'Sembunyikan'
    } else if(hideCount === 2){
        inputData[0].style.display = 'none'
        showForm.innerHTML = 'Tampilkan Form'
        return hideCount = 0
    }
})




