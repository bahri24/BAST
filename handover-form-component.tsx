'use client'

import React, { useState } from 'react';
import { Camera } from 'lucide-react';

export default function HandoverForm() {
  const [formData, setFormData] = useState({
    date: '',
    accountNumber: '',
    name: '',
    documentIndexes: ['', '', '', ''],
    recipient: '',
    information: '',
    photos: []
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, index?: number) => {
    if (field === 'documentIndexes' && index !== undefined) {
      const newIndexes = [...formData.documentIndexes];
      newIndexes[index] = e.target.value;
      setFormData({ ...formData, documentIndexes: newIndexes });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your server
    alert('Form submitted successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-xl">
        <h1 className="text-2xl font-bold text-white">Handover Minutes</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange(e, 'date')}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange(e, 'accountNumber')}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange(e, 'name')}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Document Index</label>
          <div className="grid grid-cols-4 gap-3">
            {formData.documentIndexes.map((index, i) => (
              <div key={i} className="relative">
                <input
                  value={index}
                  onChange={(e) => handleInputChange(e, 'documentIndexes', i)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={`${i + 1}`}
                />
                <span className="absolute -top-2 -left-2 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
          <input
            type="text"
            value={formData.recipient}
            onChange={(e) => handleInputChange(e, 'recipient')}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Information</label>
          <textarea
            value={formData.information}
            onChange={(e) => handleInputChange(e, 'information')}
            className="w-full p-2 border rounded-lg min-h-32 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Proof Photo</label>
          <div className="flex gap-4">
            <label className="flex items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto text-gray-400" />
                <span className="mt-2 block text-sm text-gray-400">Add photo</span>
              </div>
              <input
                type="file"
                onChange={handlePhotoCapture}
                accept="image/*"
                className="hidden"
              />
            </label>
            {photoPreview && (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
