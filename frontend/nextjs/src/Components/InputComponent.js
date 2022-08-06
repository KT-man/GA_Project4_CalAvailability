import { useRecoilState } from "recoil";
import { nameState } from "../atoms/name";

function InputComponent() {
  const [name, setName] = useRecoilState(nameState);

  let handleChangeInput = (e) => {
    setName(e.target.value);
  };
  return (
    <input
      type="text"
      placeholder="Enter String"
      onChange={handleChangeInput}
      value={name}
    ></input>
  );
}

export default InputComponent;
