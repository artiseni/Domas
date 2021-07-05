const {MongoClient} = require('mongodb')
const {ObjectId} = require('mongodb')
const uri = "mongodb+srv://imin:Algoritma95@cluster-domas.zza7s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


// show all data from mongo

async function allData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  try {
    await client.connect()
    const result = client.db('data_domas').collection('data').find({})
    if (result) {
      const data = await result.toArray()
      return data
    }
  } finally {
    await client.close()
  }
}

// add data to mongo

async function pushData(data) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  try {
    await client.connect()
    const res = await client.db('data_domas').collection('data').insertOne(data)
    return res
  } finally {
    await client.close()
  }
}

// delete data

async function deleteData(data) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  // console.log(data)
  try {
    await client.connect()
    const result = await client.db('data_domas').collection('data').deleteOne(data)
    return result
  } finally {
    await client.close()
  }
}

// update

async function updateData(data) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  // console.log(data)
  const parentKey = Object.keys(data[2])

  try {
    await client.connect()

    if (parentKey[0] === 'address') {
        const address = data[2][parentKey[0]]
        const rootKey = Object.keys(address)
        const val = data[2][parentKey[0]][rootKey[0]]
        const setAd = {$set : {[`${parentKey[0]}.${rootKey[0]}`] : val}}
        // console.log(setAd)
        const resultAd = await client.db('data_domas').collection('data').updateOne(data[0], setAd)
        return resultAd
    } else {
      const set = {$set : data[2]}
      // console.log(set)
      const result = await client.db('data_domas').collection('data').updateOne(data[0], set)
      return result
    }
  } finally {
    await client.close()
  }
}

// search

async function search(data) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  
  const key = Object.keys(data)[0]
  // console.log(key)

  try {
    await client.connect()

    if (key === 'nik') {
      const result = await client.db('data_domas').collection('data').findOne(data)
      if (result) {
        return result
      } else {
        // console.log(`NIK Tidak ditemukan!`)
        // console.log(result)
        return result
      }
    } else if (key === 'no_kk'){
      // console.log(data[key])
      const result = client.db('data_domas').collection('data').find(data)
      if (result) {
        
        const data = await result.toArray()
        // console.log(data.length)
        if (data.length === 0) {
          return null
        } else if (data.length === 1) {
          return data[0]
        } else {
          return data        
        }

      }
    }
  
  } finally {
    await client.close()
  }

}


// pass to users

const mongo = {
  allData : allData,
  pushData : pushData,
  deleteData : deleteData,
  updateData : updateData,
  search : search
}

module.exports = mongo

