import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { storage } from "../../firebaseConfig"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface TinyEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TinyEditor: React.FC<TinyEditorProps> = ({ value, onChange }) => {
  const uploadImageToFirebase = async (blobInfo: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const file = blobInfo; 
      const fileName = `editor-images/${Date.now()}-${Math.random()}.jpg`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed:", error);
          reject("Upload failed");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL); 
        }
      );
    });
  };

  return (
    <div className="h-full w-full border-2 hover:border-purple-500 duration-300 rounded-xl">
      <Editor
        apiKey="7zh5vryyojox5ci8l5cxtpvntaoclodwr603op6so7wn9x41"
        value={value}
        onEditorChange={onChange}
        init={{
          statusbar: false,
          writer: "writer",
          height: 500,
          menubar: true,
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
            "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
            "insertdatetime", "media", "table", "help", "wordcount"
          ],
          toolbar:
            "undo redo | blocks fontselect | bold italic forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
            "image media link",
          file_picker_types: "image",
          images_upload_handler: async (blobInfo) => {
            return uploadImageToFirebase(blobInfo.blob()); 
          },
        }}
      />
    </div>
  );
};

export default TinyEditor;
