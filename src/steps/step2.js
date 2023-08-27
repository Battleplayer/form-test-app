import {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {step2} from "../validation";

const Step2 = ({handlePrev, handleNext, data}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({resolver: yupResolver(step2), defaultValues: {}, mode: 'onChange'});

    const onSubmit = (data) => {
        handleNext(data);
    }

    useEffect(() => {
        if (data?.email && data?.password && data?.confirmPassword) {
            setValue('email', data.email);
            setValue('password', data.password);
            setValue('confirmPassword', data.confirmPassword);
        }
    }, [setValue, data]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email
                <input {...register('email')} />
            </label>
            {errors.email && <p>{errors.email.message}</p>}
            <label>Passwords
                <input type="password" {...register('password')} />
            </label>
            {errors.password && <p>{errors.password.message}</p>}
            <label>Confirm Passwords
                <input type="password" {...register('confirmPassword')} />
            </label>
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            <div className="btn-container">
                <button type='button' onClick={handlePrev}>Prev</button>
                <button type='submit'>Next</button>
            </div>
        </form>
    );
};

export default Step2;
