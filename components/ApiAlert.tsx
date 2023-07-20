'use client'

import toast from 'react-hot-toast'
import { Copy, Server } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Props = {
  title: string
  description: string
  type: 'public' | 'admin'
}

const ApiAlert: React.FC<Props> = ({ title, description, type = 'public' }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(description)
    toast.success('Copied to clipboard.')
  }

  return (
    <Alert>
      <Server className='h-4 w-4' />
      <AlertTitle className='flex items-center gap-2'>
        {title}
        <Badge
          className='capitalize'
          variant={type === 'public' ? 'secondary' : 'destructive'}
        >
          {type}
        </Badge>
      </AlertTitle>
      <AlertDescription className='mt-4 flex justify-between items-center gap-2'>
        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-sm font-mono font-semibold'>
          {description}
        </code>
        <Button variant='outline' size='sm' onClick={copyToClipboard}>
          <Copy className='h-4 w-4' />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

export default ApiAlert
