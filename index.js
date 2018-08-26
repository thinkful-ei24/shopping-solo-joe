//Array with items to be rendered in the DOM when Document Ready Function runs,
//Should also be mutable in order to add/delete items
const STORE = [
	{name: 'Cow', checked: false},
	{name: '"Here comes Honey BooBoo" DVD, Season 6', checked: true},
	{name: 'Thai Durian Fruit', checked: false},
	{name: 'Fabreeze', checked: false},
];

//****** RENDERING OF SHOPPING LIST IN DOM ******************************************************/

//Generates an item element based on an object from the STORE array
function generateItemElement(item, itemIndex, template) {
	return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

//This generates a string based on item pushed into STORE, called from within renderShoppingList()
function generateShoppingItemString(shoppingList) {
	console.log('generateShoppingItemString is working');
	const items = shoppingList.map((item, index) => generateItemElement(item, index));
	return items.join();
}

//Will Render the initial shopping list on screen
function renderShoppingList() {
	console.log('renderShoppingList is working');
	const shoppingListItemString = generateShoppingItemString(STORE);

	//Insert HTML string into DOM
	$('.js-shopping-list').html(shoppingListItemString);
}

//****** ADDING NEW ITEM TO SHOPPING LIST  ************************************************/

//Takes item submitted by the form and pushes it into the STORE array
function addItemToShoppingList(itemName) {
	console.log(`Pushing ${itemName} to STORE via addItemToShoppingList()`);
	STORE.push({name: itemName, checked: false});
}

//Will add a new item when submit button is clicked
function handleNewItemSubmit() {
	$('#js-shopping-list-form').submit(function(event) {
		event.preventDefault();
		console.log('handleNewItemSubmit ran, calling addItemToShoppingList() to push to STORE');
		const newItemName = $('.js-shopping-list-entry').val();
		$('.js-shopping-list-entry').val('');
		addItemToShoppingList(newItemName);
		renderShoppingList();
	});
}

//****** ITEM "CHECKED" ATTR TOGGLING **************************************************/

//Toggle the Checked class through STORE
function toggleCheckedForListItem(itemIndex) {
	console.log(`Toggling check property at index # ${itemIndex}`);
	STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

//Get the Index integer from inside the DOM
function getItemIndexFromElement(item) {
	const itemIndexString = $(item)
		.closest('.js-item-index-element')
		.attr('data-item-index');
	return parseInt(itemIndexString, 10);
}

//Will check wether the "check" box is on or off, and will check item out if it's on
function handleItemCheckClicked() {
	$('.js-shopping-list').on('click', '.js-item-toggle', function(event) {
		console.log('handleItemCheckClicked is working');
		const itemIndex = getItemIndexFromElement($(this));
		toggleCheckedForListItem(itemIndex);
		renderShoppingList();
	});
}

//****** "DELETE" BUTTON FUNCTIONS *****************************************************/

//Will check wether the "delete" box has been pressed, and will delete item if it is
function handleItemDeleteClicked() {
	console.log('handleItemDeleteClicked is working');
}


//****** DOCUMENT READY FUNCTION CALLING ALL OF THE ABOVE ******************************/
//Document ready function that calls all the other components,
//Should render shopping list into DOM, add new items, check for checked items, and delete items
$( function handleShoppingList() {
	renderShoppingList();
	handleNewItemSubmit();
	handleItemCheckClicked();
	handleItemDeleteClicked();
}
);