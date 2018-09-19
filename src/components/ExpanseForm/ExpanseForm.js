import React, { Component } from 'react';

import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import classes from './ExpanseForm.css';
import Input from '../UI/Input/Input';

class ExpanseForm extends Component {
    state = {
        expanseForm: {
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Descricão da despesa, Ex: Aluguel'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            type: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fixed', displayValue: 'Fixa (Paga todo mês, ex: Luz)' },
                        { value: 'unique', displayValue: 'Unica' },
                        { value: 'parceled', displayValue: 'Parcelada' }
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            value: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'valor da despesa'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            paymentDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Date de vencimento'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        loading: false
    }

    expanseHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.expanseForm) {
            formData[formElementIdentifier] = this.state.expanseForm[formElementIdentifier].value;
        }
        const expanse = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            expanseData: formData
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedexpanseForm = {
            ...this.state.expanseForm
        };
        const updatedFormElement = {
            ...updatedexpanseForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedexpanseForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedexpanseForm) {
            formIsValid = updatedexpanseForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ expanseForm: updatedexpanseForm, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.expanseForm) {
            formElementsArray.push({
                id: key,
                config: this.state.expanseForm[key]
            });
        }
        let form = (
            <form onSubmit={this.expanseHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Cadastrar despesa</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Informe os dados da despesa</h4>
                {form}
            </div>
        );
    }
}

export default ExpanseForm;