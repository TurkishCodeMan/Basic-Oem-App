const db = require("../../db.js");

// db.push("/arraytest/myarray[]/myTest", 'test', true);
// db.push("/arraytest/myarray[]/yourTest", 'test', true);


class OEM {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    save() {
        db.push(`/${process.env.OEM_DATABASE}/oem_parcalari[]`, this, true);

    }
    static delete(id) {
        console.log(id);
        db.delete(`/${process.env.OEM_DATABASE}/oem_parcalari[${db.getIndex(`/oemdb/oem_parcalari`,`${id}`)}]`);

    }
    static getAll() {
        return db.getData(`/${process.env.OEM_DATABASE}/oem_parcalari`)
    }
    

}

module.exports = OEM;