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
		<button class="shopping-item-edit js-item-edit">
			<span class="button-label">edit</span>
		</butoon>
      </div>
    </li>`;
}

//This generates a string based on item pushed into STORE, called from within renderShoppingList()
function generateShoppingItemString(shoppingList) {
	console.log('generateShoppingItemString is working');
	const items = shoppingList.map((item, index) => generateItemElement(item, index));
	return items.join('');
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

//Get the Index integer from inside the DOM, used in Toggle and Delete Functions
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

//Deletes item from STORE array
function deleteItem(itemIndex) {
	console.log(`Deleting item at index # ${itemIndex}`);
	STORE.splice(itemIndex, 1);
}

//Will check wether the "delete" box has been pressed, and will delete item if it is
function handleItemDeleteClicked() {
	console.log('handleItemDeleteClicked is working');
	$('.js-shopping-list').on('click', '.js-item-delete', function(event) {
		const itemToDelete = getItemIndexFromElement($(this));
		deleteItem(itemToDelete);
		renderShoppingList();
	});
}

//****** CHECKBOX FOR "HIDE CHECKED ITEMS" ****************************/

//Loop through STORE and hide checked items
function checkedItemHider(list) {
	console.log('looping through to hide items');
	list.forEach(function(item) {
		if (item.checked) {$('.shopping-item__checked').closest('li').hide();}
	});
}

//Checks if checkbox is ticked or not
function checkBoxChecker() {
	return $('#js-hide-checked-items').prop('checked');
}

//Hides checked items when box is checked, if box gets unchecked, re-renders shoppinglist,
//revealing hidden items
function handleHideCheckedItems() {
	console.log('ready to use handleHideCheckedItems()');
	$('#js-hide-checked-items').click(function(event) {
		const isItChecked = checkBoxChecker();
		if( isItChecked === true) {
			checkedItemHider(STORE);
		} else {
			renderShoppingList();
		}
	});
}

//****** SEARCH FOR ITEMS IN THE LIST **************************************************/

//Filters STORE to only search items
// function filterToSearch(list) {
// 	list.filter(function() {
// 		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
// 	});
// }

//Search and filters items as it's being typed on the input field
function handleSearchOfItems() {
	console.log('Ready to search for items using handleSearchOfItems()');
	$('.js-shopping-list-entry').keyup(function() {
		const itemText = $(this).val().toLowerCase();
		$('.shopping-list li').filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(itemText) > -1);
		});
	});
}

//****** EDIT THE NAME BY CLICKING BUTTON **********************************************/

//Makes string HTML to add to button controls
function generateEditField() {
	return `
		<input type="text" name="edit-item-name" class="js-edit-item-name" placeholder="enter new name">
		<button class="change-name js-change-name">
			<span class="button-label"> Change Item </span>
		</button>
	`;
}

//Replaces the item name in the STORE array
function nameChanger(itemIndex) {
	const newName = $('.js-edit-item-name').val();
	STORE[itemIndex].name = newName;
}

//Allows user to edit the name of the item
function handleEditNameOfItem() {
	console.log('Ready to be able to edit item names with editNameOfItem()');
	$('.js-shopping-list').on('click', '.js-item-edit', function(event) {
		const itemToEdit = getItemIndexFromElement($(this));
		$('.shopping-item-controls').html(generateEditField);
		$('.js-change-name').click(function() {
			nameChanger(itemToEdit);
			renderShoppingList();
		});
	});
}

//****** DOCUMENT READY FUNCTION CALLING ALL OF THE ABOVE ******************************/
//Document ready function that calls all the other components,
//Should render shopping list into DOM, add new items, check for checked items, and delete items
$( function handleShoppingList() {
	renderShoppingList();
	handleNewItemSubmit();
	handleItemCheckClicked();
	handleItemDeleteClicked();
	handleHideCheckedItems();
	handleSearchOfItems();
	handleEditNameOfItem();
}
);