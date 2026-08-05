"use client";

import { useCallback, useState } from "react";
import { FormControl } from "react-bootstrap";

/// This message is generic and not worth asking every caller to supply a
/// translation for - inlined here instead of a `messages` prop. Not a
/// Server->Client Component boundary concern either way, since this object
/// never leaves this module (it's not a prop).
const maxLengthExceededMessages: Record<
  string,
  (maxLength: number, currentLength: number) => string
> = {
  en: (maxLength, currentLength) =>
    `Maximum length is ${maxLength} characters (current: ${currentLength}).`,
  fi: (maxLength, currentLength) =>
    `Enimmäispituus on ${maxLength} merkkiä (nykyinen: ${currentLength}).`,
  sv: (maxLength, currentLength) =>
    `Maximilängden är ${maxLength} tecken (nuvarande: ${currentLength}).`,
};

interface Props {
  id?: string;
  name: string;
  rows?: number;
  defaultValue?: string;
  required?: boolean;
  readOnly?: boolean;
  maxLength: number;
  locale: string;
}

export default function TextArea({
  id,
  name,
  rows,
  defaultValue,
  required,
  readOnly,
  maxLength,
  locale,
}: Props) {
  const [length, setLength] = useState(defaultValue?.length ?? 0);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const el = e.target;
      setLength(el.value.length);
      if (el.value.length > maxLength) {
        const formatMessage =
          maxLengthExceededMessages[locale] ?? maxLengthExceededMessages.en;
        el.setCustomValidity(formatMessage(maxLength, el.value.length));
      } else {
        el.setCustomValidity("");
      }
    },
    [maxLength, locale],
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
        required={required}
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
