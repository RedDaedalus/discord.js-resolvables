const EventEmitter = require("events");

class Provider extends EventEmitter {
    constructor(client) {
        super();
        this.client = client;
    }

    resolve(type, data) {
        super.emit("resolved", { type, data });
    }

    error(type) {
        super.emit("noResult", type);
    }

    resolveUser(user) {
        let resolved = this.client.users.find("name", user) || this.client.users.find("tag", user) || this.client.users.get(user);
        if (!resolved) {
            this.client.users.fetch(user.author ? user.author.id : user.id || user).then(() => {
                this.resolve("user", resolved);
            }).catch(() => this.error("user"));
        } else this.resolve("user", resolved);
    }
}

module.exports = Provider;