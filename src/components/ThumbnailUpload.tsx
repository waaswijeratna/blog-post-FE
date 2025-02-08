import React, { useState, useEffect } from "react";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { FiUploadCloud } from "react-icons/fi";

interface ThumbnailUploadProps {
  onUploadComplete: (imageUrl: string | null) => void;
  currentThumbnail?: string | null; // Optional prop to pass the current thumbnail URL
  onRemoveComplete?: (imageUrl: string | null) => void; // Callback to notify the parent when an image is removed
}

const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({ onUploadComplete, currentThumbnail, onRemoveComplete }) => {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // If there's an existing thumbnail, show its preview
  useEffect(() => {
    if (currentThumbnail) {
      setPreview(currentThumbnail);
    }
  }, [currentThumbnail]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    const storageRef = ref(storage, `thumbnails/${Date.now()}_${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload failed", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUploading(false);
        onUploadComplete(downloadURL);
      }
    );
  };

  const handleRemoveImage = async () => {
    if (currentThumbnail) {
      const imageRef = ref(storage, currentThumbnail); // Get reference to the image in Firebase storage
      try {
        await deleteObject(imageRef); // Delete the image from Firebase
        console.log("Image deleted from Firebase.");
        setPreview(null); // Clear the preview
        onRemoveComplete?.(null); // Notify parent to clear the image URL
      } catch (error) {
        console.error("Error deleting image from Firebase", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-all">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="thumbnailUpload"
        onChange={handleFileChange}
      />
      <label htmlFor="thumbnailUpload" className="flex flex-col items-center text-gray-500">
        {preview ? (
          <img
            src={preview}
            alt="Thumbnail Preview"
            className="w-40 h-40 object-cover rounded-lg shadow-md"
          />
        ) : (
          <FiUploadCloud size={40} className="text-purple-500 mb-2" />
        )}
        <span className="text-sm">Click to upload an image here</span>
      </label>

      {preview && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleUpload}
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-all"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload New"}
          </button>
          <button
            onClick={handleRemoveImage}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailUpload;
