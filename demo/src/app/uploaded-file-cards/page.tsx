import { UploadedFileCards } from "@con2/components";

export default function UploadedFileCardsPage() {
  return (
    <div>
      <h1>UploadedFileCards</h1>

      <h2>With files</h2>
      <UploadedFileCards
        urls={[
          "https://example-bucket.s3.amazonaws.com/uploads/2026/05/receipt.pdf?X-Amz-Signature=abc123",
          "https://example-bucket.s3.amazonaws.com/uploads/2026/05/photo%20of%20badge.jpg",
        ]}
        messages={{ noFileUploaded: "No file uploaded." }}
      />

      <h2>Without files</h2>
      <UploadedFileCards urls={[]} messages={{ noFileUploaded: "No file uploaded." }} />
    </div>
  );
}
