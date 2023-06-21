// Array of Objects containing task Names, functions and their definitions, priority tags, length estimates;
// Priority Levels: 3 > 2 > 1 > 0
const tasks = [
    {
        taskName: "deliverPerscriptions",
        func: function() {
            console.log('Delivering prescriptions...');
        },
        priority: 0,
        time: 22
    },
    {
        taskName: "deliverPPE",
        func: function() {
            console.log('Delivering PPE...');
        },
        priority: 1,
        time: 40
    },
    {
        taskName: "deliverPatientSupplies",
        func: function() {
            console.log('Delivering Patient Supplies...');
        },
        priority: 2,
        time: 40
    },
    {
        taskName: "fetchItem",
        func: function() {
            console.log('Fetching item...');
        },
        priority: 1,
        time: 3
    },
    {
        taskName: "deliverMail",
        func: function() {
            console.log('Delivering Mail...');
        },
        priority: 0,
        time: 300
    },
    {
        taskName: "deliverPharmacy",
        func: function() {
            console.log('Delivering Pharmacy Supplies...');
        },
        priority: 1,
        time: 100
    },
    {
        taskName: "deliverLabTissue",
        func: function() {
            console.log('Delivering Lab and Tissue to the OR...');
        },
        priority: 3,
        time: 200
    },
    {
        taskName: "deliverBoneTissue",
        func: function() {
            console.log('Delivering Bone and tissue to the OR...');
        },
        priority: 3,
        time: 180
    },
];

module.exports = tasks;