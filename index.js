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
}

$(handleShoppingList)