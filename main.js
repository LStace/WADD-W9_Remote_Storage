
const DB_ENDPOINT = "https://script.google.com/macros/s/AKfycbxnhyQYwf3C_V4XHfgFo8hKr2beMNVIbrY6LwJ1ujUrFOsILWbj-keNNUgcQ22JP7HV/exec";

async function readData(table){
    const response = await fetch(`${DB_ENDPOINT}?table=${table}`);
    let data = await response.json();
    data = JSON.parse(data.data);
    console.log(data);
}

async function addData(table, dataTAdd) {
    try {
        // Step 1. Send a POST request to the database with the data to add
        const response = await fetch(`${DB_ENDPOINT}?table=${table}`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                action: "add",
                data: dataTAdd
            })
        });
        // Step 2. Convert the response to JSON format
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Error adding data:", error);
    }
}

async function updateData(table, dataToSelect, dataToUpdate) {
    try {
        const response = await fetch(`${DB_ENDPOINT}?table=${table}`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                action: "update",
                data: {
                    select: dataToSelect,
                    update: dataToUpdate
                }
            })
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Error adding data:", error);
    }
}

async function deleteData(table, dataToDelete) {
    try {
        const response = await fetch(`${DB_ENDPOINT}?table=${table}`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                action: "delete",
                data: {
                    select: dataToDelete
                }
            })
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Error adding data:", error);
    }
}

let img = new Image()

let myCanvas = document.createElement("canvas");
myCanvas.id="canvas";
document.getElementById("store").appendChild(myCanvas);

console.log(img);
//document.getElementById("store").appendChild(img);

async function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    saveImage()
  };
  img.src = "images/datadelete.png"
}

async function saveImage() {
    let dataURL = myCanvas.toDataURL();
    console.log(dataURL);

    addData("Table2", {
        ID: 2,
        ImageBlob: dataURL
    })
}

async function loadImage(table) {
    let searchParams = new URLSearchParams({
        table: "Table2",
        ID: 2
    })
    const response = await fetch(`${DB_ENDPOINT}?${searchParams}`);
    let data = await response.json();
    data = JSON.parse(data.data);
    console.log(data[15]);

    const img = new Image();
    console.log(img);
    const ctx = document.getElementById("canvas").getContext("2d");
    img.onload = () => {
        ctx.drawImage(img, 0, 0, 200, 200);
        console.log("drawn");
    };
    img.src = data[16].ImageBlob;
    document.body.appendChild(img);
}

//draw();

loadImage();

//saveImage();
//readData("Table2");




