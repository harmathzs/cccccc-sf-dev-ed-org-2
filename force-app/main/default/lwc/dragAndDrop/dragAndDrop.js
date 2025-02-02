/* eslint-disable no-restricted-globals,no-unused-vars,@lwc/lwc/no-async-operation */
import {LightningElement, api, track, wire} from "lwc";
import {registerDragDropper, unregisterDragDropper} from "c/dragAndDropStore";
import TripPlannerDragAndDrop from 'c/tripPlannerDragAndDrop';

const animationTime = 100;

export default class DragAndDrop extends LightningElement {
    @api selectedSubtype;
    @api isLoading;
    @api name;
    @api label;
    @api placeholder;
    @api device
    @api mainpanel
    _type;

    @api get displayField() {
        return this._displayField;
    }

    set displayField(value) {
        this._displayField = value;
        for (const item of this._items) {
            item._dragDropName = item[this.displayField];
        }
    }

    @api get group() {
        return this._group;
    }

    @api get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    set group(value) {
        if (this.group != null) {
            unregisterDragDropper(this, this.group);
        }
        this._group = value;
        if (this._group) {
            this.dragAndDropStore = registerDragDropper(this, this.group);
        }
    }

    @api get items() {
        return this._items;
    }

    set items(items) {
        if (this.initialItems != null || items != null) {
            this._items = [];
            if (items) {
                for (const originalItem of items) {
                    let item = {...originalItem};
                    item.sourceItem = originalItem;
                    this.setFields(item);
                    this._items.push(item);
                }
            }
            if (this.initialItems == null) {
                this.initialItems = [...this._items];
            }
        }
    }

    @track _items = [];
    initialItems;
    _group = Math.floor(Math.random() * 1000000000);
    _displayField;
    id = Math.floor(Math.random() * 1000000000);
    dragAndDropStore;

    dragDropContainer;
    itemContainer;
    itemElements;
    unmovedElements = [];
    itemPlaceHolder;

    hasRendered = false;
    isItemDragEnabled = true;
    isItemContainerScrollingEnabled = true;
    isCtrlButtonPressed = false;
    isShiftButtonPressed = false;
    lastMouseY;
    lastMouseX;

    @api scrollMode = false;

    connectedCallback() {
        if (this.dragAndDropStore == null) {
            this.dragAndDropStore = registerDragDropper(this, this.group);
        }
    }

    setFields(item) {
        item._dragDropItemId = Math.floor(Math.random() * 1000000000);
        if (this.displayField != null) {
            item._dragDropName = item[this.displayField];
        } else if (item.Name != null) {
            item._dragDropName = item.Name;
        } else if (item.name != null) {
            item._dragDropName = item.name;
        } else if (item.Id != null) {
            item._dragDropName = item.Id;
        } else {
            item._dragDropName = item._dragDropItemId;
        }
        item._dragAndDropStyleClass = 'item';
        if (item.styleClass != null) {
            item._dragAndDropStyleClass += ' ' + item.styleClass;
        }
    }

    renderedCallback() {
        if (this.hasRendered === false) {
            addEventListener("keydown", this.keyDownListener);
            //addEventListener("keypress", this.keyPressListener);
            addEventListener("keyup", this.keyUpListener);
            addEventListener("touchend", this.touchEndListener);
            addEventListener("touchend", this.handleDrop);
            addEventListener("mousedown", this.mouseDownHandler);
            //addEventListener("wheel", this.handleWheel);
            addEventListener("blur", this.windowBlurHandler);

            /*addEventListener('mousemove', this.handleMouseMove, {passive: true});
            addEventListener('mouseup', this.handleDrapEnd);*/
            this.hasRendered = true;
        }
        this.dragDropContainer = this.template.querySelector(".drag-drop-container");
        this.itemContainer = this.dragDropContainer?.querySelector(".item-container");
        this.itemElements = this.itemContainer?.querySelectorAll(".item");
        //console.log('renderedCallback');
    }

    windowBlurHandler = event => {
        this.resetStoreItems();
        this.resetOwnItems();
        removeEventListener("mousemove", this.handleFirstDrag);
        removeEventListener("mousemove", this.handleDrag);
        removeEventListener("mouseup", this.handleDrop);
        removeEventListener("touchmove", this.handleFirstDrag);
        removeEventListener("touchmove", this.handleDrag);
        removeEventListener("touchend", this.handleDrop);
        this.dragAndDropStore.hasDragStarted = false;
        this.isItemDragEnabled = true;
        this.isItemContainerScrollingEnabled = false;
        this.isCtrlButtonPressed = false;
        this.isShiftButtonPressed = false;
    }

    handleWheel = (event) => {
        if (this.isItemContainerScrollingEnabled) {
            this.itemContainer.scrollTop = this.itemContainer.scrollTop + event.deltaY;
            if (this.isGuestItemInTheContainer) {
                let guestItemHeight = this.state.position.bottom - this.state.position.top;
                let top = this.state.position.top;
                for (let i = 0; i < this.itemElements.length; i++) {
                    if (top < this.itemElements[i].getBoundingClientRect().top) {
                        this.translateItem(this.itemElements[i], guestItemHeight, true);
                    } else {
                        this.translateItem(this.itemElements[i], 0, true);
                    }
                }
            } else {
                let newIndex = this.unmovedElements.length;
                let selectedItemBoundingClientRect = this.dragAndDropStore.selectedMainItem.getBoundingClientRect();
                for (let i = 0; i < this.unmovedElements.length; i++) {
                    if (selectedItemBoundingClientRect.top < this.unmovedElements[i].getBoundingClientRect().top) {
                        if (i < newIndex) {
                            newIndex = i;
                        }
                        this.translateItem(this.unmovedElements[i], selectedItemBoundingClientRect.height, true);
                    } else {
                        this.translateItem(this.unmovedElements[i], 0, true);
                    }
                }
                this.dragAndDropStore.selectedMainItem.currentIndex = newIndex;
            }
        }
    }

    handleContextMenu(e) {
        if (this.isCtrlButtonPressed || this.dragAndDropStore.hasDragStarted) {
            e.preventDefault();
        }
    }

    disconnectedCallback() {
        removeEventListener("keydown", this.keyDownListener);
        //removeEventListener("keypress", this.keyPressListener);
        removeEventListener("keyup", this.keyUpListener);
        removeEventListener("touchend", this.touchEndListener);
        removeEventListener("mousedown", this.mouseDownHandler);
        removeEventListener("mousemove", this.handleFirstDrag);
        removeEventListener("mousemove", this.handleDrag);
        removeEventListener("mouseup", this.handleDrop);
        removeEventListener("wheel", this.handleWheel)
        removeEventListener("blur", this.windowBlurHandler);
        unregisterDragDropper(this, this.group);
    }

    keyDownListener = e => {
        this.isCtrlButtonPressed = e.key === "Control";
        this.isShiftButtonPressed = e.key === "Shift";
        /*if (this.isShiftButtonPressed && this.dragAndDropStore.hasDragStarted && this.cloneable) {
            this.dragAndDropStore.selectedMainItem.style.cursor = "copy";
        }*/
    };

    keyUpListener = e => {
        if (e.key === "Control") {
            this.isCtrlButtonPressed = false;
        }
        if (e.key === "Shift") {
            this.isShiftButtonPressed = false;
            /*if (this.dragAndDropStore.selectedMainItem) {
                this.dragAndDropStore.selectedMainItem.style.cursor = "";
            }*/
        }
    };

    touchEndListener = e => {
        this.isLongTouch = false;
    };

    keyPressListener = e => {
        this.isCtrlButtonPressed = false;
    };

    mouseDownHandler = e => {
        if (this.dragAndDropStore.hasDragStarted === true) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }
        if (this.isItemDragEnabled === true) {
            for (const item of this.dragAndDropStore.selectedItems) {
                item.classList.remove("selected");
            }
            this.dragAndDropStore.selectedItems = [];
            this.dragAndDropStore.selectedMainItem = null;
        }
    };

    handleItemTouchStart = event => {
        if (this.scrollMode === true) return
        if (this.isItemDragEnabled === true) {
            event.preventDefault();
            event.stopPropagation();
            /*if (this.isCtrlButtonPressed) {
                let selectedItem = event.currentTarget;
                selectedItem.classList.toggle('selected');
                if (selectedItem.classList.contains('selected')) {
                    this.dragAndDropStore.selectedItems.push(selectedItem);
                } else {
                    this.dragAndDropStore.selectedItems = this.dragAndDropStore.selectedItems.filter(e => e !== selectedItem);
                }
                //console.log(`this.selectedItemElements`, this.dragAndDropStore.selectedItems);
            } else {
                this.lastMouseY = event.touches[0].clientY;
                this.lastMouseX = event.touches[0].clientX;
                this.dragAndDropStore.selectedMainItem = event.currentTarget;
                this.handleFirstItemInteraction()
            }*/
            this.lastMouseY = event.touches[0].clientY;
            this.lastMouseX = event.touches[0].clientX;
            this.dragAndDropStore.selectedMainItem = event.currentTarget;
            this.handleFirstItemInteraction();
        }
    };

//    handleToggleChange = event => {
//        console.log(event.target.checked);
//        this.scrollMode = event.target.checked;
//        console.log(this.scrollMode);
//    };

    handleItemMouseDown = (event) => {
        if (event.button !== 0 || this.scrollMode === true) {
            return;
        }
        if (this.isItemDragEnabled === true) {
            event.preventDefault();
            event.stopPropagation();
            if (this.isCtrlButtonPressed) {
                let selectedItem = event.currentTarget;
                selectedItem.classList.toggle("selected");
                if (selectedItem.classList.contains("selected")) {
                    this.dragAndDropStore.selectedItems.push(selectedItem);
                } else {
                    this.dragAndDropStore.selectedItems = this.dragAndDropStore.selectedItems.filter(e => e !== selectedItem);
                }
                //console.log(`this.selectedItemElements`, this.dragAndDropStore.selectedItems);
            } else {
                this.lastMouseY = event.clientY;
                this.lastMouseX = event.clientX;
                this.dragAndDropStore.selectedMainItem = event.currentTarget;
                this.handleFirstItemInteraction();
            }
        }
    };

    handleFirstItemInteraction() {
        try {
            addEventListener("mousemove", this.handleFirstDrag, {passive: true, once: true});
            addEventListener("mousemove", this.handleDrag, {passive: true});
            addEventListener("mouseup", this.handleDrop);
            addEventListener("touchmove", this.handleFirstDrag, {passive: true, once: true});
            addEventListener("touchmove", this.handleDrag, {passive: true});
            addEventListener("touchend", this.handleDragEnd);
            addEventListener("touchend", this.handleDrop);
            this.dragAndDropStore.itemsByIds = new Map();
            this.initItems();
            this.dragAndDropStore.selectedMainItem.classList.add("main");
            let boundingClientRect = this.dragAndDropStore.selectedMainItem.getBoundingClientRect();
            this.dragAndDropStore.selectedMainItem.yDiff = this.lastMouseY - boundingClientRect.top;
            this.dragAndDropStore.selectedMainItem.xDiff = this.lastMouseX - boundingClientRect.left;
            if (!this.dragAndDropStore.selectedMainItem.classList.contains("selected")) {
                this.dragAndDropStore.selectedItems.forEach(e => e.classList.remove("selected"));
                this.dragAndDropStore.selectedMainItem.classList.add("selected");
                this.dragAndDropStore.selectedItems = [this.dragAndDropStore.selectedMainItem];
            }

            this.dragAndDropStore.selectedItems.sort((a, b) => +a.dataset.index - +b.dataset.index);
            let selectedItemElementIndex = this.dragAndDropStore.selectedItems.indexOf(this.dragAndDropStore.selectedMainItem);
            let indexDiff = 1;
            // set top left distance from mouse position of selected items above main item
            for (let i = selectedItemElementIndex - 1; i >= 0; i--) {
                this.dragAndDropStore.selectedItems[i].yDiff = this.lastMouseY - boundingClientRect.top + (boundingClientRect.height * indexDiff);
                this.dragAndDropStore.selectedItems[i].xDiff = this.lastMouseX - boundingClientRect.left;
                indexDiff++;
            }
            indexDiff = 1;
            // set top left distance from mouse position of selected items under main item
            for (let i = selectedItemElementIndex + 1; i < this.dragAndDropStore.selectedItems.length; i++) {
                this.dragAndDropStore.selectedItems[i].yDiff = this.lastMouseY - boundingClientRect.top - (boundingClientRect.height * indexDiff);
                this.dragAndDropStore.selectedItems[i].xDiff = this.lastMouseX - boundingClientRect.left;
                indexDiff++;
            }
            this.dragAndDropStore.instancesWithSelectedItems = [this];
            this.unmovedElements = [];
            for (let i = 0; i < this.itemElements.length; i++) {
                let item = this.itemElements[i];
                if (!item.classList.contains('selected')) {
                    this.unmovedElements.push(item);
                }
            }
            for (let instance of this.dragAndDropStore.instances) {
                if (instance !== this) {
                    instance.initItems();
                    for (const element of instance.itemElements) {
                        if (!element.classList.contains('selected')) {
                            instance.unmovedElements.push(element);
                        } else if (!this.dragAndDropStore.instancesWithSelectedItems.includes(instance)) {
                            this.dragAndDropStore.instancesWithSelectedItems.push(instance);
                        }
                    }
                }
                instance.isItemContainerScrollingEnabled = true;
            }
            for (const item of this.dragAndDropStore.selectedItems) {
                let itemBoundingClientRect = item.getBoundingClientRect();
                item.style.height = itemBoundingClientRect.height + "px";
                item.style.width = itemBoundingClientRect.width + "px";
            }
            this.dragAndDropStore.selectedMainItem.originalIndex = Math.min(+this.dragAndDropStore.selectedMainItem.dataset.index, this.unmovedElements.length);
            this.dragAndDropStore.selectedMainItem.currentIndex = this.dragAndDropStore.selectedMainItem.originalIndex;
            this.itemContainer.originalScrollTop = this.itemContainer.scrollTop;
        } catch (error) {
            console.error(error);
        }
    }

    handleFirstDrag = event => {
        let mainItemBoundingClientRect = this.dragAndDropStore.selectedMainItem.getBoundingClientRect();
        this.itemPlaceHolder.style.display = 'block';
        this.itemPlaceHolder.style.height = mainItemBoundingClientRect.height + 'px';
        this.dragAndDropStore.hasDragStarted = true;
        for (let instance of this.dragAndDropStore.instances) {
            instance.itemContainer.classList.add('active');
        }
        for (const selectedItem of this.dragAndDropStore.selectedItems) {
            selectedItem.style.position = "fixed";
        }
        for (let i = this.dragAndDropStore.selectedMainItem.currentIndex; i < this.unmovedElements.length; i++) {
            this.translateItem(this.unmovedElements[i], mainItemBoundingClientRect.height, false);
        }
        for (let i = 0; i < this.dragAndDropStore.selectedItems.length; i++) {
            let selectedItemElement = this.dragAndDropStore.selectedItems[i];
            selectedItemElement.style.top = (this.lastMouseY - selectedItemElement.yDiff) + "px";
            selectedItemElement.style.left = (this.lastMouseX - selectedItemElement.xDiff) + "px";
        }
        this.isItemContainerScrollingEnabled = true;
    };

    handleDrag = event => {
        try {
            for (let i = 0; i < this.dragAndDropStore.selectedItems.length; i++) {
                let selectedItemElement = this.dragAndDropStore.selectedItems[i];
                selectedItemElement.style.top = (this.lastMouseY - selectedItemElement.yDiff) + "px";
                selectedItemElement.style.left = (this.lastMouseX - selectedItemElement.xDiff) + "px";
            }
            let mainItemBoundingClientRect = this.dragAndDropStore.selectedMainItem.getBoundingClientRect();
            let instance = this.getInstanceContainingTheMainItem();
            if (this.dragAndDropStore.lastActiveInstance != null && this.dragAndDropStore.lastActiveInstance !== instance) {
                for (const item of this.dragAndDropStore.lastActiveInstance.unmovedElements) {
                    this.translateItem(item, 0, false);
                }
                let placeholder = this.dragAndDropStore.lastActiveInstance.itemPlaceHolder;
                placeholder.style.display = 'none';
                placeholder.style.height = '';
                /*setTimeout(() => {
                  placeholder.style.display = 'none';
                  placeholder.style.height = '';
                }, animationTime);*/
            }
            if (instance != null) {
                if (this.dragAndDropStore.lastActiveInstance !== instance && instance.unmovedElements.length > 0) {
                    instance.itemPlaceHolder.style.display = '';
                    instance.itemPlaceHolder.style.height = mainItemBoundingClientRect.height + 'px';
                }
                for (const item of instance.unmovedElements) {
                    if (mainItemBoundingClientRect.top < item.getBoundingClientRect().top) {
                        this.translateItem(item, mainItemBoundingClientRect.height, true);
                    } else {
                        this.translateItem(item, 0, true);
                    }
                }
            }
            this.dragAndDropStore.lastActiveInstance = instance;

            if (event.touches) {
                this.lastMouseY = event.touches[0].clientY;
                this.lastMouseX = event.touches[0].clientX;
            } else {
                this.lastMouseY = event.clientY;
                this.lastMouseX = event.clientX;
            }

        } catch
            (error) {
            console.error(error);
        }
    };

    getInstanceContainingTheMainItem() {
        try {
            let mainItemBoundingClientRect = this.dragAndDropStore.selectedMainItem.getBoundingClientRect();
            let instanceToReturn = null;
            let mainItemAreaInInstance = -1;
            for (const instance of this.dragAndDropStore.instances) {
                let containerBoundingClientRect = instance.itemContainer.getBoundingClientRect();
                let itemContainerCoordsTop = containerBoundingClientRect.top;
                let itemContainerCoordsRight = containerBoundingClientRect.right;
                let itemContainerCoordsBottom = containerBoundingClientRect.bottom;
                let itemContainerCoordsLeft = containerBoundingClientRect.left;
                let isInTheContainer = itemContainerCoordsTop < mainItemBoundingClientRect.bottom && mainItemBoundingClientRect.top < itemContainerCoordsBottom &&
                    itemContainerCoordsLeft < mainItemBoundingClientRect.right && mainItemBoundingClientRect.left < itemContainerCoordsRight;
                if (isInTheContainer) {
                    let top = itemContainerCoordsTop < mainItemBoundingClientRect.top ? mainItemBoundingClientRect.top : itemContainerCoordsTop;
                    let bottom = itemContainerCoordsBottom < mainItemBoundingClientRect.bottom ? itemContainerCoordsBottom : mainItemBoundingClientRect.bottom;
                    let left = itemContainerCoordsLeft < mainItemBoundingClientRect.left ? mainItemBoundingClientRect.left : itemContainerCoordsLeft;
                    let right = itemContainerCoordsRight < mainItemBoundingClientRect.right ? itemContainerCoordsRight : mainItemBoundingClientRect.right;
                    let area = (bottom - top) * (right - left);
                    if (area > mainItemAreaInInstance) {
                        instanceToReturn = instance;
                        mainItemAreaInInstance = area;
                    }
                }
            }
            return instanceToReturn;
        } catch (error) {
            console.error(error);
        }
    }

    handleDrop = event => {
        try {
            if (event.button != null && event.button !== 0) {
                return;
            }
            //console.log('dragend',this.name);
            removeEventListener("mousemove", this.handleFirstDrag);
            removeEventListener("mousemove", this.handleDrag);
            removeEventListener("mouseup", this.handleDrop);
            removeEventListener("touchmove", this.handleFirstDrag);
            removeEventListener("touchmove", this.handleDrag);
            removeEventListener("touchend", this.handleDrop);

            if (this.dragAndDropStore.hasDragStarted === true) {
                this.isItemDragEnabled = false;
                let receiverInstance = this.getInstanceContainingTheMainItem();
                if (receiverInstance == null) {
                    for (const item of this.dragAndDropStore.selectedItems) {
                        this.moveItem(item, item.originalTop, item.originalLeft, true);
                    }
                    for (const instance of this.dragAndDropStore.instances) {
                        instance.resetOwnItems();
                    }
                    this.resetStoreItems();
                } else {
                    if (!this.dragAndDropStore.instancesWithSelectedItems.includes(receiverInstance)) {
                        this.dragAndDropStore.instancesWithSelectedItems.push(receiverInstance);
                    }
                    let selectedItemsTotalHeight = this.dragAndDropStore.selectedItems[this.dragAndDropStore.selectedItems.length - 1].getBoundingClientRect().bottom - this.dragAndDropStore.selectedItems[0].getBoundingClientRect().top;
                    let mainItemBoundingClientRect = this.dragAndDropStore.selectedMainItem.getBoundingClientRect();
                    let index = receiverInstance.unmovedElements.length;
                    let i = 0;
                    while (i < index) {
                        if (mainItemBoundingClientRect.top < receiverInstance.unmovedElements[i].getBoundingClientRect().top) {
                            index = i;
                        }
                        i++;
                    }
                    let itemsInNewOrder = [];
                    for (let i = 0; i < index; i++) {
                        let unmovedElement = receiverInstance.unmovedElements[i];
                        itemsInNewOrder.push(this.dragAndDropStore.itemsByIds.get(+unmovedElement.dataset.itemId).item);
                    }
                    for (const selectedItem of this.dragAndDropStore.selectedItems) {
                        //console.log(this.selectedSubtype);
                        //this.dragAndDropStore.itemsByIds.get(+selectedItem.dataset.itemId).item.Altipus__c = this.getSubtype();
                        itemsInNewOrder.push(this.dragAndDropStore.itemsByIds.get(+selectedItem.dataset.itemId).item);
                    }
                    for (let i = index; i < receiverInstance.unmovedElements.length; i++) {
                        let unmovedElement = receiverInstance.unmovedElements[i];
                        itemsInNewOrder.push(this.dragAndDropStore.itemsByIds.get(+unmovedElement.dataset.itemId).item);
                    }
                    receiverInstance._items = itemsInNewOrder;
                    for (const instance of this.dragAndDropStore.instances) {
                        if (this.dragAndDropStore.instancesWithSelectedItems.includes(instance)) {
                            if (instance !== receiverInstance) {
                                let items = [];
                                for (const unmovedElement of instance.unmovedElements) {
                                    items.push(this.dragAndDropStore.itemsByIds.get(+unmovedElement.dataset.itemId).item);
                                }
                                instance._items = items;
                            }
                            instance.fireItemsChangeEvent();
                        }
                        instance.resetOwnItems();
                    }
                }
            }
            this.resetStoreItems();
            this.dragAndDropStore.hasDragStarted = false;
            this.isItemContainerScrollingEnabled = false;
        } catch (error) {
            console.error(error);
        }
    };

    resetStoreItems() {
        if (this.dragAndDropStore.selectedMainItem) {
            this.dragAndDropStore.selectedMainItem.classList.remove("main");
            this.dragAndDropStore.selectedMainItem.style.cursor = "";
        }
        for (const selectedItem of this.dragAndDropStore.selectedItems) {
            selectedItem.style.transform = "";
            selectedItem.style.transition = "";
            selectedItem.style.position = "";
            selectedItem.style.top = "";
            selectedItem.style.left = "";
            selectedItem.style.width = "";
            selectedItem.style.height = "";
            selectedItem.classList.remove("selected");
        }
        this.dragAndDropStore.selectedMainItem = null;
        this.dragAndDropStore.selectedItems = [];
        this.dragAndDropStore.itemsByIds = null;
    }

    resetOwnItems() {
        for (const element of this.unmovedElements) {
            element.style.transform = "";
            element.style.transition = "";
            element.style.position = "";
            element.style.top = "";
            element.style.left = "";
            element.style.width = "";
            element.style.height = "";
        }
        this.unmovedElements = [];
        this.isItemDragEnabled = true;
        this.dragDropContainer.style.height = "";
        this.dragDropContainer.style.width = "";
        this.itemContainer.style.height = "";
        this.itemContainer.style.width = "";
        this.itemContainer.classList.remove('active');
        if (this.itemPlaceHolder) {
            this.itemPlaceHolder.style.display = 'none';
            this.itemPlaceHolder.style.height = '';
        }

        //this.publishItemDragIsDisabled(true);
    }

    initItems() {
        try {
            this.dragDropContainer = this.template.querySelector(".drag-drop-container");
            let boundingClientRect = this.dragDropContainer.getBoundingClientRect();
            //this.dragDropContainer.style.height = boundingClientRect.height + "px";
            //this.dragDropContainer.style.width = boundingClientRect.width + "px";
            this.itemContainer = this.dragDropContainer.querySelector(".item-container");
            //this.itemContainer.style.height = this.itemContainer.getBoundingClientRect().height + "px";
            //this.itemContainer.style.width = this.itemContainer.getBoundingClientRect().width + "px";
            this.itemElements = this.itemContainer.querySelectorAll(".item");
            this.itemPlaceHolder = this.template.querySelector('.item-place-holder');
            for (const item of this.itemElements) {
                let itemBoundingClientRect = item.getBoundingClientRect();
                item.originalTop = itemBoundingClientRect.top;
                item.originalLeft = itemBoundingClientRect.left;
            }
            if (this.dragAndDropStore.itemsByIds == null) {
                this.dragAndDropStore.itemsByIds = new Map();
            }
            for (const item of this._items) {
                this.dragAndDropStore.itemsByIds.set(item._dragDropItemId, {
                    item: item
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    isElementInTheOther(container, item) {
        let containerBoundingClientRect = container.getBoundingClientRect();
        let itemContainerCoordsTop = containerBoundingClientRect.top;
        let itemContainerCoordsRight = containerBoundingClientRect.right;
        let itemContainerCoordsBottom = containerBoundingClientRect.bottom;
        let itemContainerCoordsLeft = containerBoundingClientRect.left;
        let itemBoundingClientRect = item.getBoundingClientRect();
        let topBorderFromTop = itemBoundingClientRect.top;
        let bottomBorderFromTop = itemBoundingClientRect.bottom;
        let leftBorderFromLeft = itemBoundingClientRect.left;
        let rightBorderFromLeft = itemBoundingClientRect.right;
        return itemContainerCoordsTop <= bottomBorderFromTop && topBorderFromTop <= itemContainerCoordsBottom &&
            itemContainerCoordsLeft <= rightBorderFromLeft && leftBorderFromLeft <= itemContainerCoordsRight;
    }

    fireItemsChangeEvent(additionalData) {
        let items = [];
        for (const item of this._items) {
            //console.log(JSON.stringify(item))
            item.newItem = {...item.sourceItem}
            item.newItem.Altipus__c = item.Altipus__c;
            items.push(item.newItem);
        }
        let changeEvent = new CustomEvent("change", {
            detail: {items, ...additionalData},
            bubbles: true,
            composed: true
        });
        //console.log(`changeEvent.detail`, JSON.parse(JSON.stringify(changeEvent.detail)));
        this.dispatchEvent(changeEvent);
    }

    translateItem(item, px, withAnimation) {
        item.style.transition = "";
        if (withAnimation === true) {
            item.style.transition = `transform ${animationTime}ms`;
        }
        item.style.transform = "translate(0px, " + px + "px)";
    }

    moveItem(item, top, left, withAnimation) {
        item.style.position = "fixed";
        item.style.transform = "";
        item.style.transition = "";
        if (withAnimation) {
            item.style.transition = `left ${animationTime}ms, top ${animationTime}ms`;
        }
        item.style.top = top + "px";
        item.style.left = left + "px";
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    handleDragIconOnTouchStart() {
        this.scrollMode = false;
    }

    handleDragIconOnTouchEnd() {
        this.scrollMode = true;
    }

    get isDesktop() {
        return this.device === 'Windows';
    }

    getSubtype() {
        if (this.selectedSubtype == 'Normál látogatás') {
            this.selectedSubtype = 'Integráció/Akvizíció';
        } else if (this.selectedSubtype == 'Integráció/Akvizíció') {
            this.selectedSubtype = 'Refit-Refresh';
        } else {
            this.selectedSubtype = 'Normál látogatás';
        }
        return this.selectedSubtype;
    }
}