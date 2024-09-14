<template>
  <div id="app" class="p-4 sm:p-6 md:p-10 bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Tiêu đề chính -->
      <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-center">{{ content.header }}</h1>
      <p class="text-sm sm:text-base text-center text-gray-600 mb-8">
        {{ content.content }}
      </p>

      <!-- Bộ lọc -->
      <div class="filters flex flex-col sm:flex-row sm:space-x-4 mb-6">
        <div class="flex-1 mb-4 sm:mb-0">
          <label class="block text-sm font-medium text-gray-700">Tìm kiếm</label>
          <input v-model="query.search" placeholder="Tìm kiếm"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
        </div>

        <div class="flex-1 mb-4 sm:mb-0">
          <label class="block text-sm font-medium text-gray-700">Từ số tiền</label>
          <input v-model="query.min" placeholder="Từ số tiền" type="number" min="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
        </div>


        <div class="flex-1 mb-4 sm:mb-0">
          <label class="block text-sm font-medium text-gray-700">Đến số tiền</label>
          <input v-model="query.max" placeholder="Đến số tiền" type="number" min="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
        </div>
      </div>

      <div class="filters flex flex-col sm:flex-row sm:space-x-4 mb-6">
        <div class="flex-1 mb-4 sm:mb-0">
          <label class="block text-sm font-medium text-gray-700">Từ ngày</label>
          <input type="date" v-model="query.startDate"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
        </div>

        <div class="flex-1 mb-4 sm:mb-0">
          <label class="block text-sm font-medium text-gray-700">Đến ngày</label>
          <input type="date" v-model="query.endDate"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500" />
        </div>

        <div class="flex-1 mb-4 sm:mb-0">
          <label class="block text-sm font-medium text-gray-700">Sắp xếp theo</label>
          <select v-model="query.sortBy"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500">
            <option value="date">Ngày</option>
            <option value="amount">Số tiền (VND)</option>
            <option value="code">Document No</option>
          </select>
        </div>

        <div class="flex-1 mb-4 sm:mb-0">
          <label class="block text-sm font-medium text-gray-700">Thứ tự sắp xếp</label>
          <select v-model="query.order"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500">
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>

        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700">Số dòng trên trang</label>
          <select v-model="query.pageSize"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>
      </div>

      <!-- Kết quả -->
      <p class="text-gray-700 mb-2">Tổng cộng {{ data?.total ?? 0 }} kết quả</p>

      <!-- Bảng dữ liệu -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr>
              <th
                class="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Document No
              </th>
              <th
                class="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Ngày
              </th>
              <th
                class="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Số tiền (VND)
              </th>
              <th
                class="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Nội dung
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in data?.results" :key="item?.code">
              <td class="px-4 py-4 sm:px-6 sm:py-5 whitespace-nowrap">{{ item?.code }}</td>
              <td class="px-4 py-4 sm:px-6 sm:py-5 whitespace-nowrap">{{ formatDate(item?.date) }}</td>
              <td class="px-4 py-4 sm:px-6 sm:py-5 whitespace-nowrap">{{ currencyFormat(item?.amount) }}</td>
              <td class="px-4 py-4 sm:px-6 sm:py-5 whitespace-nowrap">{{ item?.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-6">
      <TablePagination :currentPage="query.page" :totalPages="data?.totalPages ?? 0"
        @update:currentPage="updatePage" />
    </div>

    <div class="flex justify-center mt-4">
      <p>Source code: <a href="https://github.com/trinhdong0005/MTTQ_Bank_Statement.git" class="text-sky-800">MTTQ_Bank_Statement</a></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { debounce } from 'lodash'
import TablePagination from './TablePagination.vue'

export default {
  components: {
    TablePagination
  },
  data() {
    return {
      query: {
        search: null,
        startDate: null,
        endDate: null,
        min: null,
        max: null,
        sortBy: 'date',
        order: 'desc',
        page: 1,
        pageSize: 10,
      },
      content: {
        title: '',
        header: '',
        content: ''
      },
      data: {
        page: 0,
        pageSize: 0,
        total: 0,
        totalPages: 0,
        results: []
      }
    }
  },
  watch: {
    query: {
      handler() {
        this.debouncedFetchData()
      },
      deep: true
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://var.dongdev.com/be/api/data', {
          params: {
            search: this.query.search,
            startDate: this.query.startDate ? new Date(new Date(this.query.startDate).setHours(0, 0, 0, 0)) : null,
            endDate: this.query.endDate ? new Date(new Date(this.query.endDate).setHours(23, 59, 59, 999)) : null,
            min: this.query.min,
            max: this.query.max,
            sortBy: this.query.sortBy,
            order: this.query.order,
            page: this.query.page,
            pageSize: this.query.pageSize
          }
        })
        this.content = response.data?.content
        this.data = response.data?.data
        if (this.data?.page > this?.data?.totalPages) {
          this.query.page = 1
        }
        document.title = this.content?.title
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    updatePage(page) {
      this.query.page = page
    },
    currencyFormat(num) {
      return num.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      })
    },
    formatDate(str) {
      const date = new Date(str)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
      const year = date.getFullYear()

      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }
  },
  created() {
    this.fetchData()
    this.debouncedFetchData = debounce(this.fetchData, 500)
  }
}
</script>

<style>
/* Add your styles here */
</style>