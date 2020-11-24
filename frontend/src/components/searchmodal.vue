<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <span>회사 등록 검색</span> 
          </div>

          <div class="modal-body">
              <v-text-field label="이름 검색" v-model="inputData"></v-text-field>
              <button>검색</button>
              <div class="table">
                  <table>
                      <thead>
                          <th>선택</th>
                          <th>회사 번호</th>
                          <th>회사 이름</th>
                      </thead>
                      <tbody>
                          <tr v-for="(corp,index) in corpList" :key="index">
                          <td><input type="radio" name="" id="" v-model="selectData" :value="corp.COMPANY_REG_NO"></td>
                          <td>{{corp.COMPANY_REG_NO}}</td>
                          <td>{{corp.CORP_NAME}}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

          <div class="modal-footer">
              <button class="modal-default-button" @click="close()">
                OK
              </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            inputData: '',
            selectData :[],
            corpList:[]
        }
    },
    methods: {
        close(){
            console.log('child' + this.selectData);
            this.$emit('close',this.selectData);
        }
    },
    async created(){
        const result = await axios.post("http://localhost:3000/graphql",{
            query: `
                    query{
                        getCorps{
                        CORP_ID
                        CORP_NAME
                        COMPANY_REG_NO
                        }
                    }
            `
        })
        console.log(result.data.data.getCorps);
        this.corpList = result.data.data.getCorps;
    }
}
</script>

<style scoped>
.modal-mask {
    margin-top: 3%;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
    display: flex;
    justify-content: space-between;
}

table, td, th{
    border: 1px solid;
    width: 400px;
    margin-top: 10%;
}
.modal-body {
  margin: 20px 0;
}
.modal-footer {
    margin-bottom: 15%;
}

.modal-default-button {
  float: right;
  width: 150px;
  height: 50px;
  border-radius: 2px;
  border:none;
  cursor: pointer;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>