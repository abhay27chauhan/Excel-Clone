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
        // 3d array
        let sheetArray = fr.result;

        sheetDB = sheetArray[0];
    }
})