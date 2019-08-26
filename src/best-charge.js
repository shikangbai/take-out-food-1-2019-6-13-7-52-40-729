function bestCharge(selectedItems, sum) {
  let calculateFirstPayTypePrice = calculateFirstPayType(selectedItems, sum);
  let calculateSecondPayTypePrice = calculateSecondPayType(selectedItems, sum)
  if (calculateFirstPayTypePrice > calculateSecondPayTypePrice) {
    return generateReturnObj(sum,calculateSecondPayTypePrice,1);
  } else {
    return generateReturnObj(sum,calculateFirstPayTypePrice,0);
  }

}

function calculateFirstPayType(selectedItems, sum) {
  if (sum >= 30) {
    return sum - parseInt(sum / 30) * 6;
  }
}

function calculateSecondPayType(selectedItems, sum) {
  console.log("===================");
  console.log(selectedItems);
  console.log(sum);
  let shouldDisCount = 0;
  selectedItems.forEach((value, index) => {
    if (promotions[1].items.indexOf(value.id) != -1) {
      shouldDisCount += value.price / 2 * value.count;
    }
  });
  console.log(sum - shouldDisCount);
  return sum - shouldDisCount;
}

function generateReturnObj(oldPrice, newPrice, type) {
  console.log(promotions[type]);
  return {
    usePromotions: oldPrice > newPrice,
    type: promotions[type],
    newPrice: newPrice,
    oldPrice : oldPrice,
    shouldDisCount : oldPrice-newPrice
  }
}
