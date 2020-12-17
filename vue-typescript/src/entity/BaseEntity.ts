import * as lodash from "lodash";
import { deserialize, serialize, Deserialize, Serialize } from "cerialize";

export default abstract class BaseEntity {

    @serialize
    @deserialize
    public id: number = 0;

    public serialize(){
        return Serialize(this);
    }

    public clone() {
        return lodash.cloneDeep(this);
    }

    public static InstanceFrom(param: any) {
        return Deserialize(param, this);
    }

    private static OnNormalize(param: Object) {
        const invalid: Function = (p: any) => {
            if (lodash.isString(p) || lodash.isObject(p) && !lodash.isDate(p)) {
                return lodash.isEmpty(p);
            }

            if(lodash.isNumber(p)) {
                return p <= 0;
            }

            return lodash.isNil(p);
        }

        const parse: any = (p: any) => {
            if (!invalid(p)) {
                Object.keys(p).forEach((k: string) => {
                    if (invalid(p[k])) {
                        delete p[k];
                    } else if (Array.isArray(p[k])) {
                        p[k] = p[k].map(parse);
                    } else if (typeof p[k] === "object") {
                        p[k] = parse(p[k]);
                    }
                })
            }
            return p;
        }

        return Array.isArray(param) ? param.map(parse) : parse(param);
    }
}