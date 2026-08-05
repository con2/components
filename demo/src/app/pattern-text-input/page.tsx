import { PatternTextInput } from "@con2/components";

export default function PatternTextInputPage() {
  return (
    <div>
      <h1>PatternTextInput</h1>
      <p>
        A single-line text input that shows a custom validity message when
        the value does not match the given <code>pattern</code>. Try typing
        something other than digits below and submit the form.
      </p>
      <form className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone number (digits only)
        </label>
        <PatternTextInput
          id="phone"
          name="phone"
          type="text"
          className="form-control"
          pattern="[0-9]+"
          patternDescription="Please enter digits only."
          defaultValue="0401234567"
          maxLength={20}
        />
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}
