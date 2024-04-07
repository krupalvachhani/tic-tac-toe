const boxes=document.querySelectorAll('.box');
const winprint=document.querySelector('.msg');
const resetbtn=document.querySelector('.reset');
const radioButtons = document.querySelectorAll('input[name="Player"]');
let turn0=true;
let winningpattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]
const reset=()=>{
    turn0=true;
    enablebtn();
}
boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(turn0){
            box.innerText="X";
            if(checkwinner()){
                disablebtn();
                printwinner("X");
                return;
            }
            radioButtons.forEach((btn)=>{
                if(btn.checked && btn.value==="two"){
                    turn0=false;
                }
                if(btn.checked && btn.value==="one"){
                    let i=computerMove();
                    boxes[i].innerText="O";
                    if(checkwinner()){
                        disablebtn();
                        printwinner("O");
                    }
                    let j=0;
                    boxes.forEach((box)=>{
                        if(box.innerText==="X"||box.innerText==="O"){
                            j++;
                        }
                    })
                    console.log(j);
                    if(j==8){
                        printwinner("not found");
                        disablebtn();
                        return;
                    }
                }
            })
        }else{
            box.innerText="O";
            if(checkwinner()){
                disablebtn();
                printwinner("O");
            }
            turn0=true;
        }
        box.disabled=true;
    })
})
const disablebtn=()=>{
    boxes.forEach((box) => {
        box.disabled=true;
    })
}
const enablebtn=()=>{
    boxes.forEach((box) => {
        box.innerText="";
        box.disabled=false;
        winprint.innerText="";
    })
}
const checkwinner=()=>{
    for (pattern of winningpattern) {
        let value1=boxes[pattern[0]].innerText;
        let value2=boxes[pattern[1]].innerText;
        let value3=boxes[pattern[2]].innerText;
        if(value1!="" && value2!="" && value3!="" && value1===value2 && value2===value3){
            return true;
        }
    }
    return false;
}
const printwinner=(value1)=>{
    winprint.innerText=`Winner ${value1}`;
}
const computerMove=()=>{
    let idx=-1;
    let i=0;
    boxes.forEach((box)=>{
        if(box.innerText===""){
            box.innerText="O";
            if(checkwinner()){
                box.innerText="";
                idx=i;
                console.log("hello"+idx);
            }
            box.innerText="";
        }
        i++;
    })
    i=0;
    if(idx==-1){
        boxes.forEach((box)=>{
            if(box.innerText===""){
                box.innerText="X";
                if(checkwinner()){
                    box.innerText="";
                    idx=i;
                    console.log("hello"+idx);
                }
                box.innerText="";
            }
            i++;
        })
    }
    i=-1;
    while(i==-1 && idx==-1){
        i=Math.floor(Math.random()*9);
        if(boxes[i].innerText===""){
            idx=i;
        }
        i=-1;
    }
    return idx;
}
resetbtn.addEventListener('click',reset);
