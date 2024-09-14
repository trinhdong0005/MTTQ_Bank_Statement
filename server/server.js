const express = require('express')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const cors = require('cors')

const app = express()
const port = 3000


// Sử dụng middleware cors
app.use(cors())

// Đọc dữ liệu từ file JSON
const filePath = path.join(__dirname, 'transactions.json')
let data = []

const title = 'Danh sách đóng góp cho MTTQVN'
const header = title
const content = 'Theo công bố của MTTQVN đến ngày 12/09/2024 bao gồm VCB, CTG, BIDV'

fs.readFile(filePath, 'utf8', (err, jsonData) => {
  if (err) {
    console.error('Lỗi khi đọc file:', err);
    return;
  }
  try {
    data = JSON.parse(jsonData);
  } catch (parseErr) {
    console.error('Lỗi khi phân tích dữ liệu JSON:', parseErr);
  }
});

// API để lấy dữ liệu
app.get('/api/data', (req, res) => {
  let { search, startDate, endDate, min, max, sortBy, order = 'asc', page = 1, pageSize = 10 } = req.query

  let results = data;

  // Sắp xếp
  if (sortBy) {
    results = _.orderBy(results, [sortBy], [order])
  }

  // Lọc theo khoảng
  if (min) {
    results = _.filter(results, item => {
      return item.amount >= min
    });
  }
  if (max) {
    results = _.filter(results, item => {
      return item.amount <= max
    });
  }

  //Lọc theo ngày
  if (startDate) {
    results = _.filter(results, item => {
      return new Date(item.date) >= new Date(startDate)
    });
  }
  if (endDate) {
    results = _.filter(results, item => {
      return new Date(item.date) <= new Date(endDate) 
    });
  }

  // Tìm kiếm
  if (search) {
    results = _.filter(results, item => {
      return Object.values(item).some(value => 
        value.toString().toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  // Phân trang
  page = parseInt(page, 10)
  pageSize = parseInt(pageSize, 10)
  const total = results.length
  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  results = results.slice(startIndex, endIndex)

  // Trả về dữ liệu
  res.json({
    content: {
      title,
      header,
      content
    },
    data: {
      page,
      pageSize,
      total,
      totalPages,
      results
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
