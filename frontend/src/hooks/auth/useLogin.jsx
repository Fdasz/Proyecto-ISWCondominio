import { useState, useEffect } from 'react';

const useLogin = () => {
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [inputData, setInputData] = useState({ email_usuario: '', password: '' });

    useEffect(() => {
        if (inputData.email_usuario) setErrorEmail('');
        if (inputData.password) setErrorPassword('');
    }, [inputData.email_usuario, inputData.password]);

    const errorData = (dataMessage) => {
        if (dataMessage.dataInfo === 'email_usuario') {
            setErrorEmail(dataMessage.message);
        } else if (dataMessage.dataInfo === 'password') {
            setErrorPassword(dataMessage.message);
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
        errorPassword,
        inputData,
        errorData,
        handleInputChange,
    };
};

export default useLogin;