module.exports = {
    // Function to generate a new ID
    newId: (howMany = 1) => {
        let idArray = [];
        const timestamp = Date.now().toString();
        let nonce = Math.floor(Math.random() * 10);
        for (let i = 0; i < howMany; i++) {
            idArray.push(timestamp + nonce.toString());
            nonce++;
        }
        if (howMany === 1)
            return idArray[0];
        return idArray;

    },
    // Function to generate a random 6 digit number
    randomSixDigitNumber: () => {
        return Math.floor(100000 + Math.random() * 900000);
    }
}