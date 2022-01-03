import styled from "styled-components";

export const Container = styled.View`
    padding: 14px;
`
export const Title = styled.Text`
    color: #fff;
    font-size: ${props=> props.size}px;
    font-weight: bold;
`
export const Rate = styled.Text`
color: #fff;
font-size:12px;
padding-left:4px;
`
export const RateContainer = styled.View`
flex-direction:row;
align-items:center;
padding: 8px 0;
`
export const ActionContainer = styled.View`
flex-direction:row;
align-items:center;
`
export const ButtonDetail = styled.TouchableOpacity`
width:85%;
height: 30px;
background-color:#e72f49;
justify-content:center;
align-items:center;
border-radius:30px;
`
export const ButtonDelete = styled.TouchableOpacity`
width:15%;
height: 30px;
justify-content:center;
align-items:center;
`