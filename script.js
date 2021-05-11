let addBtn = document.querySelector(".add-sheet_btn-container");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet");

addBtn.addEventListener("click", function(){
    let allSheets = document.querySelectorAll(".sheet");
    let lastSheet = allSheets[allSheets.length-1];
    let lastIndex = lastSheet.getAttribute("idx");
    lastIndex = Number(lastIndex);
    console.log(lastIndex);
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("idx", `${lastIndex + 1}`);
    newSheet.innerText = `Sheet ${lastIndex + 2}`;
    sheetList.appendChild(newSheet);
})