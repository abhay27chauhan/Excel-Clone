let addBtn = document.querySelector(".add-sheet_btn-container");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");

firstSheet.addEventListener("click", makeSheetActive)

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

    newSheet.addEventListener("click", makeSheetActive);
})

function makeSheetActive(e){
    let cSheet = e.currentTarget;
    let allSheets = document.querySelectorAll(".sheet");
    for(let i=0; i<allSheets.length; i++){
        allSheets[i].classList.remove("active");
    }
    cSheet.classList.add("active");
}

// e.currentTarget -> returns element on which eventListener is called