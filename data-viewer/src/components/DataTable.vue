<template>
  <div id="app" class="p-4 sm:p-6 md:p-10 bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Tiêu đề chính -->
      <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-center">{{ content.header }}</h1>
      <div class="text-sm sm:text-base text-center text-gray-600 mb-8" v-html="content.content"></div>

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
      <p class="text-gray-700 mb-2">Tổng cộng {{ isLoading ? 0 : data?.total ?? 0 }} kết quả</p>

      <!-- Bảng dữ liệu -->
      <div class="text-center" v-if="isLoading">
          <div role="status">
              <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>
      </div>
      <div class="overflow-x-auto" v-if="!isLoading">
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

      <div class="mt-6" v-if="!isLoading">
        <TablePagination :currentPage="query.page" :totalPages="data?.totalPages ?? 0"
          @update:currentPage="updatePage" />
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <p>Source code: <a href="https://github.com/trinhdong0005/MTTQ_Bank_Statement.git">MTTQ_Bank_Statement</a></p>
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
      isLoading: true,
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
    'query.search': {
      handler() {
        this.debouncedFetchData()
      },
      deep: true
    },
    'query.min': {
      handler() {
        this.debouncedFetchData()
      },
      deep: true
    },
    'query.max': {
      handler() {
        this.debouncedFetchData()
      },
      deep: true
    },
    'query.startDate': {
      handler() {
        this.fetchData()
      },
      deep: true
    },
    'query.endDate': {
      handler() {
        this.fetchData()
      },
      deep: true
    },
    'query.sortBy': {
      handler() {
        this.fetchData()
      },
      deep: true
    },
    'query.order': {
      handler() {
        this.fetchData()
      },
      deep: true
    },
    'query.page': {
      handler() {
        this.fetchData()
      },
      deep: true
    },
    'query.pageSize': {
      handler() {
        this.fetchData()
      },
      deep: true
    }
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true
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
        this.isLoading = false
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
    this.debouncedFetchData = debounce(() => {
      this.fetchData()
    }, 300)
  }
}
</script>

<style>
/* Add your styles here */
</style>