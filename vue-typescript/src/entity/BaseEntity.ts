import { deserialize, serialize, Deserialize, Serialize } from "cerialize";

export default abstract class BaseEntity {
    public serialize(){
        return Serialize(this);
    }
}