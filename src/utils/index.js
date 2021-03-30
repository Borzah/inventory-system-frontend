export const getDateFromFullDate = (fullDate) => 
    fullDate.substring(0, 10);

export const handleBigOnePieceString = (str) => {
    const max_size = 10;
    const yardstick = new RegExp(`.{${max_size}}`, 'g'); // /.{10}/g;
    const pieces = str.match(yardstick);
    const accumulated = (pieces.length * max_size);
    const modulo = str.length % accumulated;
    if (modulo) pieces.push(str.slice(accumulated));
    return pieces.join(" ");
}
