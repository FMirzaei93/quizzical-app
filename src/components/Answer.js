import { unEscape } from "../Utility";
export default function Answer(props) {
  // props:
  //        key
  //        value
  //        isHeld
  //        isCorrect
  //        clickHandler
  //        isChecked
  let styles;
  if (props.isChecked) {
    if (props.isCorrect) {
      //green
      styles = {
        backgroundColor: "#94D7A2",
        border: props.isHeld ? "1px solid #d6dbf5" : "1px solid #d6dbf5",
      };
    } else {
      if (props.isHeld) {
        //red
        styles = {
          backgroundColor: "#F8BCBC",
          border: props.isHeld ? "1px solid #d6dbf5" : "1px solid #d6dbf5",
        };
      }
    }
  } else {
    styles = {
      backgroundColor: props.isHeld ? "#d6dbf5" : "#ffffff00",
      border: props.isHeld ? "1px solid #d6dbf5" : "1px solid #4d5b9e",
    };
  }

  return (
    <div>
      <button className='answer' style={styles} onClick={props.clickHandler}>
        {unEscape(props.value)}
      </button>
    </div>
  );
}
