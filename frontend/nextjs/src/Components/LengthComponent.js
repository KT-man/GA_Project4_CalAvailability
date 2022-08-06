import { useRecoilValue } from "recoil";
import { lengthState } from "../selectors/name";

function LengthComponent() {
  const length = useRecoilValue(lengthState);
  return <h3 className="length">{length}</h3>;
}

export default LengthComponent;
