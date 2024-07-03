
// function to swap array elements i.e. bars in visuals

function swap(bar1,bar2){
    let temp=bar1.style.height;
    bar1.style.height=bar2.style.height;
    bar2.style.height=temp;
}

// function to disable buttons while visualisation is running

function disableButtons(){
    document.querySelector("#array").disabled =true;
    document.querySelector("#size").disabled=true;
    document.querySelector("#bubble").disabled=true;
    document.querySelector("#merge").disabled=true;
    document.querySelector("#selection").disabled=true;
    document.querySelector("#heap").disabled=true;
    document.querySelector("#quick").disabled=true;
}

// function to enable buttons back after completion of visualisation

function enableButtons(){
    document.querySelector("#array").disabled =false;
    document.querySelector("#size").disabled=false;
    document.querySelector("#bubble").disabled=false;
    document.querySelector("#merge").disabled=false;
    document.querySelector("#selection").disabled=false;
    document.querySelector("#heap").disabled=false;
    document.querySelector("#quick").disabled=false;
}

// function for waiting time

function waitFor(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

let arrSize = document.querySelector("#size");
arrSize.addEventListener('input',function(){
    console.log(arrSize.value,typeof(arrSize.value));
    createNewArray(arrSize.value);
});

let delay = 260;
let delayElement = document.querySelector('#Speed');
console.log(delayElement.value);
delayElement.addEventListener('input', function(){
    delay = 320 - parseInt(delayElement.value);
});

let array=[];
createNewArray();

// function to create a new array of given size

function createNewArray(numBars=25){
    deleteprev();
    array=[];
    for(let i=0;i<numBars;i++){
        array.push(Math.floor(Math.random()*250)+1);
    }
    console.log(array);
    const bar=document.querySelector("#bars");
    let barwid=1000/numBars;
    for(let i=0;i<numBars;i++){
        const currentbar = document.createElement("div");
        currentbar.style.height=`${array[i]+150}px`;
        currentbar.style.width=`${barwid}px`;
        currentbar.classList.add('bar');
        currentbar.classList.add('flex-item');
        currentbar.classList.add(`barNo${i}`);
        bar.appendChild(currentbar);
    }
}

// deleting prev array 

function deleteprev(){
    const bar = document.querySelector("#bars");
    bar.innerHTML='';
}

const newarray = document.querySelector("#array");
newarray.addEventListener("click",function(){
    console.log("Clicked");
    enableButtons();
    createNewArray(parseInt(arrSize.value));
});

// bubble sort function

async function bubblesort(){
    let counter=1;
    const n=arrSize.value;
    const arr = document.querySelectorAll(".bar");
    while(counter<n){
        for(let i=0;i<n-counter;i++){
            arr[i].style.background='blue';
            arr[i+1].style.background='blue';
            await waitFor(delay);
            if(arr[i].style.height>arr[i+1].style.height){
                swap(arr[i],arr[i+1]);
            }
            arr[i].style.background='cyan';
            arr[i+1].style.background='cyan';
        }
        arr[n-counter].style.background='green';
        counter++;
    }
    arr[0].style.background='green';
    console.log('executed');
}

// selection sort function

async function selectionsort(){
    const n=arrSize.value;
    const arr = document.querySelectorAll(".bar");
    for(let i=0;i<n;i++){
        arr[i].style.background='blue';
        let minidx=i;
        for(let j=i+1;j<n;j++){
            arr[j].style.background='red';
            await waitFor(delay);
            if(arr[j].style.height<arr[minidx].style.height){
                if(minidx!==i){
                    arr[minidx].style.background='cyan';
                }
                minidx=j;
            }
            else{
                arr[j].style.background='cyan';
            }
        }
        await waitFor(delay);
        swap(arr[minidx],arr[i]);
        arr[minidx].style.background='cyan';
        arr[i].style.background='green';
    }
}

// merge function for mergesort

async function merge(arr,l,mid,r){
    let n1=mid+1-l;
    let n2=r-mid;
    let left = new Array(n1);
    let right=new Array(n2);
    for(let i=0;i<n1;i++){
        await waitFor(delay);
        arr[l+i].style.background='orange';
        left[i]=arr[l+i].style.height;
    }
    for(let i=0;i<n2;i++){
        await waitFor(delay);
        arr[mid+1+i].style.background='orange';
        right[i]=arr[mid+1+i].style.height;
    }
    await waitFor(delay);
    let i=0,j=0,k=l;
    while(i<n1 && j<n2){
        await waitFor(delay);
        if(left[i] < right[j]){
            if(n1+n2==arr.length){
                arr[k].style.background='green';
            }
            else{
                arr[k].style.background='lightgreen';
            }
            arr[k].style.height=left[i];
            i++;
            k++;
        }
        else{
            if(n1+n2==arr.length){
                arr[k].style.background='green';
            }
            else{
                arr[k].style.background='lightgreen';
            }
            arr[k].style.height=right[j];
            j++;
            k++;
        }
    }
    while(i<n1){
        await waitFor(delay);
        if(n1+n2==arr.length){
            arr[k].style.background='green';
        }
        else{
            arr[k].style.background='lightgreen';
        }
        arr[k].style.height=left[i];
        i++;
        k++;
    }
    while(j<n2){
        await waitFor(delay);
        if(n1+n2==arr.length){
            arr[k].style.background='green';
        }
        else{
            arr[k].style.background='lightgreen';
        }
        arr[k].style.height=right[j];
        j++;
        k++;
    }
}

// merge sort function

async function mergesort(arr,l,r){
    if(l<r){
        let mid = l+Math.floor((r-l)/2);
        await mergesort(arr,l,mid);
        await mergesort(arr,mid+1,r);
        await merge(arr,l,mid,r);
    }
}

// heapify function for max heap

async function maxheapify(arr,n,i){
    let largest = i;
    let l=(2*i)+1;
    let r=(2*i)+2;
    if(l<n && arr[l].style.height>arr[largest].style.height){
        largest=l;
    }
    if(r<n && arr[r].style.height>arr[largest].style.height){
        largest=r;
    }
    if(largest!=i){
        arr[i].style.background='blue';
        arr[largest].style.background='blue';
        await waitFor(delay);
        swap(arr[i],arr[largest]);
        await maxheapify(arr,n,largest);
        arr[i].style.background='cyan';
        arr[largest].style.background='cyan';
    }
}

// max heap sort function

async function heapsort(arr,n){
    let startidx= Math.floor(n/2)-1;
    for(let i=startidx;i>=0;i--){
        await waitFor(delay);
        await maxheapify(arr,n,i);
    }
    await waitFor(delay);
    arr[0].style.background='blue';
    for(let i=n-1;i>=0;i--){
        await waitFor(delay);
        arr[i].style.background='blue';
        swap(arr[0],arr[i]);
        await maxheapify(arr,i,0);
        arr[i].style.background='green';
    }
}

// quick sort function 

async function quicksort(arr,l,r){
    if(r<=l) return;
    let pi= await partition(arr,l,r);
    await quicksort(arr,l,pi-1);
    await quicksort(arr,pi+1,r);
}

// partition function

async function partition(arr,l,r){
    let pivot=arr[r].style.height;
    let i=l-1;
    for(let j=l;j<r;j++){
        await waitFor(delay);
        arr[j].style.background='blue';
        if(parseInt(arr[j].style.height)<parseInt(pivot)){
            i++;
            swap(arr[i],arr[j]);
            arr[i].style.background = 'cyan'; // Reset background color
        }
        else{
            arr[j].style.background = 'cyan'; // Reset background color
        }
    }
    swap(arr[i + 1], arr[r]);
    arr[i + 1].style.background = 'green'; // Color the pivot after placement
    return i + 1;
}

let btnbs = document.querySelector("#bubble");
btnbs.addEventListener("click",async function(){
    disableButtons();
    await bubblesort();
    enableButtons();
});

let btnss = document.querySelector("#selection");
btnss.addEventListener("click",async function(){
    disableButtons();
    await selectionsort();
    enableButtons();
})

let btnms=document.querySelector("#merge");
btnms.addEventListener("click",async function(){
    const arr=document.querySelectorAll(".bar");
    let l=0,r=arr.length-1;
    disableButtons();
    await mergesort(arr,l,r);
    enableButtons();
})

let btnhs=document.querySelector("#heap");
btnhs.addEventListener("click",async function(){
    const arr=document.querySelectorAll(".bar");
    let n=arr.length;
    disableButtons();
    await heapsort(arr,n);
    enableButtons();
})

let btnqs=document.querySelector("#quick");
btnqs.addEventListener("click",async function(){
    const arr=document.querySelectorAll(".bar");
    let n=arr.length;
    let l=0,r=n-1;
    disableButtons();
    await quicksort(arr,l,r);
    enableButtons();
})

