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
            bColor: "none",
            value: "",
            children: []
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

        console.log(cellObject)
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
        let rid = uiCellElem.getAttribute("rid");
        let cid = uiCellElem.getAttribute("cid");

        let cellObject = sheetDB[rid][cid];
        cellObject.hAlign = alignment;
        uiCellElem.style.textAlign = alignment;

        allAlignButtons.forEach(alignBtn => {
            alignBtn.classList.remove("active-btn");
        })

        allAlignButtons[i].classList.add("active-btn");
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
})

fontFamilyElem.addEventListener("change", function(){
    let fontFamily = fontFamilyElem.value;
    let uiCellElem = findUICellElement();
    let rid = uiCellElem.getAttribute("rid");
    let cid = uiCellElem.getAttribute("cid");

    let cellObject = sheetDB[rid][cid];
    cellObject.fontFamily = fontFamily
    uiCellElem.style.fontFamily = fontFamily;
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