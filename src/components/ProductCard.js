import {
  AddButton,
  AddButtonProps2,
  SubTitle,
  TextContainer,
  Title,
  Wrapper,
} from "./ProductCard.styled";

import { Product } from "../../models";
import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../Context/useContext";
import {
  FaHeart,
  FaRegHeart,
  FaCartPlus,
  FaShoppingCart,
} from "react-icons/fa";

export const ProductCard = ({ name, imageUrl, price, quantity }: Product) => {
  const { products, saved, removeItem, addToCart, removeToWL, addToWL } =
    useContext(ShopContext);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWish, setIsInWish] = useState(false);

  useEffect(() => {
    const cartItems = products.find(
      (product: { name: string }) => product.name === name
    );
    const wishItems = saved.find(
      (product: { name: string }) => product.name === name
    );

    if (cartItems && wishItems) {
      setIsInCart(true);
      setIsInWish(true);
    } else if (!cartItems && wishItems) {
      setIsInCart(false);
      setIsInWish(true);
    } else if (cartItems && !wishItems) {
      setIsInCart(true);
      setIsInWish(false);
    } else {
      setIsInCart(false);
      setIsInWish(false);
    }
  }, [products, saved, name]);

  const handleCart = () => {
    const product = { name, imageUrl, price, quantity };
    if (isInCart) {
      removeItem(product);
    } else {
      addToCart(product);
    }
  };

  const handleWish = () => {
    const product = { name, imageUrl, price, quantity };
    if (isInWish) {
      removeToWL(product);
    } else {
      addToWL(product);
    }
  };

  return (
    <Wrapper background={imageUrl}>
      <AddButton isInWish={isInWish} onClick={handleWish}>
        <p>{isInWish ? <FaHeart /> : <FaRegHeart />}</p>
      </AddButton>

      <AddButtonProps2 isInCart={isInCart} onClick={handleCart}>
        <p>{isInCart ? <FaCartPlus /> : <FaShoppingCart />}</p>
      </AddButtonProps2>
      <TextContainer>
        <Title>{name}</Title>
        <SubTitle>${price}.00</SubTitle>
      </TextContainer>
    </Wrapper>
  );
};
