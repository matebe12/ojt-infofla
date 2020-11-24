<template>
<div>
    <div>
        <div class="category">
    <v-container fluid>
    
    <v-row align="center">

      <v-col
        class="d-flex"
        sm="2"
      >
        
      </v-col>
    </v-row>
  </v-container>
        </div>
        <div class="write">
            <v-row align="center">
                <v-col
                    class="d-flex"
                    cols="2"
                    sm="6"
                    
                >
            <v-select
                :items="item"
                label="카테고리"
                outlined
                v-model="CATEGORY"
                @change="changeCategory"
            ></v-select>
                </v-col>
            </v-row>
        </div>
    </div>
    <v-btn depressed @click="$router.push('/writeboard')" style="float: right">
                글쓰기
    </v-btn>
    <v-simple-table class="table">
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">
                Calories
            </th>
            <th class="text-left">
                No
            </th>
            <th class="text-left">
                Title
            </th>
            <th class="text-left">
                Writer
            </th>
            <th class="text-left">
                Date
            </th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="(item, index) in getPostList"
            :key="index"
            >
            <td>{{ item.POST_CATEGORY }}</td>
            <td>{{ item.POST_NO }}</td>
            <td><router-link :to="`/readboard/${item.POST_NO}`">{{item.POST_TITLE}}</router-link></td>
            <td>{{item.POST_WRITER}}</td>
            <td>{{item.CREATED_DT}}</td>
            </tr>
        </tbody>
        </template>
    </v-simple-table>
   
    <div class="pagination">
        <v-pagination
            v-model="page"
            :length="totalCNT"
            @input="changePage"
        ></v-pagination>
    </div>
</div>
  
</template>

<script>
import {getPosts} from '@/axios/board';
    export default {
        data() {
            return {
                CATEGORY:'공지사항',
                item: [
                '공지사항',
                '자유게시판',
                '건의사항'
                ],
                page:1
            }
        },
        
        computed: {
            getCompany(){
                return this.$store.state.user.USER_CORP;
            },
            getPostList(){
                console.log(this.$store.state.board);
                return this.$store.state.board.post;
            },
            totalCNT() {
                console.log(this.$store.state.board.CNT);
                if(this.$store.state.board.CNT <= 10) return 1;
                //console.log(this.$store.state.board.CNT / 10);
                return Math.ceil(this.$store.state.board.CNT / 10);
            },
        },
        methods: {
            
            async changePage(n){
                const reqData = {
                    USER_CORP:this.getCompany,
                    CURRENT_PAGE: n,
                    CATEGORY: this.CATEGORY
                };
                console.log(n);
                const result = await getPosts(reqData);
                this.$store.commit('setPostList',result);
            },
            
            async changeCategory(){
                const reqData = {
                    USER_CORP:this.getCompany,
                    CURRENT_PAGE: 1,
                    CATEGORY: this.CATEGORY
                };
                try {
                    const result = await getPosts(reqData);
                    this.$store.commit('setPostList',result);
                } catch (error) {
                    console.log(error);
                }
                
            }           
        },
        async mounted(){
            try {
                await this.changeCategory();
            } catch (error) {
                console.log(error);
            }
        }
    }
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
}
.table {
    margin-top: 5%;
    width: 1000px;
}
tr:nth-child(odd) {
    background-color: #eee;
}
tr:hover {
    opacity: 0.3;
}
.write {
}
</style>