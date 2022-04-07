const Input = ({ name, type, errors, placeholder }) => {
  const useName = name.replace(/\s/g, "");
  return (
    <>
      <label htmlFor={useName} className="capitalize">
        {name}:{" "}
      </label>
      <input
        type={type}
        className={
          errors[useName]
            ? "outline-none p-2 border-2 border-red-400 focus:border-blue-400 rounded mt-3"
            : "outline-none p-2 border-2 focus:border-blue-400 rounded mt-3"
        }
        id={useName}
        name={useName}
        placeholder={placeholder}
      />
      <small className="mb-2 mt-1 text-red-300">
        {errors[useName] && errors[useName]}
      </small>
    </>
  );
};

export default Input;
