// apps/frontend/src/components/trainer/CaseImage.tsx
import React from "react";

interface CaseImageProps {
  imageUrl: string;
  label?: string;
}

const CaseImage: React.FC<CaseImageProps> = ({ imageUrl, label }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={imageUrl} alt={label || "Cube case"} className="w-32 h-32 object-contain" />
      {label && <span className="mt-1 text-sm text-gray-600">{label}</span>}
    </div>
  );
};

export default CaseImage;
