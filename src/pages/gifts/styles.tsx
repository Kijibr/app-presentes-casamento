import styled from "styled-components";

const Content = styled.div`
  background: "#f3f3f3";
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SearchBar = styled.div`  
  height: 44px;


  padding: 72px 0px;


  input{
    width: 640px;
    height: 100%;
    
    border: 4px solid orange;
    border-radius: 4px;
    
    font-size: 24px;
    font-weight: 100;
  }
`;

const WrapperItems = styled.div`
  background: #828e51;
  
  display: flex;
  
  gap: 32px;
  padding: 32px;

  flex-direction: row;
  
  align-items: center;
  position: relative;

  flex-wrap: wrap;
`;

const GiftBox = styled.div`
  display: flex;
  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  min-width: 420px;
  height: 240px;

  background-color: #f3f3f3;

  img {
    width: 100px;
    object-fit: contain;
  };
  
  span {
    border: 2px solid green;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    
    &:hover{
      background-color: rgb(224, 174, 66);
    }

    transition: all 0.5s;
  }
  
  border: 2px solid rgba(0, 0, 0, 0.256);
  border-radius: 8px;
`;

export { Content, WrapperItems, GiftBox, SearchBar };