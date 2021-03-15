module.exports = {
  // 增
  insert (colName, insertData) {
    // return new Promise 包裹异步的操作，成功调用resolve即可
    return new Promise((resolve, reject) => {
      colName.insertMany(insertData, (err) => {
        if (err) throw err
        resolve()
      })
    })
  },
  // 删
  delete (colName, deleteData, deleteNum) {
    // 如果deleteNum的值为1，删除多条
    let deleteType = deleteNum === 1 ? 'deleteMany' : 'deleteOne'
    return new Promise((resolve, reject) => {
      colName[deleteType](deleteData, (err) => {
        if (err) throw err
        resolve()
      })
    })
  },
  // 改
  update (colName, whereData, updateData, updateNum) {
    let updateType = updateNum === 1 ? 'updateMany' : 'updateOne'
    return new Promise((resolve, reject) => {
      colName[updateType](whereData, updateData, (err) => {
        if (err) throw err
        resolve()
      })
    })
    
  },
  // 查
  find (colName, whereData, showData) {
    // return new Promise((resolve, reject) => {
    //   colName.find(whereData, showData, (err, data) => {
    //     if (err) throw err
    //     resolve(data)
    //   })
    // })
    return new Promise((resolve, reject) => {
      colName.find(whereData, showData).exec((err, data) => {
        if (err) throw err
        resolve(data)
      })
    })
  },
  // 排序
  sort (colName, whereData, showData, sortData) {
    return new Promise((resolve, reject) => {
      colName.find(whereData, showData).sort(sortData).exec((err, data) => {
        if (err) throw err
        resolve(data)
      })
    })
  },
  // 计数
  count (colName) {
    return new Promise((resolve, reject) => {
      colName.count().exec((err, data) => {
        if (err) throw err
        resolve(data)
      })
    })
  },
  // 查找某一字段的分类
  distinct (colName, type) {
    return new Promise((resolve, reject) => {
      colName.distinct(type).exec((err, data) => {
        if (err) throw err
        resolve(data)
      })
    })
  },
  // 分页
  paging (colName, whereData, showData, limit, count) { // count 的值从0开始，代表页数

    // limit 代表请求多少条数据
    // skip 代表从那一条开始
    // 页码   每页个数
    // 0     10
    // 10    10
    // 20    10
    return new Promise((resolve, reject) => {
      colName.find(whereData, showData).limit(limit).skip(count * limit).exec((err, data) => {
        if (err) throw err
        resolve(data)
      })
    })
  }
}