const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const drinkRecipes = {
    "핫 에스프레소": { shot: 90, water: 0, ice: 0, milk: 0 },
    "아이스 에스프레소": { shot: 90, water: 0, ice: 150, milk: 0 },
    "핫 아메리카노": { shot: 90, water: 330, ice: 0, milk: 0 },
    "아이스 아메리카노": { shot: 90, water: 180, ice: 150, milk: 0 },
    "핫 라떼": { shot: 90, water: 0, ice: 0, milk: 330 },
    "아이스 라떼": { shot: 90, water: 0, ice: 150, milk: 180 },
};

function orderProcess() {
    rl.question("주문할 음료를 선택해주세요. ex.[아메리카노-핫-1]\n>> ", (orderString) => {
        const match = orderString.match(/([\w가-힣]+)-(핫|아이스)-(\d+)/);

        const orderData = {
            drink: match[1],
            type: match[2],
            quantity: parseInt(match[3], 10),
        };
        const recipe = { ...drinkRecipes[recipeKey] };

        rl.question("샷 용량을 입력해주세요.\n>> ", (shot) => {
            recipe.shot = parseInt(shot, 10);

            function finalizeOrder() {
                console.log(`${orderData.type} ${orderData.drink}가 만들어졌습니다!`);
                orderProcess();
            }

            if (orderData.drink.includes("아메리카노")) {
                rl.question("물 용량을 입력해주세요.\n>> ", (water) => {
                    recipe.water = parseInt(water, 10);
                    if (orderData.type === "아이스") {
                        rl.question("얼음 용량을 입력해주세요.\n>> ", (ice) => {
                            recipe.ice = parseInt(ice, 10);
                            finalizeOrder();
                        });
                    } else {
                        finalizeOrder();
                    }
                });
            } else if (orderData.drink.includes("라떼")) {
                rl.question("우유 용량을 입력해주세요.\n>> ", (milk) => {
                    recipe.milk = parseInt(milk, 10);
                    if (orderData.type === "아이스") {
                        rl.question("얼음 용량을 입력해주세요.\n>> ", (ice) => {
                            recipe.ice = parseInt(ice, 10);
                            finalizeOrder();
                        });
                    } else {
                        finalizeOrder();
                    }
                });
            } else {
                finalizeOrder();
            }
        });
    });
}

orderProcess();