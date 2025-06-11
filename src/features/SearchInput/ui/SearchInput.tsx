import { memo, type ChangeEvent, type FC } from "react";
import { Input } from "antd";

const { Search } = Input;

interface Props {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchInput: FC<Props> = memo(
  ({ onChange, value, placeholder }) => {
    return (
      <Search
        placeholder={placeholder}
        enterButton
        size="large"
        onChange={onChange}
        value={value}
        allowClear
      />
    );
  }
);
