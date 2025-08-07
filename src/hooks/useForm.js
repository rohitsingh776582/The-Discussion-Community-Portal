
import { useState } from 'react';
const useForm = (initialValues = {}, validateFn, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const validate = (fieldValues = values) => {
    let tempErrors = validateFn(fieldValues);
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (isSubmitted) {
      validate({ ...values, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const isValid = validate();
    console.log("Form valid:", isValid);
    if (isValid) {
      console.log("Calling onSubmit with values:", values);
      onSubmit(); 
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitted(false);
  };
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
export default useForm;


