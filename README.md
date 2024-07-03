# Sorting Visualiser
Great way to learn working of Sorting Algorithms.
Here I have added 5 sorting algorithms.

## 1. **Bubble Sort**

Bubble Sort is a straightforward sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It has a time complexity of **O(N*N)**
in the worst and average cases but can achieve **O(N)** in the best case if the list is already sorted. Despite its simplicity, Bubble Sort is inefficient for large datasets compared to more advanced sorting algorithms.  
Worst case Time complexity: **𝑂(N*N)** 

``` C++
//Code in C++
void bubbleSort(int arr[],int n){
    int cnt=1;
    while(cnt<n){
        for(int i=0;i<n-cnt;i++){
            if(arr[i]>arr[i+1]){
                swap(arr[i],arr[i+1]);
            }
        }
        cnt++;
    }
}
```

## 2. **Selection Sort**
Selection Sort is a simple sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly selects the smallest (or largest) element from the unsorted sublist and swaps it with the leftmost unsorted element. Selection Sort has a time complexity of **O(N*N)** in all cases, making it inefficient for large datasets but straightforward to implement and useful for small datasets or when auxiliary memory is limited.
Worst case Time complexity: **𝑂(N*N)** 

```C++
//Code in C++
void selectionSort(int arr[],int n){
    for(int i=0;i<n-1;i++){
        for(int j=i+1;j<n;j++){
            if(arr[j]<arr[i]){
                swap(arr[i],arr[j]);
            }
        }
    }
}
```
## 3. **Merge Sort**

ChatGPT
Merge Sort is a divide-and-conquer algorithm that recursively divides the input array into halves until each sublist contains a single element. It then merges adjacent sublists back together in sorted order. Merge Sort guarantees **O(N*logN)** time complexity in all cases due to its balanced partitioning and merging process, making it efficient for large datasets. However, it requires additional space proportional to the size of the input array for storing temporary sublists during merging.
Worst case Time complexity: **O(N*logN)**

```C++
//Code in C++
void merge(int arr[],int l,int mid,int r){
    int n1=mid+1-l;
    int n2=r-mid;
    int a[n1],b[n2];
    for(int i=0;i<n1;i++){
        a[i]=arr[l+i];
    }
    for(int i=0;i<n2;i++){
        b[i]=arr[mid+1+i];
    }
    int i=0,j=0,k=l;
    while(i<n1 && j<n2){
        if(a[i]<b[j]){
            arr[k]=a[i];
            i++;
            k++;
        }
        else{
            arr[k]=b[j];
            j++;
            k++;
        }
    }
    while(i<n1){
        arr[k]=a[i];
            i++;
            k++;
    }
    while(j<n2){
        arr[k]=b[j];
            j++;
            k++;
    }
}
void mergeSort(int arr[],int l,int r){
    if(l<r){
        int mid = (l+r)/2;
        mergeSort(arr,l,mid);
        mergeSort(arr,mid+1,r);
        merge(arr,l,mid,r);
    }
}
```

## 4. **Heap Sort**
Heap Sort is an efficient comparison-based sorting algorithm that transforms the input array into a max-heap (or min-heap). It repeatedly extracts the root element (which is the maximum in a max-heap or minimum in a min-heap), swaps it with the last element, and restores heap properties. Heap Sort has a time complexity of **O(N*logN)** in all cases and sorts the array in place, making it suitable for scenarios where stable sorting is not required and memory usage needs to be optimized.
Worst case time complexity: **O(N*logN)**

```C++
//Code in C++
void maxheapify(int arr[],int n,int i){
    int largest =i;
    int l=(2*i)+1;
    int r=(2*i)+2;
    
    if(l<n && arr[l]>arr[largest]){
        largest=l;
    }
    if(r<n && arr[r]>arr[largest]){
        largest=r;
    }
    if(largest!=i){
        swap(arr,i,largest);
        maxheapify(arr,n,largest);
    }
}
void heapsort(int arr[],int n){
    int startidx =(n/2)-1;
    for(int i=startidx;i>=0;i--){
        maxheapify(arr,n,i);
    }
    for(int i=n-1;i>=0;i--){
        swap(arr,0,i);
        maxheapify(arr,i,0);
    }
}
```

## 5. **Quick Sort**
Quick Sort is a highly efficient sorting algorithm based on divide-and-conquer principles. It selects a pivot element, partitions the array around the pivot, and recursively sorts the subarrays. Quick Sort typically operates in **O(N*logN)** time complexity on average, making it one of the fastest sorting algorithms in practice. However, its worst-case time complexity is **O(N*N)**, which occurs when the pivot selection consistently divides the array unevenly.
Worst case time complexity: **O(N*N)**

```C++
// code in C++

int partition(int arr[], int start, int end){
    int pivot = arr[start];
    int count = 0;
    for(int i = start + 1; i <= end; i++){
        if(arr[i] <= pivot)
            count++;
    }
    int pivotIndex = start + count;
    swap(arr[pivotIndex], arr[start]);
    int i = start, j = end;
    while(i < pivotIndex && j > pivotIndex){
        while(arr[i] <= pivot){
            i++;
        }
        while(arr[j] > pivot){
            j--;
        }
        if(i < pivotIndex && j > pivotIndex){
            swap(arr[i++], arr[j--]);
        }
    }
    return pivotIndex;
}
 
void quickSort(int arr[], int start, int end){
    if(start >= end) return;
    int p = partition(arr, start, end);
    quickSort(arr, start, p - 1);
    quickSort(arr, p + 1, end);
}
```
