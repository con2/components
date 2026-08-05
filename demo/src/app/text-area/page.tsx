import { TextArea } from "@con2/components";

export default function TextAreaPage() {
  return (
    <div>
      <h1>TextArea</h1>
      <p>
        A textarea with a live character counter and a custom validity message
        once the value exceeds <code>maxLength</code>. This demo uses a low
        limit (20 characters) so the message is easy to trigger by typing.
      </p>
      <p>
        The validity message is generic enough that it isn&apos;t worth a{" "}
        <code>messages</code> prop - <code>TextArea</code> carries its own
        inline fi/en/sv translations and just takes a <code>locale</code> prop
        to pick one, defaulting to English for an unrecognized locale.
      </p>
      <form>
        <label htmlFor="bio" className="form-label">
          Short bio (max 20 characters)
        </label>
        <TextArea
          id="bio"
          name="bio"
          rows={3}
          maxLength={20}
          defaultValue="Hello there"
          locale="en"
        />
      </form>
    </div>
  );
}
