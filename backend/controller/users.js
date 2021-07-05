const params = require("./params")
const mongo = require('../connecting/mongo')
// const client = mongo.client


const users = {
    async getAll(rs) {
        const data = await mongo.allData()
        rs.end(JSON.stringify(data, null, 2))
    },

    deleteOne(rq, rs) {
        params.pass(rq, async r => {
            await mongo.deleteData(r)
            rs.end(JSON.stringify({ message: `data with id ${r} was deleted!` }))
        })
    },

    updateOne(rq, rs) {
        params.pass(rq, async r => {
            // console.log(r)
            await mongo.updateData(r)
            rs.end(JSON.stringify({ message: `data was updated!` }))
        })
    },

    // add and search

    optionPost(rq, rs) {
        params.pass(rq, async r => {
            const size = Object.keys(r).length
            switch (size) {
                case 1:
                    const data = await mongo.search(r)
                    if (data) {
                        // console.log(data)
                        rs.end(JSON.stringify(data, null, 2))
                        return data
                    } else {
                        // console.log(data)
                        rs.end(JSON.stringify({ message: `Data Tidak Ditemukan!` }))
                    }
                break;
                case 12:
                    const dataPush = await mongo.pushData(r)
                    rs.end(JSON.stringify({ message: "Added!" }))
                    return dataPush
                break;
            }
        })
    }
}

module.exports = users