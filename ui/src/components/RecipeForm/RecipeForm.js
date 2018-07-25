import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'; 

const FormTitle = styled.h3`
	display: block;
	text-align: center;
	color: palevioletred;
`

const Title = styled.input`
	display: block;
	border: none;
	outline: none;
	background-color: transparent;
	width: 80%;
`

const Description = styled.textarea`
	display: block;
	border: none;
	outline: none;
	background-color: transparent;
	width: 80%;
	resize: none;
`

const Form = styled.form`
  	background: papayawhip;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column wrap;
	width: 70%;
	color: #3d3d3d;
	margin: 0 auto;
`
const Cancel = styled.button`
	display: block;
	width: 40px;
`

const Submit = styled.button`
	display: block;
`

export default class RecipeForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: props.initialValues.title,
			description: props.initialValues.description
		}
	}

	handleFieldChange = ({ target }) => {
		this.setState( state => ({
			...state,
			[target.name]: target.value
		}))
	}

	handleCancel = () => {
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	}

	handleSubmit = () => {
		if (this.props.onSubmit) {
			this.props.onSubmit(this.state)
		}
	}

	isSubmitAllowed() {
		return this.state.title && this.state.description
	}

	render() {
		const { disabled, submitButtonTitle, cancelButtonTitle, title: formTitle } = this.props 
		const { title, description } = this.state;

		return (
			<React.Fragment>
				<FormTitle>{formTitle}</FormTitle>
				<Form>
					<Title 
						label="Title"
						name="title"
						value={title}
						autoComplete="off"
						placeholder="name your dish"
						onChange={this.handleFieldChange}
						disabled={disabled}
					/>
					<Description
						label="Description"
						name="description"
						autoComplete="off"
						value={description}
						placeholder="Describe your dish"
						onChange={this.handleFieldChange}
						disabled={disabled}
					></Description>
				</Form>
				<Cancel onClick={this.handleCancel}>{cancelButtonTitle}</Cancel>
				<Submit onClick={this.handleSubmit}>{submitButtonTitle}</Submit>
			</React.Fragment>
		)
	}
}

RecipeForm.defaultProps = {
	initialValues: {
		title: '',
		description: ''
	}
}

RecipeForm.propTypes = {
	disabled: PropTypes.bool,
	title: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired	,
	submitButtonTitle: PropTypes.string.isRequired,
	cancelButtonTitle: PropTypes.string.isRequired,
	initialValues: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string
	})
}