function Button({ text, onClick = null, styles, type = null }) {
  return (
    <>
      <button className={styles} onClick={onClick} type={type}>
        {text}
      </button>
    </>
  );
}

export default Button;
