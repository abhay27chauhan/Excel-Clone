'use strict';

let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let grid = document.querySelector(".grid");
let addressInput = document.querySelector(".address-input")
let boldBtn = document.querySelector(".bold");
let underlineBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");
let allAlignButtons = document.querySelectorAll(".align-container>*")
let fontSizeElem = document.querySelector(".font-size");
let fontFamilyElem = document.querySelector(".font-family");
let colorButtons = document.querySelectorAll(".color-container>*");
let formulaBar = document.querySelector(".formula-input")

let workBook = [];
let sheetDB;

let rows = 100;
let cols = 26;

if(localStorage.getItem("workBook")){
    workBook = JSON.parse(localStorage.getItem("workBook"));
}

// left_col
for(let i=0; i<rows; i++){
    let colBox = document.createElement("div");
    colBox.innerText = i+1;
    colBox.setAttribute("class", "box");
    leftCol.appendChild(colBox);
}

// top_row
for(let i=0; i<cols; i++){
    let rowBox = document.createElement("div");
    rowBox.innerText = String.fromCharCode(65 + i);
    rowBox.setAttribute("class", "cell");
    topRow.appendChild(rowBox);
}

// grid
for(let i=0; i<rows; i++){
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for(let j=0; j<cols; j++){
        let cell = document.createElement("div");
        // cell.innerText = `${String.fromCharCode(65 + j)} ${i+1}`
        cell.setAttribute("class", "cell dStyle");
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        cell.setAttribute("contenteditable", "true");
        row.appendChild(cell);
    }
    grid.appendChild(row);
}

let addBtn = document.querySelector(".add-sheet_btn-container");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");

firstSheet.addEventListener("click", makeSheetActive)

firstSheet.click();

for(let i=1; i<workBook.length; i++){
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("idx", `${i}`);
    newSheet.innerText = `Sheet ${i + 1}`;
    sheetList.appendChild(newSheet);

    newSheet.addEventListener("click", makeSheetActive);
}

addBtn.addEventListener("click", function(){
    let allSheets = document.querySelectorAll(".sheet");
    let lastSheet = allSheets[allSheets.length-1];
    let lastIndex = lastSheet.getAttribute("idx");
    lastIndex = Number(lastIndex);
    
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("idx", `${lastIndex + 1}`);
    newSheet.innerText = `Sheet ${lastIndex + 2}`;
    sheetList.appendChild(newSheet);

    for(let i=0; i<allSheets.length; i++){
        allSheets[i].classList.remove("active");
    }
    newSheet.classList.add("active");

    let newIdx = lastIndex +1;
    createSheet(newIdx);
    sheetDB = workBook[newIdx];
    localStorage.setItem("workBook", JSON.stringify(workBook));
    setUI();

    newSheet.addEventListener("click", makeSheetActive);
})

function makeSheetActive(e){
    let cSheet = e.currentTarget;
    let allSheets = document.querySelectorAll(".sheet");
    for(let i=0; i<allSheets.length; i++){
        allSheets[i].classList.remove("active");
    }
    cSheet.classList.add("active");
    let idx = cSheet.getAttribute("idx");

    if(!workBook[idx]){
        createSheet(idx)
        localStorage.setItem("workBook", JSON.stringify(workBook));
    }

    sheetDB = workBook[idx];
    setUI();
}

function createSheet(idx){
    let newDB = [];
    for(let i=0; i<rows; i++){
        let row = [];
        for(let j=0; j<cols; j++){
            let cell = {
                bold: "normal",
                italic: "normal",
                underline: "none",
                hAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "12",
                color: "black",
                bColor: "lightblue",
                value: "",
                children: [],
                formula: ""
            }

            row.push(cell)
        }

        newDB.push(row);
    }

    workBook[idx] = newDB;
}

function setUI(){
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            let elem = document.querySelector(`.grid .cell[rid="${i}"][cid="${j}"]`);
            let { bold, italic, underline, hAlign, fontFamily, fontSize, color, bColor, value} = sheetDB[i][j];
            elem.style.fontWeight = bold;
            elem.style.fontStyle = italic;
            elem.style.textDecoration = underline;
            elem.style.textAlign = hAlign;
            elem.style.fontFamily = fontFamily;
            elem.style.fontSize = fontSize + "px";
            elem.style.color = color;
            elem.style.backgroundColor = bColor;
            elem.innerText = value;
        }
    }
    boldBtn.classList.remove("active-btn");
    underlineBtn.classList.remove("active-btn");
    italicBtn.classList.remove("active-btn");

    fontFamilyElem.value = "sans-serif";
    fontSizeElem.value = "12";

    for(let i=0; i<colorButtons.length; i++){
        colorButtons[i].value = "#000000";
    }

    for(let i=0; i<allAlignButtons.length; i++){
        let alignment = allAlignButtons[i].getAttribute("class");
        if(alignment != "center"){
            allAlignButtons[i].classList.remove("active-btn")
        }
    }
}

let allCells = document.querySelectorAll(".grid .cell");
for(let i=0; i<allCells.length; i++){
    allCells[i].addEventListener("click", function(){
        let rid = allCells[i].getAttribute("rid");
        let cid = allCells[i].getAttribute("cid");

        rid = Number(rid);
        cid = Number(cid);

        let address = `${String.fromCharCode(65 + cid)}${(rid + 1)}`

        addressInput.value = address

        let cellObject = sheetDB[rid][cid];

        if(cellObject.bold == "normal"){
            boldBtn.classList.remove("active-btn");
        }else{
            boldBtn.classList.add("active-btn");
            console.log(boldBtn.classList)
        }

        if(cellObject.underline == "none"){
            underlineBtn.classList.remove("active-btn");
        }else{
            underlineBtn.classList.add("active-btn");
        }

        if(cellObject.italic == "normal"){
            italicBtn.classList.remove("active-btn");
        }else{
            italicBtn.classList.add("active-btn");
        }
        
        if(cellObject.hAlign == "center"){
            allAlignButtons[1].classList.add("active-btn");
            allAlignButtons[0].classList.remove("active-btn");
            allAlignButtons[2].classList.remove("active-btn");
        }else if(cellObject.hAlign == "left"){
            allAlignButtons[0].classList.add("active-btn");
            allAlignButtons[1].classList.remove("active-btn");
            allAlignButtons[2].classList.remove("active-btn");
        }else{
            allAlignButtons[2].classList.add("active-btn");
            allAlignButtons[0].classList.remove("active-btn");
            allAlignButtons[1].classList.remove("active-btn");
        }

        colorButtons[0].value = cellObject.color;

        colorButtons[1].value = cellObject.bColor;

        fontFamilyElem.value = cellObject.fontFamily;

        fontSizeElem.value = cellObject.fontSize;

        formulaBar.value = cellObject.formula;

    })
}

boldBtn.addEventListener("click", function(){
    // 1. click happens
    // 2. getting address from address bar
    let uiCellElem = findUICellElement();

    // 3. converting address to rid | cid
    let rid = uiCellElem.getAttribute("rid");
    let cid = uiCellElem.getAttribute("cid");

    // 4. fetching cellObject from db
    let cellObject = sheetDB[rid][cid];

    // 5. updating UI based on cellObject
    if(cellObject.bold == "normal"){
        uiCellElem.style.fontWeight = "bold";
        boldBtn.classList.add("active-btn");
        cellObject.bold = "bold";
    }else{
        uiCellElem.style.fontWeight = "normal";
        boldBtn.classList.remove("active-btn");
        cellObject.bold = "normal";
    }
    localStorage.setItem("workBook", JSON.stringify(workBook));
})

underlineBtn.addEventListener("click", function(){
    let uiCellElem = findUICellElement();
    let rid = uiCellElem.getAttribute("rid");
    let cid = uiCellElem.getAttribute("cid");

    let cellObject = sheetDB[rid][cid];

    if(cellObject.underline == "none"){
        uiCellElem.style.textDecoration = "underline";
        underlineBtn.classList.add("active-btn");
        cellObject.underline = "underline";
    }else{
        uiCellElem.style.textDecoration = "none";
        underlineBtn.classList.remove("active-btn");
        cellObject.underline = "none";
    }
    localStorage.setItem("workBook", JSON.stringify(workBook));
})

italicBtn.addEventListener("click", function(){
    let uiCellElem = findUICellElement();
    let rid = uiCellElem.getAttribute("rid");
    let cid = uiCellElem.getAttribute("cid");

    let cellObject = sheetDB[rid][cid];

    if(cellObject.italic == "normal"){
        uiCellElem.style.fontStyle = "italic";
        italicBtn.classList.add("active-btn");
        cellObject.italic = "italic";
    }else{
        uiCellElem.style.fontStyle = "normal";
        italicBtn.classList.remove("active-btn");
        cellObject.italic = "normal";
    }
    localStorage.setItem("workBook", JSON.stringify(workBook));
})

for(let i=0; i<allAlignButtons.length; i++){
    allAlignButtons[i].addEventListener("click", function(){
        let alignment = allAlignButtons[i].getAttribute("class");
        let uiCellElem = findUICellElement();
        let rid = uiCellElem.getAttribute("rid");
        let cid = uiCellElem.getAttribute("cid");

        let cellObject = sheetDB[rid][cid];
        cellObject.hAlign = alignment;
        uiCellElem.style.textAlign = alignment;

        allAlignButtons.forEach(alignBtn => {
            alignBtn.classList.remove("active-btn");
        })

        allAlignButtons[i].classList.add("active-btn");
        localStorage.setItem("workBook", JSON.stringify(workBook));
    })
}

fontSizeElem.addEventListener("change", function(){
    let fontSize = fontSizeElem.value;
    let uiCellElem = findUICellElement();
    let rid = uiCellElem.getAttribute("rid");
    let cid = uiCellElem.getAttribute("cid");

    let cellObject = sheetDB[rid][cid];
    cellObject.fontSize = fontSize
    uiCellElem.style.fontSize = fontSize + "px";
    localStorage.setItem("workBook", JSON.stringify(workBook));
})

fontFamilyElem.addEventListener("change", function(){
    let fontFamily = fontFamilyElem.value;
    let uiCellElem = findUICellElement();
    let rid = uiCellElem.getAttribute("rid");
    let cid = uiCellElem.getAttribute("cid");

    let cellObject = sheetDB[rid][cid];
    cellObject.fontFamily = fontFamily
    uiCellElem.style.fontFamily = fontFamily;
    localStorage.setItem("workBook", JSON.stringify(workBook));
})

for(let i=0; i<colorButtons.length; i++){
    colorButtons[i].addEventListener("change", function(){
        let colorPropType = colorButtons[i].getAttribute("class");
        let uiCellElem = findUICellElement();
        let rid = uiCellElem.getAttribute("rid");
        let cid = uiCellElem.getAttribute("cid");
        
        let val = colorButtons[i].value;
        let cellObject = sheetDB[rid][cid];
        if(colorPropType == "color"){
            cellObject.color = val;
            uiCellElem.style.color = val;
        }else{
            cellObject.bColor = val;
            uiCellElem.style.backgroundColor = val;
        }
        localStorage.setItem("workBook", JSON.stringify(workBook));
    })
}

function findUICellElement(){
    let address = addressInput.value;
    let ridcidObj = getRIDCIDFromAddress(address);

    let rid = ridcidObj.rid;
    let cid = ridcidObj.cid;

    let uiCellElem = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)

    return uiCellElem;
}

function getRIDCIDFromAddress(address){
    let cid = Number(address.charCodeAt(0)) - 65;
    let rid = Number(address.slice(1)) - 1;

    return {rid, cid}
}

allCells[0].click();