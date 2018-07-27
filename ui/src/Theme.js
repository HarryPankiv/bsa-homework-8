import styled from 'styled-components'; 

export const FormTitle = styled.h3`
	display: block;
	text-align: center;
	color: palevioletred;
`

export const Title = styled.input`
	display: block;
	border: none;
	outline: none;
	background-color: transparent;
	font-size: 1em;
	width: 80%;
	
	font-family: 'Quicksand', sans-serif;
	&::placeholder {
		color: #3d3d3d
	}
`

export const Description = styled.textarea`
	display: block;
	border: none;
	outline: none;
	background-color: transparent;
	font-size: 1em;
	width: 80%;
	
	resize: none;
	font-family: 'Quicksand', sans-serif;
	&::placeholder {
		color: #3d3d3d
	}
`

export const Rating = styled.input`
	display: block;
	border: none;
	font-size: 1em;
	outline: none;
	background-color: transparent;
	font-family: 'Quicksand', sans-serif;
	width: 80%;
	
`

export const Form = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column wrap;
	width: 70%;
	color: #3d3d3d;
	margin: 0 auto;
`
export const Button = styled.button`
	display: block;
	width: 80px;
	border-radius: 55px;
	border: none;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;
	background: palevioletred;
	font-family: 'Quicksand', sans-serif;
	color: white;
`

export const Submit = styled.button`
	display: block;
`

export const Container = styled.div`
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
	align-items: center;
	font-family: 'Quicksand', sans-serif;
`
export const Row = styled.div`
	display: flex;
`
export const DishTitle = styled.h3`
	text-align: center;
`

export const DishField = styled.p`
	text-align: center;
`