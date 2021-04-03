export const getDateFromFullDate = (fullDate) => 
    fullDate ? fullDate.substring(0, 10) : "No items";

export const handleBigOnePieceString = (str) => {
    const max_size = 10;
    const yardstick = new RegExp(`.{${max_size}}`, 'g'); // /.{10}/g;
    const pieces = str.match(yardstick);
    const accumulated = (pieces.length * max_size);
    const modulo = str.length % accumulated;
    if (modulo) pieces.push(str.slice(accumulated));
    return pieces.join(" ");
}

export const getItemToAddOrUpdate = (itemName, folderToAddInto, serialNumber, category, description, itemPrice) => {
    let item = {
        itemName,
        folderId: folderToAddInto
    }
    if (serialNumber) {
        item = {...item, serialNumber: serialNumber.split(" ").join("")}
    }
    if (category) {
        item = {...item, categoryId: category}
    }
    if (description) {
        item = {...item, description}
    }
    if (itemPrice) {
        item = {...item, itemPrice}
    }
    return item;
}
