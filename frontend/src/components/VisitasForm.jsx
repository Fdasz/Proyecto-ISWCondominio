import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '@styles/visitas_main.css';
import HideIcon from '../assets/HideIcon.svg';
import ViewIcon from '../assets/ViewIcon.svg';

const VisitasForm = ({ title, fields, buttonText, onSubmit, footerContent, useGrid = true }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const onFormSubmit = (data) => {
        onSubmit(data);
    };

    // Fix for select fields: ensure value is always included in data
    const watchedFields = watch();

    const renderInput = (field) => {
        if (field.readOnly) {
            return (
                <input
                    name={field.name}
                    placeholder={field.placeholder}
                    type={field.type}
                    value={field.value || ''}
                    readOnly
                    onClick={field.onClick}
                    className="visitas-input"
                />
            );
        }

        return (
            <input
                {...register(field.name, {
                    required: field.required ? 'Este campo es obligatorio' : false,
                    minLength: field.minLength ? { value: field.minLength, message: `Debe tener al menos ${field.minLength} caracteres` } : false,
                    maxLength: field.maxLength ? { value: field.maxLength, message: `Debe tener máximo ${field.maxLength} caracteres` } : false,
                    pattern: field.pattern ? { value: field.pattern, message: field.patternMessage || 'Formato no válido' } : false,
                    validate: field.validate || {},
                })}
                name={field.name}
                placeholder={field.placeholder}
                type={field.type === 'password' && field.name === 'password' ? (showPassword ? 'text' : 'password') :
                    field.type === 'password' && field.name === 'newPassword' ? (showNewPassword ? 'text' : 'password') :
                    field.type}
                defaultValue={field.defaultValue || ''}
                disabled={field.disabled}
                onChange={field.onChange}
                className="visitas-input"
            />
        );
    };

    return (
        <form
            className={`visitas-form ${useGrid ? 'visitas-form-grid' : ''}`}
            onSubmit={handleSubmit(onFormSubmit)}
            autoComplete="off"
        >
            {title && <h1 className="visitas-form-title">{title}</h1>}
            {fields.map((field, index) => (
                <div 
                    className={`visitas-field-container ${field.className || ''}`} 
                    key={index}
                >
                    {field.label && (
                        <label htmlFor={field.name} className="visitas-label">
                            {field.label}
                        </label>
                    )}
                    
                    {field.fieldType === 'input' && renderInput(field)}
                    
                    {field.fieldType === 'textarea' && (
                        <textarea
                            {...register(field.name, {
                                required: field.required ? 'Este campo es obligatorio' : false,
                                minLength: field.minLength ? { value: field.minLength, message: `Debe tener al menos ${field.minLength} caracteres` } : false,
                                maxLength: field.maxLength ? { value: field.maxLength, message: `Debe tener máximo ${field.maxLength} caracteres` } : false,
                                pattern: field.pattern ? { value: field.pattern, message: field.patternMessage || 'Formato no válido' } : false,
                                validate: field.validate || {},
                            })}
                            name={field.name}
                            placeholder={field.placeholder}
                            defaultValue={field.defaultValue || ''}
                            disabled={field.disabled}
                            onChange={field.onChange}
                            className="visitas-textarea"
                        />
                    )}
                    
                    {field.fieldType === 'select' && (
                        <select
                            {...register(field.name, {
                                required: field.required ? 'Este campo es obligatorio' : false,
                                validate: value => (value && value !== '') || 'Debes seleccionar una opción',
                            })}
                            name={field.name}
                            value={watchedFields[field.name] || ''}
                            disabled={field.disabled}
                            onChange={field.onChange}
                            className="visitas-select"
                        >
                            <option value="" disabled>Seleccionar opción</option>
                            {field.options && field.options.map((option, optIndex) => (
                                <option key={optIndex} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                    
                    {field.type === 'password' && field.name === 'password' && (
                        <span className="visitas-toggle-password" onClick={togglePasswordVisibility}>
                            <img src={showPassword ? ViewIcon : HideIcon} alt="Toggle password" />
                        </span>
                    )}
                    
                    {field.type === 'password' && field.name === 'newPassword' && (
                        <span className="visitas-toggle-password" onClick={toggleNewPasswordVisibility}>
                            <img src={showNewPassword ? ViewIcon : HideIcon} alt="Toggle password" />
                        </span>
                    )}
                    
                    <div className={`visitas-error-message ${errors[field.name] || field.errorMessageData ? 'visible' : ''}`}>
                        {errors[field.name]?.message || field.errorMessageData || ''}
                    </div>
                </div>
            ))}
            
            {buttonText && (
                <button type="submit" className="visitas-submit-button">
                    {buttonText}
                </button>
            )}
            
            {footerContent && (
                <div className="visitas-footer">
                    {footerContent}
                </div>
            )}
        </form>
    );
};

export default VisitasForm;
