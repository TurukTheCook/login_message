<template>
<div>
  <div class="flex flex-column flex-wrap">
    <!-- PRIMARY ALERTS -->
    <div class="mx-auto w-100 p-1" :class="{'alert alert-danger': !success}" v-if="!success">
        {{message}}
    </div>
    <md-content class="flex flex-wrap justify-content-around">
    <md-card v-for="product in products" :key="product.id" class="mb-1 border-1 product-card" style="width: 400px">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title" style="white-space: nowrap; text-overflow: ellipsis; max-width: 150px; overflow: hidden">{{product.title}}</div>
          <div class="md-subhead" style="white-space: nowrap; text-overflow: ellipsis; max-width: 150px; overflow: hidden">{{product.userId}}</div>
          <md-divider class="my-1"></md-divider>
          <div style="max-width: 150px">{{descriptionTruncated(product.description)}}</div>
          <div class="mt-1" style="max-width: 150px">{{moment(product.creationDate)}} ({{momentFromNow(product.creationDate)}})</div>
          <div class="mt-1" style="max-width: 150px" v-if="product.address">{{product.address.country}}</div>
        </md-card-header-text>
        <md-card-media class="product-miniature flex flex-center" style="position: relative">
          <img :src="'http://localhost:1407/' + product.picture" v-if="product.picture">
          <img v-else src="http://via.placeholder.com/300x400/ff2c29/fff" alt="People">
          <div class="main-font text-white p-1" style="background-color: rgba(0,0,0, 0.4); position: absolute; bottom: 10px; right: 10px" v-if="product.price">{{'$ ' + product.price}}</div>
        </md-card-media>
      </md-card-header>

      <!-- <md-card-actions>
        <md-button>Action</md-button>
        <md-button>Action</md-button>
      </md-card-actions> -->
    </md-card>
    </md-content>
  </div>
</div>
</template>

<script>
import http from '@/helpers/http'
import moment from 'moment'
export default {
  name: 'ListOfProducts',
  data () {
    return {
      success: true,
      message: 'An error has occured..',
      products: []
    }
  },
  methods: {
    descriptionTruncated(arg) {
      if (arg && arg.length > 50) {
        let truncated = arg.substr(0, 50) + '...'
        return truncated
      } else return arg
    },
    getProducts() {
      http.get('products')
        .then(res => {
          this.products = res.data.content;
        })
        .catch(err => {
          this.success = err.response.data.success;
          this.message = err.response.data.message;
        })
    },
    moment: function(date) {
      return moment(date).format('Do MMMM')
    },
    momentFromNow: function(date) {
      return moment(date).fromNow()
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

