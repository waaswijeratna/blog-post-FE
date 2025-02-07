import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TinyEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TinyEditor: React.FC<TinyEditorProps> = ({ value, onChange }) => {
  return (
    <Editor
      apiKey="7zh5vryyojox5ci8l5cxtpvntaoclodwr603op6so7wn9x41" // Replace with your actual API key from TinyMCE
      value={value}
      onEditorChange={onChange}
      init={{
        content_css: 'writer',
        statusbar: false,
        height: 300,
        menubar: true,
        plugins: [
          "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
          "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
          "insertdatetime", "media", "table", "code", "help", "wordcount"
        ],
        toolbar: "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "image media link | removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

        // Enable image upload from device
        // images_upload_url: "https://your-backend.com/upload", // Replace with your actual upload URL
        automatic_uploads: true,
        file_picker_types: "image",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        file_picker_callback: (callback, value, meta) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          input.onchange = function () {
            const file = (this as HTMLInputElement).files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function (e) {
                if (e.target) {
                  callback(e.target.result as string, { alt: file.name });
                }
              };
              reader.readAsDataURL(file);
            }
          };
          input.click();
        },
      }}
    />
  );
};

export default TinyEditor;
