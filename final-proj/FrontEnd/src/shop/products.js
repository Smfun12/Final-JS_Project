function getProducts() {
    let products = [
        {
            id: 1,
            description: "Some description 0",
            date: "Date 0",
            cost: 100,
            status: "Status 0",
            icon:'../images/klein.jpg',
        },
        {
            id: 2,
            description: "Some description 1",
            date: "Date 1",
            cost: 10,
            status: "Status 1",
            icon:'./images/cube.png',
        },
        {
            id: 3,
            description: "Some description 2",
            date: "Date 2",
            cost: 1,
            status: "Status 2",
            icon:'../images/mebius.jpg',
        },
        {
            id: 4,
            description: "Some description 3",
            date: "Date 3",
            cost: 200,
            status: "Status 3",
            icon:'../images/mebius.jpg',
        },
        {
            id: 5,
            description: "Some description 4",
            date: "Date 4",
            cost: 1,
            status: "Status 4",
            icon:'./images/mebius.jpg',
        },
        {
            id: 6,
            description: "Some description 5",
            date: "Date 5",
            cost: 200,
            status: "Status 5",
            icon:'../images/mebius.jpg',
        }
    ];
    return products;
}

exports.getProducts = getProducts;