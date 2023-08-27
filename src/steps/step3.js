import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {step3} from "../validation";
import {useEffect} from "react";

const Step3 = ({handlePrev, handleNext, data}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        setValue
    } = useForm({resolver: yupResolver(step3), defaultValues: {}, mode: 'onChange'});

    const selectedPaymentMethod = watch('paymentMethod.type');
    const onSubmit = ({paymentMethod}) => {
        if (selectedPaymentMethod === 'pp') {
            delete paymentMethod.cardNumber
        } else {
            delete paymentMethod.email;
        }
        handleNext({paymentMethod});
    }
    useEffect(() => {
        if (data?.paymentMethod) {
            setValue('paymentMethod.type', data.paymentMethod?.type);
            if (data.paymentMethod?.email) setValue('paymentMethod.email', data.paymentMethod.email);
            if (data.paymentMethod?.cardNumber) setValue('paymentMethod.cardNumber', data.paymentMethod.cardNumber);
        }
    }, [setValue, data]);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Payment type:</label>
            <label>
                <input type="radio" {...register('paymentMethod.type')} value="pp"/>
                PayPal
            </label>
            <label>
                <input type="radio" {...register('paymentMethod.type')} value="cc"/>
                Credit Card
            </label>
            {errors.paymentMethod?.type && <p>{errors.paymentMethod.type.message}</p>}

            {selectedPaymentMethod === 'pp' && (
                <div>
                    <label>Email for PayPal</label>
                    <input type="text" {...register('paymentMethod.email')} />
                    {errors.paymentMethod?.email && <p>{errors.paymentMethod.email.message}</p>}
                </div>
            )}

            {selectedPaymentMethod === 'cc' && (
                <div>
                    <label>Card number (16 digits)</label>
                    <input type="number" {...register('paymentMethod.cardNumber')} />
                    {errors.paymentMethod?.cardNumber &&
                        <p>{errors.paymentMethod.cardNumber.message}</p>}
                </div>
            )}
            <div className="btn-container">
                <button type='button' onClick={handlePrev}>Prev</button>
                <button type='submit'>Next</button>
            </div>
        </form>
    );
};

export default Step3;
