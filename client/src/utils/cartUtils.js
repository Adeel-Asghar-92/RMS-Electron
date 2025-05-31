export const addItemToCart = (currentItems, product, quantity) => {
    const existingItemIndex = currentItems.findIndex(
      item => item._id === product._id
    );
  
    let updatedItems = [...currentItems];
    console.log("currentItems",currentItems);
    
    // let totalQuantity = currentItems.reduce((total, item) => total + item.orderQuantity, 0);
    // let totalAmount = currentItems.reduce((total, item) => total + (item.price * item.orderQuantity), 0);
  
    if (existingItemIndex > -1) {
      updatedItems[existingItemIndex] = {
        ...product,
        orderQuantity:  quantity,
        quantity: product.quantity - quantity
      };
    } else {
      updatedItems.push({ ...product, orderQuantity: quantity });
    }
    
    let totalQuantity = updatedItems.reduce((total, item) => total + item.orderQuantity, 0);
    let totalAmount = updatedItems.reduce((total, item) => total + (item.price * item.orderQuantity), 0);
    
    // totalQuantity += quantity;
    // totalAmount += product.price * quantity;
  
    return { 
      items: updatedItems, 
      totalQuantity, 
      totalAmount 
    };
  };
  
  export const removeItemFromCart = (currentItems, productId) => {
    const updatedItems = currentItems.filter(item => item._id !== productId);
    
    const totalQuantity = updatedItems.reduce((total, item) => total + item.orderQuantity, 0);
    const totalAmount = updatedItems.reduce((total, item) => total + (item.price * item.orderQuantity), 0);
  
    return { 
      items: updatedItems, 
      totalQuantity, 
      totalAmount 
    };
  };
  
  export const updateCartItemQuantity = (currentItems, product, newQuantity) => {
    const updatedItems = currentItems.map(item => 
      item._id === product._id 
        ? { ...product, orderQuantity: newQuantity }
        : item
    );
    const totalQuantity = updatedItems.reduce((total, item) => total + item.orderQuantity, 0);
    const totalAmount = updatedItems.reduce((total, item) => total + (item.price * item.orderQuantity), 0);
  
    return { 
      items: updatedItems, 
      totalQuantity, 
      totalAmount 
    };
  };
  