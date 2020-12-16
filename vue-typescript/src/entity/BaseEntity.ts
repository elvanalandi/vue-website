import { deserialize, serialize, Deserialize, Serialize } from "cerialize";

export default abstract class BaseEntity {

    @serialize
    @deserialize
    public id: number = 0;

    public serialize(){
        return Serialize(this);
    }
}