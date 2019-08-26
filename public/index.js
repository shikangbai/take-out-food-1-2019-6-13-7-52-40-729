// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释
$(function () {
  init();
})

function init() {
  // window.allItems = loadAllItems();
  // window.promotions = loadPromotions();
  // 初始化菜单
  allItems.forEach((value, index) => {
    let txt = "<div>" + "<span>" + value.id + "</span>" + "<span>" + value.name + "</span>" + "<span>" + value.price + "</span>";
    txt += "<input type = 'number' placeholder = '请输入需要购买的数量' min = '0' value = '0' >" + "</div>";
    $(".items-content").append(txt);
  });

  //初始化优惠列表
  promotions.forEach((value, index) => {
    let txt = "<div>" + "<span>" + value.type + "</span>";
    if (value.items == undefined) {
      txt += "全部"
    } else {
      txt += value.items.toString();
    }
    txt += "</div>"
    $(".promotions-content").append(txt);
  });
}

function clearAll() {
  $("#message").empty();
}


function calculatePrice() {
  if(!isVaildForm()) {
    alert("检查输入值");
    return;
  }
  //购物车列表
  let chooseItems = allItems;
  //总价
  let sum = 0;
  //从best-charge中返回的优惠情况对象
  let finalPrice;
  $(".items-content input").each(function (index) {
    if (this.value > 0) {
      chooseItems[index].count = parseInt(this.value);
      chooseItems[index].total = chooseItems[index].price * chooseItems[index].count;
      sum += chooseItems[index].total;
    }
  })
  //将未购买的商品删除
  chooseItems = removeNOCountItemByArr(chooseItems);
  console.log(chooseItems);
  console.log(sum);
  //得到优惠对象
  finalPrice = bestCharge(chooseItems, sum);
  console.log(finalPrice);
  //打印
  printReceipt(finalPrice, chooseItems);

}

function removeNOCountItemByArr(items) {
  let newItems = [];
  items.forEach((value) => {
    if (value.count != undefined) {
      newItems.push(value);
    }
  })

  return newItems;
}

function printReceipt(finalPrice, chooseItems) {
  $("#message").append("<h4>============= 订餐明细 =============</h4>")
  chooseItems.forEach((value, index) => {
    $("#message").append("<h4>" + value.name + " * " + value.count + " = " + value.total + " 元</h4>")
  })

  $("#message").append("<h4>-----------------------------------</h4>")
  $("#message").append("<h4>优惠情况:</h4>")
  if (finalPrice.usePromotions) {
    $("#message").append("<h4>" + finalPrice.type.type + ",优惠金额：" + finalPrice.shouldDisCount + "元</h4>")
    $("#message").append("<h4>-----------------------------------</h4>")
    $("#message").append("<h4>总计：" + finalPrice.oldPrice + "元" + "，优惠后：" + finalPrice.newPrice + "元</h4>")
    $("#message").append("<h4>===================================</h4>")
  } else {
    $("#message").append("<h4>没有优惠可享受</h4>")
    $("#message").append("<h4>-----------------------------------</h4>")
    $("#message").append("<h4>总计：" + finalPrice.oldPrice + "元")
    $("#message").append("<h4>===================================</h4>")
  }

}

function isVaildForm() {
  let flag = true;
  let sum = 0;
  $(".items-content input").each(function (index) {
    if (this.value < 0 || typeof(parseInt(this.value)) != "number") {
      flag = false;
    }else {
      sum += this.value;
    }
  })
  if(sum == 0) {
    return false;
  }
  return flag;
}
