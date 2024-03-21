// Code by #Guigui <@HastagGuigui>


// const basepath = "https://file.garden/ZRbeyspOlUzNliYE/test/"
const basepath = "https://file.garden/Ze38BlK6smwFJMcv/database/"
const placeholder = "https://kirbycreep.github.io/cantload.png"

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    } 
    console.error('Query Variable ' + variable + ' not found');
}

window.addEventListener('load', function() {
    let fullpath = basepath + getQueryVariable("file").split("-").join("/") + "/"
    load_data(
        fullpath + "data.json", 
        fullpath + "image.png"
    )
    document.getElementById("idnum").innerText = getQueryVariable("file")
    // console.error("balls")
})


async function load_data(url, image_url) {
    const options = {
        method: "GET"
    }
    load_pic(image_url)

    let jsonResponse = await fetch(url, options)

    if (jsonResponse.status === 200) {
        
        const jsonData = await jsonResponse.json()

        console.log(jsonData)

        document.getElementById("name").innerText = jsonData.name
        document.getElementById("lastname").innerText = jsonData.lastname
        if (jsonData.alias == "hidden"){
            document.getElementById("aliasfield").style = "display: none; visibility: collapse"
        }
        document.getElementById("alias").innerText = jsonData.alias
        document.getElementById("gender").innerText = jsonData.gender
        if (jsonData.isobject){
            document.getElementById("notobject").style = "display: none; visibility: collapse"
            document.getElementById("object-species").innerText = jsonData.species
        }else{
            document.getElementById("object").style = "display: none; visibility: collapse"
            document.getElementById("notobject-species").innerText = jsonData.species
        }
        document.getElementById("age").innerText = jsonData.age
        document.getElementById("birthday").innerText = jsonData.birth
        document.getElementById("occupation").innerText = jsonData.occupation
        document.getElementById("notes").innerText = jsonData.notes
        document.getElementById("card").style = ""
    }
    else {
        console.log("HTTP-Error: " + jsonResponse.status)
    }
}

async function load_pic(url) {

    const options = {
        method: "GET"
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        //selena gets hit by a car
        //-kirbv
        //const imageBlob = await response.blob()
        const imageObjectURL = url//URL.createObjectURL(imageBlob);

        const image = document.createElement('img')
        image.src = imageObjectURL

        const container = document.getElementById("image")
        container.append(image)
    }
    else {
        if (response.status == 404 && url != placeholder) {
            load_pic(placeholder)
        }
        console.log("HTTP-Error: " + response.status)
    }
}
