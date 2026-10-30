import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import type { SliderDirection } from "../../../../types/movie";

interface SliderControlProps {
  arrowDirection: SliderDirection;
  onClick: () => void;
}

const SliderControl = ({ arrowDirection, onClick }: SliderControlProps) => {
  return (
    <div className={`slider-control ${arrowDirection}`}>
      <div className="slider-control-arrow" onClick={onClick}>
        {arrowDirection === "right" ? <FaChevronRight /> : <FaChevronLeft />}
      </div>
    </div>
  );
};

export default SliderControl;