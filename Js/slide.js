const slide = document.querySelector('.Slide');
function news(index,content) {
    this.index = index;
    this.content = content;
    this.getIndex = function() {
        return this.index < 10? `NEWS 0${this.index}` : `NEWS ${this.index}` 
    };
};

let newsList = [
    new news(1,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quaerat maxime vitae nam optio corporis molestias cum, magnam ab? Sequi amet a quisquam, error delectus saepe quia laborum illo natus."),
    new news(2,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quaerat maxime vitae nam optio corporis molestias cum, magnam ab? Sequi amet a quisquam, error delectus saepe quia laborum illo natus."),
    new news(3,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quaerat maxime vitae nam optio corporis molestias cum, magnam ab? Sequi amet a quisquam, error delectus saepe quia laborum illo natus."),
    new news(4,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quaerat maxime vitae nam optio corporis molestias cum, magnam ab? Sequi amet a quisquam, error delectus saepe quia laborum illo natus."),
]

newsList.forEach(news => {
    let showIcon = document.createElement('i');
    let moveIcon = document.createElement('i');
    let newsItem = document.createElement('div');
    let newIndex = document.createElement('div');
    let newContent = document.createElement('div');


    showIcon.classList.add('ti-control-play','showButton','optionButton');
    showIcon.style.cursor = 'pointer';
    moveIcon.classList.add('ti-arrows-vertical','moveNews','optionButton');
    moveIcon.style.cursor = 's-resize';
    let textNode = document.createTextNode(news.getIndex())

    newIndex.classList.add('NewsIndex','newHideSolor');
    newIndex.appendChild(showIcon);
    newIndex.appendChild(textNode);
    newIndex.appendChild(moveIcon);

    newContent.classList.add('NewsContent');
    newContent.style.display = 'none';
    newContent.appendChild(document.createTextNode(news.content))

    newsItem.classList.add('NewsItem');
    newsItem.appendChild(newIndex);
    newsItem.appendChild(newContent);
    newsItem.setAttribute('hasShow',false);
    newsItem.setAttribute('draggable',false);

    slide.appendChild(newsItem);
});

let showButtons = document.querySelectorAll('.showButton');
for (const button of showButtons) {
    button.addEventListener('click',showEvent);
}



function showEvent(e) {
        let newsItem = this.parentNode.parentNode;
        if(newsItem.getAttribute('hasShow') == "false") {
            newsItem.querySelector('.NewsContent').style.display = null;
            this.classList.remove('ti-control-play');
            this.classList.add('ti-arrow-down');
            this.parentNode.classList.remove('newHideSolor');
            this.parentNode.classList.add('newsShowColor')
            newsItem.setAttribute('hasShow',true);
        } else {
            newsItem.querySelector('.NewsContent').style.display = 'none';
            this.classList.add('ti-control-play');
            this.classList.remove('ti-arrow-down');
            this.parentNode.classList.add('newHideSolor');
            this.parentNode.classList.remove('newsShowColor')
            newsItem.setAttribute('hasShow',false);
        }
    
}

function handelMouseDown(e) {
    this.isMouseDown = true;
    this.style.zIndex = 13;
    this.oldLeft = 0;
    this.oldTop = 0;
    isMouseDown = true;
    this.xOld = e.clientX;
    this.yOld = e.clientY;
    if(isNaN(parseInt(this.style.left))) {
        this.style.left = this.offsetLeft + 'px';
        this.style.top = 0 + 'px';
    }
}

function handelMouseMove(e) {
    if(this.isMouseDown ) {
        let xCur = e.clientX;
        let yCur = e.clientY;
        let dx = xCur - this.xOld;
        let dy = yCur - this.yOld;
        this.xOld = xCur;
        this.yOld = yCur;
        this.style.left = (parseInt(this.style.left) + dx) + 'px';
        this.style.top = (parseInt(this.style.top) + dy) + 'px';
    }
}

function handelMouseUp(e) {
    this.isMouseDown  = false;  
    console.log("check")  
    console.log(this);
    this.style.zIndex = 3;
    this.style.left = (parseInt(this.oldLeft) ) + 'px';
    this.style.top = (parseInt(this.oldTop) ) + 'px';
    let des = document.elementFromPoint(e.clientX, e.clientY);
    console.log(des);
    des = des.classList.contains('NewsIndex')? des.parentNode : des.classList.contains('optionButton')? des.parentNode.parentNode : des == this? null : null
    if(des != null) {
        swapNode(this,des);
    }
    offDragEvent(this);
}

function handelMouseOut(e) {
    
}

function swapNode(node1,node2) {
    let temp = document.createElement('div');
    while(node1.firstChild) temp.append(node1.firstChild);
    while(node2.firstChild) node1.append(node2.firstChild);
    while(temp.firstChild) node2.append(temp.firstChild);
    
}

function copyNodeChildren(nodeFrom, nodeTo) {
    for (const node of nodeFrom.children) {
      nodeTo.appendChild(node);
    }
  }


function onDragEvent(obj) {    
    obj.addEventListener('mousedown',handelMouseDown);
    obj.addEventListener('mousemove',handelMouseMove);
    obj.addEventListener('mouseup',handelMouseUp);
    obj.addEventListener('mouseout',handelMouseOut);
}

function offDragEvent(obj) {
    obj.removeEventListener('mousedown',handelMouseDown);
    obj.removeEventListener('mousemove',handelMouseMove);
    obj.removeEventListener('mouseup',handelMouseUp);
    
}

let moveButtons = document.querySelectorAll('.moveNews');
for (const button of moveButtons) {
    button.addEventListener("mousedown",()=> {onDragEvent(button.parentNode.parentNode)})
}


