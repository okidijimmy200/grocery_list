// select 5 elements and assigning them

const form = document.getElementById("input-form")
const input = document.getElementById("input-value")
const feedback = document.querySelector('.feedback')
const listItems = document.querySelector('.list-items')
const clearBtn = document.querySelector('.clearBtn')


// add event listeners
form.addEventListener('submit', function(event){
    // prevent default submit
    event.preventDefault();
    const value = input.value;

// check whether the value is empty o not
    if(value === '') {
        //  show feedback
        showFeedback(feedback, 'can not add empty value', 'alert-danger')
    }
    else {
        // 2 functions
        // 1) add to list
        addItem(value)

        //2)add to storage
        addStorage(value)
    }

})

// clear btn event listener
clearBtn.addEventListener('click', function(){
    // console.log(listItems.children)  // this returns number of properties for this list item
    while(listItems.children.length > 0) {
        listItems.removeChild(listItems.children[0]);
        //clear storage
/**in the local storage, we perform this action wen we r loggingin, for sessions, the infromation goes off the moment we close the browser */
        clearStorage()
    }
})

// deleting a particular item using event Propagation to reach the parent element

listItems.addEventListener('click', function(event){
    // console.log(event.target.parentElement)
    //if parent element has the class of remove-icon
    if(event.target.parentElement.classList.contains('remove-icon')){
        // move up the dom tree and get the actual parent of item
        let parent  = event.target.parentElement.parentElement;
        // console.log(parent);
        listItems.removeChild(parent);
        //remove the value from localStroage
        let text = event.target.parentElement.previousElementSibling.textContent;
        clearSingle(text)
    }
})
//load items from localStorage incase of a refresh
document.addEventListener('DOMContentLoaded', function(){
    loadItems()
})

//functions
// show feedback function, element--element we want, result is class we want from bootstrao either red for danger
function showFeedback(element, text, result){
    // element classList to add class to the result
    element.classList.add('showItem', `${result}`);
    element.innerHTML = `<p>${text}</p>`;
    // hide feedback after 3 seconds
    setTimeout(function(){
        // remove the class
        element.classList.remove('showItem', `${result}`);
    },3000)
}

//add item
function addItem(value){
    // create a div
    const div = document.createElement('div')
    div.classList.add('item', 'my-3', 'd-flex', 'justify-content-between', 'p-2');
    div.innerHTML = ` <h5 class="item-title text-capitalize">${value}</h5>
    <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>`
    //place the input items in the list items
    listItems.appendChild(div);
    // clear the input value
    input.value = '';
    // show feedback
    showFeedback(feedback, 'item added to the list', 'alert-success')
}


//func to add to localStorage
function addStorage(value) {
    let items;
// check if item is in local storage, if there, add items to array
    if(localStorage.getItem('grocery-list')) {
        items = JSON.parse(localStorage.getItem('grocery-list'))
    }
// if not create empty array
    else {
        items = [];
    }
    //push to array whether empty or not
    items.push(value);
    localStorage.setItem('grocery-list', JSON.stringify(items))
}   

//clear the item from localStroage
function clearStorage(){
    localStorage.removeItem('grocery-list')
}

// clear single item from local Storage
function clearSingle(value) {
    const tempItems = JSON.parse(localStorage.getItem('grocery-list'));
  
    const items = tempItems.filter(function(item){
        // callback func to check each item in the arrray
        if(item !== value){
            //if item matches the text
            return item
        }
    });
    localStorage.removeItem('grocery-list')
    //set the new grocery-list
    localStorage.setItem('grocery-list', JSON.stringify(items))
    
}

//load items
function loadItems() {
    if(localStorage.getItem('grocery-list')){
        const items = JSON.parse(localStorage.getItem('grocery-list'))
        // use forEach array
        items.forEach(function(item){
            //call the addItem
            const div = document.createElement('div')
            div.classList.add('item', 'my-3', 'd-flex', 'justify-content-between', 'p-2');
            div.innerHTML = ` <h5 class="item-title text-capitalize">${item}</h5>
            <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>`
            //place the input items in the list items
            listItems.appendChild(div);
        })
    }
}