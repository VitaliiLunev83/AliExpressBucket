window.addEventListener('DOMContentLoaded', () => {


    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');

    //open and close cart
    function openCart() {
        open.addEventListener('click', () => {
            cart.style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
    }

    function closeCart() {
        close.addEventListener('click', () => {
            cart.style.display = '';
            document.body.style.overflow = '';
        })
    }
    openCart();
    closeCart();
    //end close cart

    //add goods into cart
    goodsBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            const item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'),
                empty = cartWrapper.querySelector('.empty');


            trigger.remove();
            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);
            if (empty) {
                empty.style.display = 'none';
            } else {
                empty.style.display = 'block';
            }



            showConfirm();
            calcGoods();
            calcTotal();
            removeFromCart();

        });
    });
    //end goods into cart
    // cuts title
    function sliceTitle(titles) {
        titles.forEach((item) => {
            if (item.textContent.length < 70) {
                return;
            } else {
                const str = item.textContent.slice(0, 71) + '...';
                item.textContent = str;
            }
        });
    }
    sliceTitle(titles);
    //end cuts title
    //animation
    function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 10);

        function frame() {
            if (counter === 10) {
                clearInterval(id);
                confirm.style.display = 'none';
            } else {
                counter--;
                confirm.style.transform = `translateY(-${counter}px) `;
                confirm.style.opacity = '.' + counter;
            }
        }
    }
    //end animation
    //calcGoods
    function calcGoods() {
        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = items.length;
    }

    function calcTotal() {
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
        let total = 0;
        prices.forEach((item) => {
            total += +item.textContent;
        });
        totalCost.textContent = total;
    }
    //end calcGoods
    //remove from Cart
    function removeFromCart() {
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
        removeBtn.forEach((item) => {
            item.addEventListener('click', () => {
                item.parentElement.remove();
                calcGoods();
                calcTotal();







            });


        });
    }



});