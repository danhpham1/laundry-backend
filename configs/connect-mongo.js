const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/dongho",
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//     },
//     (err) => {
//         if (err) {
//             console.log('connect faild');
//         } else {
//             console.log('connect success');
//         }
//     }
// )

mongoose.connect("mongodb+srv://danh:hanhphucao@clusterblog.sbxju.mongodb.net/laundry?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) {
            console.log('connect faild');
        } else {
            console.log('connect success');
        }
    }
)