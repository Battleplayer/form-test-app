import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {step1} from "../validation";
import {useEffect} from "react";

const Step1 = ({handlePrev, handleNext, data}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({resolver: yupResolver(step1), defaultValues: {}, mode: 'onChange'});
    const onSubmit = ({fullName}) => {
        const saveData = fullName.split(' ');
        handleNext({firstName: saveData[0], lastName: saveData[1]});
    }

    useEffect(() => {
        if (data?.firstName && data?.lastName) {
            const fullName = `${data.firstName} ${data.lastName}`;
            setValue('fullName', fullName);
        }
    }, [setValue, data]);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Full Name
                <input {...register("fullName")} />
            </label>
            <p>{errors.fullName?.message}</p>
            <div className="btn-container">
                <button type='button' onClick={handlePrev}>Prev</button>
                <button type='submit'>Next</button>
            </div>
        </form>
    );
};

export default Step1;
