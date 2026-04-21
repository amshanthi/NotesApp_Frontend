function InputBox({ styles, type, placeholder, changeHandler, value }) {
  return (
    <>
      <input
        className={styles}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
      />
    </>
  );
}

export default InputBox;
