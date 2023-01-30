const nameInpTag = document.querySelector('#name__inp')
const btnSort = document.querySelector('#btn__sort')
const btnSave = document.querySelector('#btn__save')
const btnClear = document.querySelector('#btn__clr')
const nameBox = document.querySelector('.name__box')

// Предусматривается ввод только букв. Цифры и спецсимволы запрещены.
// Пробелы запрещены, за исключением оборачиваний пробелами одного слова (если слово можно вытащить используя trim).
// Т.е. ввести "имя фамилия" не получится, вводить можно только одно слово. 
// Можно убрать это предусмотрение на строке 58 (if-else в addEventListener btnSave'а).

let alphReg = new RegExp("^.*[^A-zА-яЁё].*$");
let isSorted = false
let namesArr = JSON.parse(localStorage.getItem('names')) || []


// Сохранение имени в LS
const saveName = (name) =>{
    namesArr = [name, ...namesArr ]
    localStorage.setItem('names', JSON.stringify(namesArr))
    console.log( JSON.parse(localStorage.getItem('names')) );
    isSorted = false
    renderNames(namesArr) 
}

// Отрисовка имён на страницу
const renderNames = (names) => {
    nameBox.innerHTML = ""
    for(let name of names){
        const newNameDiv = document.createElement('div')
        newNameDiv.classList.add('name')
        const newName = document.createElement('h1')
        newName.innerHTML = `> ${name}`
        newNameDiv.appendChild(newName)
        nameBox.appendChild(newNameDiv)
    }
    
}

// Сортировка имён (не зависит от регистра)
const sortNames = (names) => {
    if(!isSorted){
        names.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        isSorted = true
    } else{
        names.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase())
        }).reverse()
        isSorted = false
    }    
}

// Сохранение по нажатию
btnSave.addEventListener("click", ()=>{
    
    if( nameInpTag.value.trim() === '' || (alphReg.test(nameInpTag.value.trim()) === true) ){
        nameInpTag.value = ""
    } else {
        saveName(nameInpTag.value.trim())
        // alert("ELSEIF")
        nameInpTag.value = ""
    }
})

// Сортировка по нажатию
btnSort.addEventListener("click", ()=>{
    sortNames(namesArr)
    renderNames(namesArr)
})

// Очистка
btnClear.addEventListener("click", () => {
    localStorage.setItem('names', JSON.stringify([])); 
    namesArr = [];
    nameBox.innerHTML = ""
    console.log(namesArr);
    console.log(localStorage);
    })

// Первичная отрисовка
renderNames(namesArr)