// apps/frontend/src/components/trainer/CaseImage.tsx
import React from "react";

interface CaseImageProps {
  imageUrl: string;
  altText?: string;
}

const CaseImage: React.FC<CaseImageProps> = ({ imageUrl, altText = "CFOP case diagram" }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (!imageUrl || imageError) {
    return (
      <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">🧩</div>
          <p className="text-sm">Case Image</p>
          <p className="text-xs">Not Available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-48 h-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={altText}
        onError={handleImageError}
        className="w-full h-full object-contain p-4"
      />
    </div>
  );
};

export default CaseImage;
