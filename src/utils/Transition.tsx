import {forwardRef, ReactElement, Ref} from "react";
import {Fade, FadeProps} from "@mui/material";

export const Transition = forwardRef(function Transition(props: FadeProps & { children?: ReactElement<any, any> }, ref: Ref<unknown>) {
  return <Fade ref={ref} {...props} />
})