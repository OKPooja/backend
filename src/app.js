// const fs = require('fs');
const fs = require('fs/promises');

// fs.readFile("test_case.txt", "utf-8", (error, data) => {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(data);
//         console.log(data.length);
//     }
// });
fs.readFile("test_case.txt", "utf-8")
    .then((data) => {
        console.log(data)
    }).catch((error) => console.log(error));