import { mockProducts } from '../data/products';

function adjustPrice(price: number): number {
  let newPrice = Math.round(price * 20);
  const unitsDigit = newPrice % 10;
  if (unitsDigit !== 9) {
    newPrice += (9 - unitsDigit);
  }
  return newPrice;
}

export function updateProductPrices() {
  mockProducts.forEach(product => {
    product.price = adjustPrice(product.price);
    product.originalPrice = adjustPrice(product.originalPrice);
  });
  console.log('Product prices updated:', mockProducts);
}

// Run the update function once
updateProductPrices();
