import { deserialize, deserializeAs, inheritSerialization, serialize, serializeAs } from "cerialize";
import BaseEntity from "./BaseEntity";
import Book from "./Book";

@inheritSerialization(BaseEntity)
export default class Loan extends BaseEntity {

    public static STATUS: any = {
        BORROWED: "BORROWED",
        RETURNED: "RETURNED"
    }
    @deserialize
    @serialize
    public status: string = "";

    @deserializeAs(Book)
    @serializeAs(Book)
    public book:Book = new Book();

    @deserialize
    public loanDate: string = new Date().toISOString().split('T')[0];
} 