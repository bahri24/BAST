import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const HandoverMinutesForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    accountNumber: '',
    name: '',
    documentIndexes: ['', '', '', ''],
    recipient: '',
    information: '',
    photos: []
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleInputChange = (e, field, index) => {
    if (field === 'documentIndexes') {
      const newIndexes = [...formData.documentIndexes];
      newIndexes[index] = e.target.value;
      setFormData({ ...formData, documentIndexes: newIndexes });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handlePhotoCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
        setFormData({
          ...formData,
          photos: [...formData.photos, file]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const exportToExcel = () => {
    console.log('Exporting to Excel:', formData);
  };

  const exportToPDF = () => {
    console.log('Exporting to PDF:', formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-semibold">Handover Minutes</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form className="space-y-6">
          {/* Top Section - Date and Account */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange(e, 'date')}
                className="w-full shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <Input
                value={formData.accountNumber}
                onChange={(e) => handleInputChange(e, 'accountNumber')}
                className="w-full shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Enter account number"
              />
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
              className="w-full shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name (allows numbers and special characters)"
              pattern=".*"
            />
          </div>

          {/* Document Indexes - Sleek Cards */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Document Index (Filing Cabinet)
            </label>
            <div className="grid grid-cols-4 gap-3">
              {formData.documentIndexes.map((index, i) => (
                <div key={`index-${i}`} className="relative">
                  <Input
                    value={index}
                    onChange={(e) => handleInputChange(e, 'documentIndexes', i)}
                    className="w-full shadow-sm focus:ring-2 focus:ring-blue-500 pl-3"
                    placeholder={`${i + 1}`}
                  />
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recipient */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Recipient</label>
            <Input
              value={formData.recipient}
              onChange={(e) => handleInputChange(e, 'recipient')}
              className="w-full shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recipient name"
            />
          </div>

          {/* Information Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Information</label>
            <textarea
              value={formData.information}
              onChange={(e) => handleInputChange(e, 'information')}
              className="w-full min-h-32 rounded-md border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter detailed information..."
            />
          </div>

          {/* Photo Capture - Enhanced UI */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Proof Photo</label>
            <div className="mt-2">
              <label className="flex items-center gap-4 cursor-pointer">
                <div className="flex items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex flex-col items-center space-y-2">
                    <Camera className="w-8 h-8 text-blue-500" />
                    <span className="text-sm text-gray-500">Click to capture</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoCapture}
                    className="hidden"
                  />
                </div>
                {photoPreview && (
                  <div className="relative">
                    <img 
                      src={photoPreview} 
                      alt="Captured photo" 
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Captured
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Export Buttons - Enhanced Style */}
          <div className="flex gap-4 mt-8">
            <Button 
              type="button"
              onClick={exportToExcel}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors duration-200"
            >
              Export to Excel
            </Button>
            <Button 
              type="button"
              onClick={exportToPDF}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200"
            >
              Export to PDF
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default HandoverMinutesForm;
