const stores = {}

function registerDragDropper(thisArg, name) {
    if (name != null) {
        if (!stores[name]) {
            let store = {
                hasDragStarted: false,
                instances: [],
                instancesWithSelectedItems: [],
                selectedItems: [],
                selectedMainItem: null,
                lastActiveInstance: null,
                itemsByIds: null,
            }
            stores[name] = store;
            //console.log('registering store:', store)
        }
        stores[name].instances.push(thisArg);
        return stores[name];
    }
    console.error('missing store name');
    return null;
}

function unregisterDragDropper(thisArg, name) {
    if (name) {
        if (stores[name]) {
            stores[name].instances = stores[name].instances.filter(e => e.subscriber !== thisArg);
        }
    } else {
        for (let store in stores) {
            stores[store].instances = stores[store].instances.filter(e => e.subscriber !== thisArg);
        }
    }
}

export {registerDragDropper, unregisterDragDropper}