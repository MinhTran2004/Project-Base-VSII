import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTimePickerComponent.css';

interface DateTimePickerComponentProps {
  selectedDateTime: Date | null;
  onChange: (dateTime: Date | null) => void;
  className?: string; // Thêm className
}

const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({ selectedDateTime, onChange, className }) => {
  // Ngày hiện tại
  const today = new Date();

  return (
    <DatePicker
      selected={selectedDateTime}
      onChange={onChange}
      showTimeSelect
      dateFormat="MM/dd/yyyy h:mm aa"
      placeholderText="Select date and time"
      isClearable
      minDate={new Date(today.setDate(today.getDate() + 1))} // Chỉ cho phép chọn ngày từ ngày hôm sau
      className={className} // Sử dụng className được truyền vào
    />
  );
};

export default DateTimePickerComponent;
