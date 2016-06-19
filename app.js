// test file
var Parature = require("./lib/parature");
var myParature = new Parature({
    accountId: "accountId",
    departmentId: "departmentId",
    instance: "instance",
    token: "token"
});
myParature.execute("GET", "Tickets", "body");
