import React from 'react';

const TextInput = ({ name, label, error, type = "text", onChange, ...otherProps }) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type={type}
          name={name}
          className="form-control"
          onChange={handleChange}
          {...otherProps} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput