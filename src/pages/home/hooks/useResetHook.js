/* node module imports */
import {useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

/* app imports */
import {performReset} from "@appReduxStore/reducers/counter/index.js";
import {deriveSelectedColor} from "@components/common/scripts/get-selected-color.js";

/* icons */
import resetIconWhite from "@appIcons/reset-icon-white.svg";
import resetIconBlack from "@appIcons/reset-icon-black.svg";

/* audio */
import resetAudioFile from "@appSounds/reset-sound.wav";

export const useResetHook = () => {
  /* declare */
  const colorConfig = useSelector((state) => deriveSelectedColor(state));
  const isMute = useSelector((state) => state.mute);
  const resetBtnRef = useRef();
  const dispatchToReduxStore = useDispatch();
  const resetIcon = {
    src: colorConfig.buttons === "white" ? resetIconWhite : resetIconBlack,
    className: "img-fluid center-block",
    alt: "Counter: Perform Reset",
    title: "Counter: Perform Reset"
  };

  /* event handler */
  useEffect(() => {
    const resetAudio = new Audio(resetAudioFile);
    const resetBtn = resetBtnRef.current;

    function handleOnClick() {
      dispatchToReduxStore(performReset());

      if (!isMute) {
        resetAudio.pause();
        resetAudio.currentTime = 0;
        resetAudio.play();
      }
    }
    resetBtn.addEventListener("click", handleOnClick);

    return () => {
      resetBtn.removeEventListener("click", handleOnClick);
    };
  }, [isMute]);

  /* expose api */
  return {resetBtnRef, resetIcon};
};
