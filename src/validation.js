import * as yup from "yup"

const step1 = yup.object().shape({
    fullName: yup
        .string()
        .required('Required field')
        .matches(/^[a-zA-Z ]*$/, 'Letters only')
        .test('at-least-two-words', 'Minimum 2 words', value => {
            const words = value.split(' ');
            return words.length >= 2;
        })
        .test('min-length', 'Minimum 3 symbols in each word', value => {
            const words = value.split(' ');
            return words.every(word => word.length >= 3);
        }),
});

const step2 = yup.object().shape({
    email: yup
        .string()
        .email('Wrong email format')
        .required('Required field'),
    password: yup
        .string()
        .min(8, 'Min 8 symbols')
        .matches(/[A-Z]/, '1 uppercase letter mandatory')
        .matches(/\d/, '1 letter mandatory')
        .required('Field is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must be equal')
        .required('Field is required'),
});
const step3 = yup.object().shape({
    paymentMethod: yup.object().shape({
        type: yup.string().required('Choose payment method'),
        email: yup
            .string()
            .when('type', {
                is: (val) => val === 'pp',
                then: () => yup
                    .string()
                    .email('Invalid email format')
                    .required('Field is required'),
            })
            .required('Field is required'),
        cardNumber: yup
            .string()
            .when('type', {
                is: (val) => val === 'cc',
                then: () => yup
                    .string()
                    .matches(/^\d{16}$/, '16 numbers only')
                    .required('Field is required'),
            }).required('Field is required')
    })
});

export {step1, step2, step3}
