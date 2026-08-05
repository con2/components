import { UploadedFileLink } from "@con2/components";

export default function UploadedFileLinkPage() {
  return (
    <div>
      <h1>UploadedFileLink</h1>
      <p>
        Renders a link to an uploaded file, using the basename of the URL as the
        link text.
      </p>
      <ul>
        <li>
          <UploadedFileLink url="https://example-bucket.s3.amazonaws.com/uploads/2026/05/receipt.pdf?X-Amz-Signature=abc123" />
        </li>
        <li>
          <UploadedFileLink url="https://example-bucket.s3.amazonaws.com/uploads/2026/05/photo%20of%20badge.jpg" />
        </li>
      </ul>
    </div>
  );
}
