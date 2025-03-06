import type { ComponentProps } from 'react'
import { BoxProps } from '@mui/material/Box'
import ReactDatePickerComponent from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { es } from 'date-fns/locale'
import DatePickerWrapper from "@/components/UserModal/DatePicker/DatePickerWrapper";

type Props = ComponentProps<typeof ReactDatePickerComponent> & {
  boxProps?: BoxProps
}

const AppReactDatepicker = (props: Props) => {
  const { boxProps, ...rest } = props

  return (
    <DatePickerWrapper {...boxProps}>
      <ReactDatePickerComponent {...rest} locale={es} timeCaption='Hora' showYearDropdown showMonthDropdown yearDropdownItemNumber={100}/>
    </DatePickerWrapper>
  )
}

export default AppReactDatepicker