'use client'

import ApiAlert from '@/components/api-alert'
import useOrigin from '@/hooks/useOrigin'
import { useParams } from 'next/navigation'

interface ApiListProps {
  entityName: string
  entityIdName: string
}

const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const params = useParams()
  const origin = useOrigin()

  const baseUrl = `${origin}/api/${params.storeId}`

  return (
    <div className='space-y-4'>
      <ApiAlert
        title='GET'
        type='public'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='GET'
        type='public'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='POST'
        type='admin'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='PATCH'
        type='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='DELETE'
        type='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </div>
  )
}

export default ApiList
