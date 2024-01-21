
let menubtn = document.querySelector(".menu")
let menuList = document.querySelector(".list")
let closebtn = document.querySelector(".close")
let search = document.querySelector(".search1")
let select = document.querySelector(".filter")
menubtn.addEventListener("click", () => {
    menuList.classList.add("active")
})
closebtn.addEventListener("click", () => {
    menuList.classList.remove("active")
})
let cards = document.querySelector(".cards1")
let allData = []
function allCards(data) {
    cards.innerHTML=""
    data.forEach(element => {
        let heartIcon
        if (element.isbasket) {
            heartIcon = "bi bi-heart-fill"
        } else {
            heartIcon = "bi bi-heart"
        }
        cards.innerHTML += ` <div class="card">
        <p class="heart"><i class="${heartIcon}" onclick="togglefav(${element.id}, ${element.isbasket})"></i>
        </p>
        <div class="img">
            <img src="${element.img}">
        </div>
        <div class="info">
            <p class="name">${element.name}</p>
            <p class="info1">${element.info}</p>
            <div class="button">
                <a href=""><button>View</button></a>
                <button onclick="addBasket(${element.id})">Add To Card</button>
            </div>
        </div>
    </div>`
    });
}
function addBasket(id, count1) {
    axios.get(`http://localhost:3000/all/${id}`)
        .then(res => {
            axios.get("http://localhost:3000/basket")
                .then(res1 => {
                    const { count = 1, ...restData } = res.data;

                    const dataToAdd = {
                        ...restData,
                        count
                    };

                    let existingItem = res1.data.find(item => item.id === res.data.id);

                    if (existingItem) {
                    
                        axios.patch(`http://localhost:3000/basket/${existingItem.id}`, {
                            count: existingItem.count + 1
                        });
                    } else {
                  
                        axios.post("http://localhost:3000/basket", dataToAdd);
                    }
                })
                .catch(error => {
                    console.error("Error retrieving basket data:", error);
                });
        })
        .catch(error => {
            console.error("Error retrieving item data:", error);
        });
}

function getAll() {
    fetch("http://localhost:3000/all")
        .then(res => res.json())
        .then(data => {
            allData = allData.concat(data)
            allCards(allData)
        })
}
search.addEventListener("input", (e) => {
    let searchTerm = e.target.value.toLowerCase();

    if (searchTerm) {
        const filteredData = allData.filter(element =>element.name.toLowerCase().includes(searchTerm));
        allCards(filteredData);
    } else {
        allCards(allData);
    }
});
select.addEventListener("change", (e) => {
    let sortData = [...allData]
    if (e.target.value == 'a-z') {
        let sortAz = sortData.sort((a, b) => a.name.localeCompare(b.name))
        allCards(sortAz)
    } else if (e.target.value == 'z-a') {
        let sortZa = sortData.sort((a, b) => b.name.localeCompare(a.name))
        allCards(sortZa)
    } else {
        allCards(sortData)
    }
})
getAll()
function togglefav(id, fav) {
    axios.patch(`http://localhost:3000/all/${id}`, { isbasket: !fav })
    window.location.reload()
}
