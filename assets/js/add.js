
let menubtn = document.querySelector(".menu")
let menuList = document.querySelector(".list")
let closebtn = document.querySelector(".close")

menubtn.addEventListener("click", () => {
    menuList.classList.add("active")
})
closebtn.addEventListener("click", () => {
    menuList.classList.remove("active")
})
let table = document.querySelector("table")
function getAll() {
    fetch("http://localhost:3000/all")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                table.innerHTML += `
            <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.price}</td>
            <td><button onclick="delete(${element.id})">DELETE</button></td>
            <td><button onclick="update(${element.id})">UPDATE</button></td>
            </tr>`
            });
        })
}
getAll()
let nameinput = document.querySelector(".name")
let infoinput = document.querySelector(".info")
let priceinput = document.querySelector(".price")
let fileinput = document.querySelector('input[type="file"]')
let btn = document.querySelector(".update")
let pleaceImg = document.querySelector(".pleaceimg")
let plus = document.querySelector(".plus")
let siqnal=document.querySelectorAll(".siqnal")
plus.addEventListener("click", () => {
    fileinput.click()
    fileinput.addEventListener("input", (e) => {
        let file = e.target.files[0]
        if (file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
                pleaceImg.src = reader.result
            }
        }
    })
})
function update(id) {
    axios.get(`http://localhost:3000/all/${id}`)
        .then(res => {
            nameinput.value = res.data.name;
            infoinput.value = res.data.info;
            pleaceImg.src = res.data.img;
            priceinput.value = res.data.price;
        });

    btn.addEventListener("click", () => {
        axios.patch(`http://localhost:3000/all/${id}`, {
            name: nameinput.value,
            info: infoinput.value,
            img: pleaceImg.src,
            price: priceinput.value
        })
            .then(response => {

                console.log(response);
            })
            .catch(error => {

                console.error(error);
            });
    });
}
btn.addEventListener("click", () => {
    if (nameinput.value.trim() && infoinput.value.trim() && priceinput.value.trim() && fileinput.value.trim()) {
        axios.post(`http://localhost:3000/all`, {
            name: nameinput.value,
            info: infoinput.value,
            img: pleaceImg.src,
            price: priceinput.value
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        let inputs = [nameinput, infoinput, fileinput, priceinput];
        inputs.forEach(input => {
            let selectinput = input.value.trim() == '' ? 'block' : 'none';
            input.previousElementSibling.style.display = selectinput; 
        });
    }
});
