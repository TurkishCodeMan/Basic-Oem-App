<template>
  <div>
    <div class="header">
      <app-header></app-header>
    </div>
    <div class="content mt-3">
      <div class="card">
        <div class="card-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Name"
                  v-model="name"
                />
              </div>
              <div class="form-group col-md-6">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Price"
                  v-model="price"
                />
              </div>
            </div>
            <button
              @click="pushArray"
              type="submit"
              class="btn btn-primary btn-sm"
            >
              <i class="fas fa-plus"></i>Add
            </button>
            <button type="submit" class="btn btn-primary btn-warning btn-sm">
              <i class="far fa-edit"></i>Save-Changes
            </button>

            <button type="submit" class="btn btn-secondary btn-sm">
              <i class="fas fa-arrow-circle-left"></i>Cancel
            </button>
          </form>
        </div>
      </div>

      <div class="card-mt-3">
        <table class="table">
          <tbody id="item-list">
            <tr v-for="item in array" :key="item.index">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.price }} TL</td>
              <td class="text-right">
                <button
                  type="submit"
                  class="btn btn-primary btn-warning btn-sm"
                >
                  <i class="far fa-edit"></i>
                </button>
              </td>
              <td class="text-right">
                <button @click="deleteOem(item.id)" type="submit" class="btn btn-primary btn-danger btn-sm">
                  <i class="fas fa-times"></i>Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card mt-3">
        <div class="card-footer text-right">
          <p>Total (TL) <strong>{{toplamTL()}} TL</strong></p>
          <p>Total ($) <strong>{{toplamDolar()}} $</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import OemService from "../services/OemService";
export default {
  data() {
    return {
      array: [],
      name: "",
      price:"",
      id: 0
    };
  },
  components: { appHeader: Header },

  computed: {
    data() {
      return this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      try {
        this.array = await OemService.getAll();
        this.id = this.array.length
      } catch (error) {
        console.log(error);
      }
    },
    async pushArray() {
      let oem = {
        name: this.name,
        price: this.price,
        id: this.id + 1
      };
      await OemService.addOem(oem);
      this.name="",
      this.price=""
      this.fetchData();
    },
    async deleteOem(id) {
      await OemService.deleteOem(id);
      this.fetchData();
    },
    toplamTL(){
      let toplam=0;
       this.array.forEach(element => {
           toplam+=parseInt(element.price);
       });
       return Math.ceil(toplam);
    },
    toplamDolar(){
        return Math.floor(this.toplamTL()/7.8);
    }


  },
  async created() {
    this.fetchData();
  }
};
</script>

<style>
</style>