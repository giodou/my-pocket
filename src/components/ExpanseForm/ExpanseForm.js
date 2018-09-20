import React, { Component } from 'react';

import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import classes from './ExpanseForm.css';
import Input from '../UI/Input/Input';

import CheckValidity from '../../Helpers/InputValidationHelper';
import InputConfig from '../../Helpers/InputConfigHelper';

import axios from '../../axios';

class ExpanseForm extends Component {
    state = {
        expanseForm: {
            description: InputConfig('input', 'text', 'Descrição da conta, Ex: Aluguel', true), 
            type: InputConfig('select', null, null, true, [
                { value: 'fixed', displayValue: 'Fixa (Paga todo mês, ex: Luz)' },
                { value: 'unique', displayValue: 'Unica' },
                { value: 'parceled', displayValue: 'Parcelada' }
            ]), 
            value: InputConfig('input', 'number', 'valor da despesa', true),
            paymentDate: InputConfig('input', 'date', 'Date de vencimento', true), 
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
            expanseData: formData
        }

        axios.post( '/expanses.json', expanse )
            .then( response => {
                this.setState( { loading: false } );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedexpanseForm = {
            ...this.state.expanseForm
        };
        const updatedFormElement = {
            ...updatedexpanseForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = CheckValidity(updatedFormElement.value, updatedFormElement.validation);
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