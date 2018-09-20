
const inputConfigHelper = (typeInput, typeInformation, placeholder, required, selectOptions) => {
    let config = {};

    switch (typeInput) {
        case 'input':
            config = {
                value: '',
                elementConfig: {
                    type: typeInformation,
                    placeholder: placeholder
                }
            }
            break;
        case 'select':
            config = {
                value: '',
                elementConfig: {
                    options: selectOptions
                }
            }
            break;
        default: config = {};
    }

    if (required) {
        config = {
            ...config,
            validation: {
                required: true
            },
        }
    } else {
        config = {
            ...config,
            validation: {},
        }
    }

    config = {
        elementType: typeInput,
        ...config,
        valid: false,
        touched: false
    }

    return config;
}

export default inputConfigHelper;