let input_area = document.querySelector('#input_area')
let plus_button = document.querySelector('#plus_button')
let task_list = []
let list_box_div = document.querySelectorAll('#list_box div');
let under_line = document.querySelector('#under_line')
let list = []
let mode = "all"

for(let i = 1; i < list_box_div.length; i++){
    list_box_div[i].addEventListener('click', function(e){
        filter(e, i)
    })
}

//엔터, 플러스버튼 눌렀을때 input_area에 값이 있는지 확인 및 전송
window.addEventListener('keypress', function(e){
    if(e.key === 'Enter' && input_area.value){ add_task() }
    else{ alert('할 일을 입력해 주세요!') }
})
plus_button.addEventListener('click', function(){
    if(!input_area.value) alert('할 일을 입력해 주세요!')
    else{add_task()}
})

function add_task(){
    let task = {
        id: randomNumber(),
        isComplete: true,
        input_value: input_area.value
    }
    task_list.push(task)
    console.log(task_list)
   filter();
}

//Check_button
function cb(id){
    for(let i = 0; i < task_list.length; i++){
        if(task_list[i].id == id){
            task_list[i].isComplete = !task_list[i].isComplete; // true면 false, false면 true
            break;
        }
    }
    filter()
}

//Delete button
function db(id){
    for(let i = 0; i < task_list.length; i++){
        if(task_list[i].id == id){
            task_list.splice(i, 1)
            break;
        }
    }
    filter()
}

function filter(e, i){
    list = []
    //under_line 이동
    if(e){
        mode = e.target.id
        under_line.style.left = (i - 1) * 73 + 'px';
        console.log("mode: ", mode)
    }

    //모두, 진행중, 끝남
    if(mode === 'all'){
        for(let i = 0; i < task_list.length; i++){
            list.push(task_list[i])
        }
    }else if(mode === 'ongoing'){
        for(let i = 0; i < task_list.length; i++){
            if(task_list[i].isComplete == true){
                    list.push(task_list[i])
                }
            }
        }
    else if(mode === 'end'){
        for(let i = 0; i < task_list.length; i++){
            if(task_list[i].isComplete == false){
                list.push(task_list[i])
            }
        }
    }
    console.log(list)
    render()
}

//이미지를 리셋
function render(){
    let resultHTML = ''
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == false){
            resultHTML += `<div class="text_box_button">
                                <div class="text_box" style="background:lightgray">
                                    <div class="line-through">${list[i].input_value}</div>
                                </div>
                                <div class="button_box">
                                    <button id="check_button" onclick="cb('${list[i].id}')">
                                        <i class="fa-solid fa-rotate-left"></i>
                                    </button>
                                    <button id="delete_button" onclick="db('${list[i].id}')">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>`
        }else if(list[i].isComplete){
            resultHTML += `<div class="text_box_button">
                                <div class="text_box">${list[i].input_value}</div>
                                <div class="button_box">
                                    <button id="check_button" onclick="cb('${list[i].id}')">
                                        <i class="fa-solid fa-check"></i>
                                    </button>
                                    <button id="delete_button" onclick="db('${list[i].id}')">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>`
        }
    }
    document.querySelector('#render_box').innerHTML = resultHTML;
}

//랜덤 아이디를 생성 하기 위함
function randomNumber(){
    return Math.random().toString(36).substr(2, 16);
}
