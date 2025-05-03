import React, { useEffect, useState } from "react";
import {
  Upload,
  Video,
  Image,
  Clock,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";
import { useVideoList, useVideoUpload } from "@hooks/index";

// Types

function VideoUpload() {
  // State for div inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const { videoHistory } = useVideoList();
  const {
    videoData,
    hanldeDeleteThumbnail,
    handleChangeInputUploadVideo,
    handleSubmitVideo,
  } = useVideoUpload();

  // Delete a video
  const handleDelete = (id) => {
    setVideoHistory(videoHistory.filter((video) => video.id !== id));
  };

  return (
    <div className='min-h-screen bg-[#0f0f0f] text-white'>
      {/* Header */}
      <header className='bg-[#0f0f0f] border-b border-gray-700 py-4 px-6'>
        <div className='flex items-center justify-between max-w-6xl mx-auto'>
          <div className='flex items-center space-x-2'>
            <Video className='h-8 w-8 text-red-600' />
            <h1 className='text-xl font-bold'>YourTube Studio</h1>
          </div>
          <div className='flex items-center space-x-4'>
            <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center'>
              <Eye className='h-4 w-4 mr-2' />
              View Channel
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-6xl mx-auto py-8 px-6'>
        <div className='bg-[#1f1f1f] rounded-lg overflow-hidden shadow-xl'>
          {/* Tabs */}
          <div className='flex border-b border-gray-700'>
            <button
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === "details"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Video Details
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === "history"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Upload History
            </button>
          </div>

          {/* Video Details div */}
          {activeTab === "details" && (
            <div className='p-6'>
              <h2 className='text-2xl font-bold mb-6'>Upload New Video</h2>

              <div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {/* Left Column - Video Upload */}
                  <div className='md:col-span-1'>
                    <div className='bg-[#2a2a2a] rounded-lg p-4 h-full flex flex-col'>
                      <h3 className='font-medium mb-4'>Video File</h3>

                      <div className='flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 mb-4 hover:border-blue-500 transition-colors'>
                        {videoData.video ? (
                          <div className='text-center'>
                            <CheckCircle className='h-12 w-12 text-green-500 mx-auto mb-2' />
                            <p className='text-sm text-gray-300 mb-1 truncate max-w-full text-wrap'>
                              {videoData.video.name}
                            </p>
                            <p className='text-xs text-gray-400'>
                              {(videoData.video.size / (1024 * 1024)).toFixed(
                                2
                              )}{" "}
                              MB
                            </p>
                            <button
                              type='button'
                              className='mt-3 text-xs text-red-400 hover:text-red-300'
                              onClick={() => hanldeDeleteThumbnail("video")}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <label className='cursor-pointer text-center'>
                            <Upload className='h-12 w-12 text-gray-400 mx-auto mb-2' />
                            <p className='text-sm text-gray-300 mb-1'>
                              Drag and drop or click to upload
                            </p>
                            <p className='text-xs text-gray-400 mb-4'>
                              MP4, MOV, or AVI (max 10GB)
                            </p>
                            <span className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm'>
                              Select File
                            </span>
                            <input
                              type='file'
                              className='hidden'
                              accept='video/*'
                              name='video'
                              onChange={(e) => handleChangeInputUploadVideo(e)}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Video Details */}
                  <div className='md:col-span-2'>
                    <div className='bg-[#2a2a2a] rounded-lg p-6'>
                      <div className='mb-6'>
                        <label
                          htmlFor='title'
                          className='block text-sm font-medium text-gray-300 mb-2'
                        >
                          Title <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          id='title'
                          name='title'
                          value={videoData?.title}
                          onChange={(e) => handleChangeInputUploadVideo(e)}
                          className='w-full bg-[#1f1f1f] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                          placeholder='Add a title that describes your video'
                          required
                        />
                        <p className='text-xs text-gray-400 mt-1'>
                          {title.length}/100
                        </p>
                      </div>

                      <div className='mb-6'>
                        <label
                          htmlFor='description'
                          className='block text-sm font-medium text-gray-300 mb-2'
                        >
                          Description
                        </label>
                        <textarea
                          id='description'
                          name='description'
                          value={videoData?.description}
                          onChange={(e) => handleChangeInputUploadVideo(e)}
                          rows={4}
                          className='w-full bg-[#1f1f1f] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                          placeholder='Tell viewers about your video'
                        />
                        <p className='text-xs text-gray-400 mt-1'>
                          {description.length}/5000
                        </p>
                      </div>

                      <div className='mb-6'>
                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                          Thumbnail
                        </label>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                          <div className='border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-blue-500 transition-colors'>
                            {videoData && videoData?.image ? (
                              <div className='relative'>
                                <img
                                  src={URL.createObjectURL(videoData?.image)}
                                  alt='Thumbnail preview'
                                  className='w-full h-32 object-cover rounded'
                                />
                                <button
                                  type='button'
                                  className='absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1 hover:bg-opacity-100'
                                  onClick={() => hanldeDeleteThumbnail("image")}
                                >
                                  <Trash2 className='h-4 w-4 text-white' />
                                </button>
                              </div>
                            ) : (
                              <label className='cursor-pointer flex flex-col items-center justify-center h-32'>
                                <Image className='h-8 w-8 text-gray-400 mb-2' />
                                <p className='text-xs text-gray-400 text-center'>
                                  Upload thumbdnail
                                </p>
                                <input
                                  type='file'
                                  className='hidden'
                                  accept='image/*'
                                  name='image'
                                  onChange={(e) =>
                                    handleChangeInputUploadVideo(e)
                                  }
                                />
                              </label>
                            )}
                          </div>
                          <div className='text-sm text-gray-400'>
                            <p className='mb-2'>Your thumbnail should:</p>
                            <ul className='list-disc pl-5 text-xs space-y-1'>
                              <li>Have a resolution of 1280x720 (16:9)</li>
                              <li>Be less than 2MB</li>
                              <li>Use JPG, PNG, or GIF divat</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className='mt-6 flex justify-end'>
                  <button
                    type='submit'
                    // disabled={!title || !videoFile || isUploading}
                    className={`px-6 py-3 rounded-md font-medium flex items-center ${
                      !title || !videoFile || isUploading
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    onClick={() => handleSubmitVideo()}
                  >
                    {isUploading ? (
                      <>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className='h-5 w-5 mr-2' />
                        Upload Video
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Upload History */}
          {activeTab === "history" && (
            <div className='p-6'>
              <h2 className='text-2xl font-bold mb-6'>Your Videos</h2>

              {videoHistory.length === 0 ? (
                <div className='text-center py-12'>
                  <Video className='h-12 w-12 text-gray-500 mx-auto mb-3' />
                  <p className='text-gray-400'>No videos uploaded yet</p>
                </div>
              ) : (
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead className='bg-[#2a2a2a] text-left'>
                      <tr>
                        <th className='px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider'>
                          Video
                        </th>
                        <th className='px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider'>
                          Status
                        </th>
                        <th className='px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider'>
                          Date
                        </th>
                        <th className='px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider'>
                          Views
                        </th>
                        <th className='px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                      {videoHistory.map((video) => (
                        <tr key={video.id} className='hover:bg-[#2a2a2a]'>
                          <td className='px-6 py-4'>
                            <div className='flex items-center space-x-3'>
                              <div className='flex-shrink-0 h-16 w-28 relative'>
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className='h-full w-full object-cover rounded'
                                />
                                <div className='absolute bottom-1 right-1 bg-black bg-opacity-70 text-xs px-1 rounded'>
                                  3:45
                                </div>
                              </div>
                              <div>
                                <p className='font-medium text-white truncate max-w-xs'>
                                  {video.title}
                                </p>
                                <p className='text-xs text-gray-400 truncate max-w-xs'>
                                  {video.fileName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            {video.status === "live" && (
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                                <CheckCircle className='h-3 w-3 mr-1' />
                                Live
                              </span>
                            )}
                            {video.status === "processing" && (
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                                <Clock className='h-3 w-3 mr-1' />
                                Processing
                              </span>
                            )}
                            {video.status === "failed" && (
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                                <AlertTriangle className='h-3 w-3 mr-1' />
                                Failed
                              </span>
                            )}
                          </td>
                          <td className='px-6 py-4 text-sm text-gray-300'>
                            {video.uploadDate.toLocaleDateString()}
                          </td>
                          <td className='px-6 py-4 text-sm text-gray-300'>
                            {video.views.toLocaleString()}
                          </td>
                          <td className='px-6 py-4 text-sm font-medium'>
                            <div className='flex space-x-2'>
                              <button className='text-blue-400 hover:text-blue-300'>
                                <Edit className='h-5 w-5' />
                              </button>
                              <button
                                className='text-red-400 hover:text-red-300'
                                onClick={() => handleDelete(video.id)}
                              >
                                <Trash2 className='h-5 w-5' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default VideoUpload;
