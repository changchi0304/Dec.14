const inputText = document.getElementById('inputText');
const addBtn = document.getElementById('addBtn');
let todoData=[];

//新增
addBtn.addEventListener('click',addTodo);
function addTodo(){
    let todo={
     txt:inputText.value,
     id:new Date().getTime(),
     checked:'',
    };
    if(todo.txt!=''){
        todoData.unshift(todo);
        inputText.value="";
    }
        upDataList();
}
   
//優化
inputText.addEventListener('keypress',function(e){
    if(e.key == 'Enter'){
        addTodo();
    }
});










//渲染
const todoList = document.getElementById('todoList');
function reden(arr){
    let str='';
    arr.forEach(function(item){
        str+=`
        <li data-id=${item.id}>
        <label class="checkbox" for="">
          <input type="checkbox"${item.checked} />
          <span>${item.txt}</span>
        </label>
        <a href="#" class="delete"></a>
      </li>`;
    });
    todoList.innerHTML=str;
}

//tab切換（css樣式)
const tab = document.getElementById('tab');
let toggleStatus='all';
tab.addEventListener('click',changeTab);
function changeTab(e){
    toggleStatus=e.target.dataset.tab;
    let tabs = document.querySelectorAll('#tab li');
    tabs.forEach(function(item){
        item.classList.remove('active');
    });
    e.target.classList.add('active');
    upDataList();
}

//刪除＆切換checked 狀態功能
todoList.addEventListener('click',deleteAndChecked);
function deleteAndChecked(e){
let id = e.target.closest('li').dataset.id;
if(e.target.classList.value=="delete"){
    e.preventDefault();
    todoData = todoData.filter((i) => i.id != id);
}else{
    //切換cheched狀態功能
todoData.forEach((i,index) => {
    if(i.id == id){
        if(todoData[index].checked=="checked"){
            todoData[index].checked = "";
        }else{
            todoData[index].checked = "checked";
        }
    }
});
}
  upDataList();
}

//更新待辦清單
function upDataList(){
    let showData = [];
    if (toggleStatus == 'all'){
        showData = todoData;
    }else if (toggleStatus == 'work'){
        showDatab = todoData.filter((i)=> i.checked =='');
    }else{
        showDatab = todoData.filter((i)=> i.checked =='checked');
    }
    const workNum = document.getElementById('workNum');
    let todoLength=todoData.filter((i)=> i.checked =='');
    workNum.textContent = todoLength.length;
    reden(showData);
}
upDataList();

//初始
upDataList();

//刪除已完成todo
const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click',function(e){
    e.preventDefault();
    todoData = todoData.filter((i)=>i.checked != 'checked');
    upDataList();
});

