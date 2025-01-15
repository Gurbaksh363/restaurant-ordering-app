import {menuArray} from '/data.js'

const menuItems = document.getElementById('menu-items')
const orderSection = document.getElementById('order-section')
const priceSpan = document.getElementById('price') 
const paymentSection = document.getElementById('payment-section')
const paymentForm= document.getElementById("payment-form")
const orderPlacedSection = document.getElementById('order-placed-section')
let price = 0


document.addEventListener('click', function(e){
    if(e.target.className === 'menu-item-add-btn'){
        placeOrder(e.target.id)
    }
    if(e.target.className === 'remove-btn'){
        removeOrder(e)
    }
    if(e.target.id ==='order-btn'){
        paymentSection.classList.remove('hidden')
    }
})

function placeOrder(id){
    const orderDetailsWrapper = document.getElementById('order-details-wrapper')
    orderSection.classList.remove('hidden')
    const orderedItem = menuArray.filter(function (itemObj){
        return itemObj.id === parseInt(id)
    })[0]
    price += parseInt(orderedItem.price)
    orderDetailsWrapper.innerHTML += `<div class='order-item'>
                        <span>${orderedItem.name} <button class='remove-btn' data-price="${orderedItem.price}">remove</button></span>
                        <span class='price'>$${orderedItem.price}</span>
                    </div>`
                    
    priceSpan.textContent = '$' +price        
    
}
function removeOrder(e){
        price -= parseInt(e.target.dataset.price)
        priceSpan.textContent = "$" +price
        e.target.parentElement.parentElement.remove()
        if (price===0){
            orderSection.classList.add("hidden")
        }
}

paymentForm.addEventListener("submit", function(e){
        e.preventDefault()
        paymentSection.classList.add('hidden')
        const paymentData = new FormData(paymentForm)
        const username = paymentData.get('username')
        orderSection.innerHTML = ""
        orderPlacedSection.classList.remove('hidden')
        orderPlacedSection.innerHTML = `<div class="order-placed-msg-wrapper">
                    <p>Thanks, ${username}! Your order is on its way!</p>
                </div>`
})

function getHTMLString(){
    return menuArray.map(function(item){
        return `<div class='menu-item-container'>
                <span class='menu-item-emoji'>${item.emoji}</span>
                <div>
                    <h2>${item.name}</h2>
                    <p class='menu-item-desc'>${item.ingredients.join(', ')}</p>
                    <p>$${item.price}</p>
                </div>
                <button id='${item.id}' class='menu-item-add-btn'>+</button>
            </div>`
        }
    ).join('')
}

menuItems.innerHTML = getHTMLString()

