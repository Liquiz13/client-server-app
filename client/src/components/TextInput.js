import React from 'react';

const TextInput = ({ name, label, error, type = "text", onChange, ...otherProps }) => {
  let wrapperClass = `form-group${error && error.length > 0 ? 'has-error' : null}`;

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