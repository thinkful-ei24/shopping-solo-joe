const store = [
    {name: 'Apple', checked: false},
    {name: 'Banana', checked: false},
    {name: 'Milk', checked: true},
    {name: 'Cat', checked: false},
]

function renderShoppingList() {
    console.log("renderShoppingList is running");
}

function handleNewItemSubmit() {
    console.log("handleNewItemSubmit");
}

function handleItemCheckClicked() {
    console.log('handleItemCheckClicked ran');
}

function handleItemDeleteClicked() {
    console.log('handleItemDeleteClickedRan');
}

function handleShoppingList() {
    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleItemDeleteClicked();
    console.log('handleShoppingList')
}

$(handleShoppingList)