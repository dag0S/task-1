import { Input } from "antd";
import { memo, type ChangeEvent, type FC } from "react";

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
      />
    );
  }
);
