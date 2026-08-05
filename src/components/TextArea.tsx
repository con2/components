"use client";

import { useCallback, useState } from "react";
import { FormControl } from "react-bootstrap";

interface Messages {
  /** Custom validity message shown when the value exceeds `maxLength`. */
  maxLengthExceeded: (maxLength: number, currentLength: number) => string;
}

interface Props {
  id?: string;
  name: string;
  rows?: number;
  defaultValue?: string;
  readOnly?: boolean;
  maxLength: number;
  messages: Messages;
}

export default function TextArea({
  id,
  name,
  rows,
  defaultValue,
  readOnly,
  maxLength,
  messages,
}: Props) {
  const [length, setLength] = useState(defaultValue?.length ?? 0);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const el = e.target;
      setLength(el.value.length);
      if (el.value.length > maxLength) {
        el.setCustomValidity(
          messages.maxLengthExceeded(maxLength, el.value.length),
        );
      } else {
        el.setCustomValidity("");
      }
    },
    [maxLength, messages],
  );

  const atLimit = length >= maxLength;

  return (
    <div>
      <FormControl
        as="textarea"
        id={id}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        readOnly={readOnly}
        maxLength={maxLength}
        onChange={handleChange}
      />
      <small className={atLimit ? "text-danger" : "text-muted"}>
        {length}/{maxLength}
      </small>
    </div>
  );
}
