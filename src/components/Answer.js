export default function Answer(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#d6dbf5" : "#ffffff00",
    border: props.isHeld ? "1px solid #d6dbf5" : "1px solid #4d5b9e",
  };

  return (
    <div>
      <button className='answer' style={styles} onClick={props.clickHandler}>
        {props.value}
      </button>
    </div>
  );
}
