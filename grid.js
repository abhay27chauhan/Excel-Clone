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

let rows = 100;
let cols = 26;

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

let sheetDB = [];
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
            bColor: "none"
        }

        row.push(cell)
    }

    sheetDB.push(row);
}

let allCells = document.querySelectorAll(".grid .cell");
for(let i=0; i<allCells.length; i++){
    allCells[i].addEventListener("click", function(){
        let rid = allCells[i].getAttribute("rid");
        let cid = allCells[i].getAttribute("cid");

        rid = Number(rid);
        cid = Number(cid);

        console.log(rid, cid)

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

        console.log(cellObject)
    })
}

boldBtn.addEventListener("click", function(){
    let uiCellElem = findUICellElement();
    let rid = uiCellElem.getAttribute("rid");
    let cid = uiCellElem.getAttribute("cid");

    let cellObject = sheetDB[rid][cid];

    if(cellObject.bold == "normal"){
        uiCellElem.style.fontWeight = "bold";
        boldBtn.classList.add("active-btn");
        cellObject.bold = "bold";
    }else{
        uiCellElem.style.fontWeight = "normal";
        boldBtn.classList.remove("active-btn");
        cellObject.bold = "normal";
    }
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
})

for(let i=0; i<allAlignButtons.length; i++){
    allAlignButtons[i].addEventListener("click", function(){
        let alignment = allAlignButtons[i].getAttribute("class");
        let uiCellElem = findUICellElement();
        uiCellElem.style.textAlign = alignment;
    })
}

fontSizeElem.addEventListener("change", function(){
    let fontSize = fontSizeElem.value;
    let uiCellElem = findUICellElement();
    uiCellElem.style.fontSize = fontSize + "px";
})

fontFamilyElem.addEventListener("change", function(){
    let fontFamily = fontFamilyElem.value;
    let uiCellElem = findUICellElement();
    uiCellElem.style.fontFamily = fontFamily;
})

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