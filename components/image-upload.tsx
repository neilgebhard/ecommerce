'use client'

import { CldUploadWidget } from 'next-cloudinary'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ImagePlus, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import useMounted from '@/hooks/useMounted'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (url: string) => void
  onRemove: (url: string) => void
  urls: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  urls,
}) => {
  const { mounted } = useMounted()

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!mounted) {
    return null
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {urls.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
          >
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant='destructive'
                size='sm'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image fill className='object-cover' alt='Image' src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset='ua5w2wgk'>
        {({ open }) => {
          const handleClick = () => open()
          return (
            <Button
              type='button'
              disabled={disabled}
              variant='secondary'
              onClick={handleClick}
            >
              <ImagePlus className='h-4 w-4 mr-2' />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
