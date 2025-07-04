import { useState, useEffect } from 'react';

const useRegister = () => {
    const [errorEmail, setErrorEmail] = useState('');
    const [errorRut, setErrorRut] = useState('');
    const [inputData, setInputData] = useState({ email_usuario: '', rut_usuario: '' });

    useEffect(() => {
        if (inputData.email_usuario) setErrorEmail('');
        if (inputData.rut_usuario) setErrorRut('');
    }, [inputData.email_usuario, inputData.rut_usuario]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'email_usuario') {
            setErrorEmail(dataMessage.message);
        } else if (dataMessage.dataInfo === 'rut_usuario') {
            setErrorRut(dataMessage.message);
        }
    };

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return {
        errorEmail,
        errorRut,
        inputData,
        errorData,
        handleInputChange,
    };
};

export default useRegister;