'use strict'

let save = document.querySelector(".save");
let open = document.querySelector(".open")

save.addEventListener("click", function(){
    const data = JSON.stringify(sheetDB);

    const blob = new Blob([data], { type: 'application/json' });

    // Create new URL
    const url = window.URL.createObjectURL(blob);

    let a = document.createElement("a");

    a.href = url;

    a.download = "file.json";

    a.click();
})

open.addEventListener("change", function(){

    let fileList = open.files;
    let fileObj = fileList[0];

    let fr = new FileReader();

    fr.readAsText(fileObj);
    fr.onload = function(){
        let sheetArray = fr.result;

        let allSheets = document.querySelectorAll(".sheet");
        let lastSheet = allSheets[allSheets.length-1];
        let lastIndex = lastSheet.getAttribute("idx");
        lastIndex = Number(lastIndex);
        
        let newSheet = document.createElement("div");
        newSheet.setAttribute("class", "sheet");
        newSheet.setAttribute("idx", `${lastIndex + 1}`);
        newSheet.innerText = `Sheet ${lastIndex + 2}`;
        sheetList.appendChild(newSheet);

        newSheet.addEventListener("click", makeSheetActive);

        let newIdx = lastIndex + 1;
        workBook[newIdx] = JSON.parse(sheetArray);

        localStorage.setItem("workBook", JSON.stringify(workBook));

        newSheet.click();
    }
})