export const getDateFromFullDate = (fullDate) => 
    fullDate ? fullDate.substring(0, 10) : "No items";

export const handleBigOnePieceString = (str) => {
    let splitted_str = str.split(" ");
    let result = [];
    for (let i=0; i < splitted_str.length; i++) {
        let element = splitted_str[i];
        if (element !== "/" && element.length > 20) {
            result.push(handleString(element));
        } else {
            result.push(element);
        }
    }
    return result.join(" ");
}

const handleString = (input) => {
    const max_size = 10;
    const yardstick = new RegExp(`.{${max_size}}`, 'g');
    const pieces = input.match(yardstick);
    const accumulated = (pieces.length * max_size);
    const modulo = input.length % accumulated;
    if (modulo) pieces.push(input.slice(accumulated));
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
