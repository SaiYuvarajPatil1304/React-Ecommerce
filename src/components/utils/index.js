const totalPrice = (arrayWithProducts) => {
  const finalPrice = arrayWithProducts.reduce((prices, product) => {
    return prices + product.price;
  }, 0);
  return finalPrice;
};

function filterBy(searchType, products, productSearchValue, productCategoryValue) {
  if (searchType === 'by_title') {
    return filteredProductsByTitle(products, productSearchValue);
  }
  if (searchType === 'by_category') {
    return filteredProductsByCategory(products, productCategoryValue);
  }
  if (searchType === 'title_and_category') {
    return filteredProductsByCategory(products, productCategoryValue).filter((product) => product.title.toLowerCase().includes(productSearchValue.toLowerCase()));
  }
  if (!searchType) {
    return products;
  }
}

function filteredProductsByTitle(arrayWithProducts, searchValue) {
  return arrayWithProducts?.filter((product) => product.title.toLowerCase().includes(searchValue.toLowerCase()));
}
function filteredProductsByCategory(arrayWithProducts, categoryValue) {
  return arrayWithProducts?.filter((product) => product.category.name.toLowerCase().includes(categoryValue.toLowerCase()));
}

export { totalPrice, filterBy };
