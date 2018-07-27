import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormTitle, Title, Description, Form, Container, Button, Row, Rating } from '../../Theme';

export default class RecipeForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: props.initialValues.title,
			description: props.initialValues.description,
			rating: props.initialValues.rating,
			disabled: false
		}
	}

	handleFieldChange = ({ target }) => {
		this.setState( state => ({
			...state,
			[target.name]: target.value
		}))
	}

	handleRatingChange = e => {
		let number = Number(e.target.value);
		if (number >= 0 && number <= 5 && Number.isInteger(number)) {
			const value = e.target.value;
			const inputValue = !value && value !== 0 ? '' : value;
			this.setState({rating: inputValue})
		}
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
		const { disabled, submitButtonTitle, cancelButtonTitle, title: formTitle, ratingInput } = this.props 
		const { title, description, rating } = this.state;

		return (
			<Container>
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
					{ ratingInput ? 
					<Rating type="number" value={rating} onChange={this.handleRatingChange}/> : null}
					
				</Form>
				<Row>
					<Button onClick={this.handleCancel}>{cancelButtonTitle}</Button>
					<Button onClick={this.handleSubmit} disabled={this.state.disabled}>{submitButtonTitle}</Button>
				</Row>
			</Container>
		)
	}
}

RecipeForm.defaultProps = {
	initialValues: {
		title: '',
		description: '',
		rating: 0
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
		description: PropTypes.string,
		rating: PropTypes.number
	})
}