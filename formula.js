// 1. formula can only be set through formula box
// 2. space seperated tokens
// 3. will implement 3 cases
// 4. formula bar -> formula set or formula update
// 5. cell -> formula to value | value to value

for(let i=0; i<allCells.length; i++){
    allCells[i].addEventListener("blur", function(){
        let data = allCells[i].innerText;
        let address = addressInput.value;

        let {rid, cid} = getRIDCIDFromAddress(address);

        let cellObject = sheetDB[rid][cid];

        cellObject.value = data;

        // case 2
        updateChildren(cellObject);
    })
}

formulaBar.addEventListener("keydown", function(e){
    if(e.key == "Enter" && formulaBar.value.trim() !== ""){
        let formula = formulaBar.value;

        let value = evaluateFormula(formula);

        setValue(value, formula);

        // case 2
        setParentChArray(formula);
    }
})

// formula -> ( A1 + A2 )
function evaluateFormula(formula){
    let tokens = formula.split(" ");
    // ['(', 'A1', '+', 'A2' , ')']
    for(let i=0; i<tokens.length; i++){
        let ascii = tokens[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90){
            // tokens[i] = A1 and tokens[i] = A2
            let {rid, cid} = getRIDCIDFromAddress(tokens[i]);
            let value = sheetDB[rid][cid].value;
            tokens[i] = value;
        }
    }

    let evaluatedFormula = tokens.join(" ");

    return eval(evaluatedFormula);
}

function setValue(value, formula){
    let uiCellElem = findUICellElement()
    uiCellElem.innerText = value;

    let address = addressInput.value;
    let {rid, cid} = getRIDCIDFromAddress(address);
    sheetDB[rid][cid].value = value;
    sheetDB[rid][cid].formula = formula;
}

function setParentChArray(formula){
    let address = addressInput.value;

    let tokens = formula.split(" ");

    for(let i=0; i<tokens.length; i++){
        let ascii = tokens[i].charCodeAt(0);
        if(ascii >=65 && ascii <=90){
            let {rid, cid} = getRIDCIDFromAddress(tokens[i]);
            let chidArr = sheetDB[rid][cid].children;
            chidArr.push(address);
            console.log(sheetDB[rid][cid]);
        }
    }
}

function updateChildren(parentObj){
    let children = parentObj.children;

    for(let i=0; i<children.length; i++){
        let {rid, cid} = getRIDCIDFromAddress(children[i]);
        let cellObject = sheetDB[rid][cid];

        let formula = cellObject.formula;
        let value = evaluateFormula(formula);
        setChildValue(value, formula, rid, cid);
        updateChildren(cellObject);
    }
}

// case 2
function setChildValue(value, formula, rid, cid){
    let uiCellElem = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
    uiCellElem.innerText = value;

    sheetDB[rid][cid].value = value;
    sheetDB[rid][cid].formula = formula;
}

// 'blur' event happens before 'click'