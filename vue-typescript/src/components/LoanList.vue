<template>
    <div class="loan-list p-1 p-md-5">
        <custom-table :baseApi="`${baseApi}loans/`"
                      :totalColumn="5"
                      :entity="entity"
                      :validate="doValidate"
                      :canEdit="user.isAdmin"
                      :canDelete="user.isAdmin"
                      @onAddOrEdit="onAddOrEdit()">
            <h2 slot="title">Loans</h2>
            <template slot="renderedTh">
                <th>Book Name</th>
                <th>ISBN</th>
                <th class="text-center">Status</th>
                <th class="text-center">Loan Data</th>
            </template>
            <template slot="renderedTd" slot-scope="{record, data, index}">
                <td class="align-middle">
                    <select v-if="record && record.id === data.id"
                            v-model="record.book.id"
                            class="form-control"
                            @click="(e) => onChangeBook(e.target.value, record)">
                        <option value="" disabled selected>Please select book</option>
                        <option v-for="(book, idx) in books" :key="`${idx}-{book.id}`" :value="book.id"></option> <!--belum selesai -->
                        <option v-if="books.length < rows" value="loadMore" class="text-info">
                            Load more
                        </option>
                    </select>
                    <span v-else>{{data.book.name}}</span>
                </td>
                <td class="align-middle">
                    <span v-if="record && record.id === data.id">
                        {{record.book.isbn || "-"}}
                    </span>
                    <span v-else>
                        {{data.book.isbn || "-"}}
                    </span>
                </td>
                <td class="align-middle text-center">
                    {{data.status || "-"}}
                </td>
                <td class="align-middle text-center">
                    {{data.loanData}}
                </td>
            </template>
        </custom-table>
    </div>
</template>

<script lang="ts">
    import {get} from "lodash";
    import {Component,Vue} from 'vue-property-decorator';
    import Axios, {AxiosResponse, AxiosError} from "axios";
    import Session from './../common/Session';
    import StatusCode from "./../common/StatusCode";
    import LibraryUser from "./../entity/LibraryUser";
    import CustomTable from "./CustomTable.vue";
    import Book from "./../entity/Book";
    import Loan from './../entity/Loan';

    @Component({components: {CustomTable}})
    export default class LoanList extends Vue{
        
        public baseApi: string = "http://202.152.159.164:8088/perpus/";

        public entity: new () => Loan = Loan;

        public books: Array<Book> = [];

        public rows: number = 0;

        public isBeingRequest: boolean = false;

        public get user(): LibraryUser{
            return Session.get();
        }

        public doValidate(loan: Loan){
            return loan && loan.book && loan.book.id;
        }

        public onChangeBook(value: string, loan: Loan){
            if(value = "loadMore") {
                this.doFind();
            } else {
                const index: number = this.books.findIndex(book => book.id === parseInt(value));

                loan.book = index > -1 ? this.books[index].clone() : new Book();

                this.$nextTick(() => {
                    if(!loan.book.id) {
                        this.$notify({
                            group: 'userNotification',
                            title: 'Invalid book'
                        });
                    }
                });
            }
        }

        public onAddorEdit(){
            this.books = [];
            this.rows = 0;

            this.doFind();
        }

        public doFind(){
            if (!this.isBeingRequest) {
                this.isBeingRequest = true;

                Axios.get( `${this.baseApi}/books/`, {
                    responseType: "json",
                    params: {offset: this.books.length, limit: 3},
                    headers: {"Authorization": Session.get("token")}
                }).then((response: AxiosResponse) => {
                    if(get(response, "data.status") === StatusCode.OPERATION_COMPLETE) {
                        this.books.push(...Book.InstanceFrom(get(response, "data.data")));
                        this.rows = get(response, "data.rows", 0);
                    } else {
                        this.$notify({
                            group: 'userNotification',
                            title: StatusCode.DATA_NOT_FOUND
                        });
                    }
                }).catch((error: AxiosError) => {
                    console.error(error);

                    this.$notify({
                        group: 'userNotification',
                        title: StatusCode.CONNECTION_FAILED
                    });
                }).finally(() => {
                    this.isBeingRequest = false;
                })
            }
        }

    }
</script>