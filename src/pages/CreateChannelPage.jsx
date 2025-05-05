import React, { useState } from "react";
import { Video, AlertCircle, Upload } from "lucide-react";
import { useCreateChange } from "@hooks/index";
 
export const CreateChannelPage = () => {
  const {
    createChangeData,
    avatar,
    handleChangeInputChannel,
    errorMessage,
    handleOnSubmitChannel,
    isLoading,
  } = useCreateChange();

  return (
    <div className='min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <Video className='mx-auto h-12 w-12 text-red-600' />
          <h2 className='mt-6 text-3xl font-bold text-white'>
            Create your channel
          </h2>
          <p className='mt-2 text-gray-400'>Set up your YourTube presence</p>
        </div>

        <div className='mt-8 space-y-6'>
          <div className='space-y-6'>
            <div className='flex justify-center'>
              <div className='relative'>
                <div className='w-24 h-24 rounded-full overflow-hidden bg-[#1f1f1f] border-2 border-gray-700'>
                  {createChangeData?.avatar ? (
                    <img
                      src={URL.createObjectURL(createChangeData?.avatar)}
                      alt='Channel avatar'
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                      <Upload className='h-8 w-8 text-gray-400' />
                    </div>
                  )}
                </div>
                <label className='absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700'>
                  <Upload className='h-4 w-4 text-white' />
                  <input
                    type='file'
                    className='hidden'
                    accept='image/*'
                    name='avatar'
                    onChange={(e) => handleChangeInputChannel(e)}
                  />
                </label>
              </div>
            </div>

            {errorMessage && (
              <span className='text-white'>{errorMessage?.avatar}</span>
            )}

            <div>
              <label
                htmlFor='channel-name'
                className='block text-sm font-medium text-gray-300'
              >
                Channel name
              </label>
              <input
                id='channel-name'
                type='text'
                required
                name='channelName'
                value={createChangeData?.channelName}
                onChange={(e) => handleChangeInputChannel(e)}
                className='mt-1 block w-full bg-[#1f1f1f] border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your channel name'
              />
              {errorMessage && (
                <span className='text-white'>{errorMessage?.channelName}</span>
              )}
            </div>

            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-300'
              >
                Description
              </label>
              <textarea
                id='description'
                rows={4}
                name='description'
                value={createChangeData?.description}
                onChange={(e) => handleChangeInputChannel(e)}
                className='mt-1 block w-full bg-[#1f1f1f] border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Tell viewers about your channel'
              />
              {errorMessage && (
                <span className='text-white'>{errorMessage?.description}</span>
              )}
            </div>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={() => handleOnSubmitChannel()}
          >
            {isLoading ? "Creating channel..." : "Create channel"}
          </button>
        </div>
      </div>
    </div>
  );
};

